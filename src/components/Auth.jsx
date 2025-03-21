import React from 'react'
import ToggleComponents from './ToggleComponents';
import AuthForm from './AuthForm';
import { useAuth, useUserValue } from '../hooks';

const Auth = () => {
    const { login, signup } = useAuth();
    const user = useUserValue();

    const style = {
        width: 328,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -75%)",
        transformOrigin: "top",
      };

    return user ? null : (
        <section style={style}>
            <ToggleComponents showByDefault="Sign Up" hideByDefault="Log In">
                <AuthForm key="login" type="Log In" auth={login} />
                <AuthForm key="signup" type="Sign Up" auth={signup} />
            </ToggleComponents>
        </section>
    )
}

export default Auth