import React from 'react';
import { useAuth, useUserValue } from '../hooks';

const Logout = () => {
    const { logout } = useAuth();
    const user = useUserValue();

    const divStyle = {
        fontSize: 14,
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
            {user.name} logged-in
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