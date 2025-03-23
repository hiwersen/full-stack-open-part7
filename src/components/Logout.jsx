import React from 'react';
import { useAuth, useUserValue } from '../hooks';

const Logout = () => {
    const { logout } = useAuth();
    const user = useUserValue();

    const divStyle = {
        fontWeight: "bold",
        width: "100%",
        textAlign: "right",
        paddingRight: 8,
    };

    const inputStyle = {
        fontSize: 14,
        marginLeft: 14,
        width: 82,
        padding: "2px 4px",
    }

    return user && (
        <div style={divStyle} >
            Hello, {user.name}!
            <input
                style={inputStyle}
                type="button"
                value="Log out"
                onClick={logout}
            />
        </div>
    )
}

export default Logout