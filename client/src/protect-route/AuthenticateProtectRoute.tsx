import { useUserStore } from '@/stote/useUserStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticateProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useUserStore()
    if (isAuthenticated && user?.isVerified) {
        return <Navigate to="/" replace />
    }

    return children;
};

export default AuthenticateProtectRoute;