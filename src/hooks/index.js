import { useContext } from "react";
import NotificationContext from "../NotificationContext";
import UserContext from "../UserContext";

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}

export const useUserValue = () => {
    return useContext(UserContext)[0]
}

export const useUserDispatch = () => {
    return useContext(UserContext)[1]
}