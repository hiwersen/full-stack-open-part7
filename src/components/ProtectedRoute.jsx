import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserLoading, useUserValue } from '../hooks';
import Nav from "./Nav"
import Footer from "./Footer"

const ProtectedRoute = () => {
    const user = useUserValue();
    const loading = useUserLoading();

    if (loading) return <div>Loading...</div>

    if (!user) return <Navigate to="/auth" replace />

    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}

export default ProtectedRoute