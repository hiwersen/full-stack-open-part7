import { useReducer, createContext } from "react";

const reducer = (state, action) => {
    console.log('STATE -------------------:', state)
    console.log('ACTION  -----------------:', action)

    switch (action.type) {
        case 'SHOW':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return state
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
    const [ notification, notificationDispatch ] = useReducer(reducer, null)

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
            { props.children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext;

