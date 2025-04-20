import { useUserStore } from "@/stote/useUserStore";
import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useUserStore()
    if (!isAuthenticated) {
        return <Navigate to="/signIn"></Navigate>
    }
    if (!user?.admin) {
        return <Navigate to="/"></Navigate>

    }
    return children;

};

export default AdminProtectRoute;