import React from 'react'
import { useBlogQuery, useField } from '../hooks';

const Comments = () => {
    const { blog, commentBlog } = useBlogQuery();
    const comment = useField('comment');

    const handleAddComment = event => {
        event.preventDefault();

        commentBlog({
            comment: comment.value,
            id: blog.id,
        })
        comment.reset()
    }

    const flex = {
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
    };

    const listStyle = {
        padding: "16px 8px 4px",
        listStyle: "none",
        borderBottom: "solid 1px #d1d1d1",
    }

    return (
        <div>
            <h3>Comments</h3>
            <div>
            <form style={flex} onSubmit={handleAddComment}>
                <input { ...comment } style={{ flex: 1 }} />
                <input type="submit" value="Comment" />
            </form>
            </div>
            <ul>
            { blog.comments.map((c, i) => <li style={listStyle} key={i}>{c}</li>) }
            </ul>
        </div>
  )
}

export default Comments