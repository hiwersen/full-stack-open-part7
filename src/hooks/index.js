import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import UserContext from "../UserContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from '../services/blogs'

export const useUserValue = () => {
    return useContext(UserContext)[0]
}

export const useUserDispatch = () => {
    return useContext(UserContext)[1]
}

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useShowNotification = () => {
    const notification = useNotificationValue()
    const dispatch = useContext(NotificationContext)[1]

    return notificationToShow => {
        notification && clearTimeout(notification?.timeoutID)

        notificationToShow.timeoutID = setTimeout(() => {
        dispatch({ type: 'CLEAR' });
        }, 5000);

        dispatch({ type: 'SHOW', payload: notificationToShow });

    }
}

export const useBlogQuery = () => {
    const showNotification = useShowNotification();

    const blogsQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        select: blogs => [...blogs].sort((a, b) => b.likes - a.likes),
        refetchOnWindowFocus: false,
        retry: 1,
      })

    const queryClient = useQueryClient();

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: updatedBlog => {
          queryClient.setQueryData(['blogs'], blogs => blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b));
          const message = `"${updateBlog.title}" has been updated`;
          showNotification({ message: message, error: false });
        },
        onError: error => {
          const message = error.response?.data?.error || "error updating blog";
          showNotification({ message, error: true });
          console.error(error.message);
        }
    })

    const deleteBlogMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: (_, deletedBlog) => {
        queryClient.setQueryData(['blogs'], blogs => blogs.filter(b => b.id !== deletedBlog.id));
        const message = `blog "${deletedBlog.title}" has been deleted`;
        showNotification({ message: message, error: false });
    },
    onError: (error, blog) => {
        const message = error.response?.data?.error || `error deleting blog: "${blog.title}"`;
        showNotification({ message, error: true });
    }
    });

    const updateBlog = (blogToUpdate) => {
    updateBlogMutation.mutate(blogToUpdate)
    };

    const deleteBlog = (blogToDelete) => {
    const ok = window.confirm(`Delete blog "${blogToDelete.title}" by ${blogToDelete.author}?`);
    if (!ok) return;

    deleteBlogMutation.mutate(blogToDelete)
    };

    return {
        blogs: blogsQuery.data || [],
        isLoading: blogsQuery.isLoading,
        isError: blogsQuery.isError,
        updateBlog,
        deleteBlog,
    }
}