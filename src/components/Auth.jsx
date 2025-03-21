import React from 'react'
import ToggleComponents from './ToggleComponents';
import AuthForm from './AuthForm';
import { useAuth, useUserValue } from '../hooks';
import { Navigate } from 'react-router-dom';

const Auth = () => {
    const { signup, login } = useAuth();
    const user = useUserValue();

    const style = {
        width: 328,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -75%)",
        transformOrigin: "top",
      };

    if (user) return <Navigate to="/" replace />

    return (
        <section style={style}>
            <ToggleComponents showByDefault="Sign Up" hideByDefault="Log In">
                <AuthForm key="login" type="Log In" auth={login} />
                <AuthForm key="signup" type="Sign Up" auth={signup} />
            </ToggleComponents>
        </section>
    )
}

export default Auth