import { useReducer, createContext } from "react";

const reducer = (state, action) => {

    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return state
    }
}

const UserContext = createContext();

export const UserContextProvider = props => {
    const [ user, UserDispatch ] = useReducer(reducer, null)

    return (
        <UserContext.Provider value={[ user, UserDispatch ]}>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserContext;
