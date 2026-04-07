import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/authentication/auth-context";
import type { ReactNode } from "react";

const ProtectedRoute = ({ roles,children }: {roles?: string[], children: ReactNode}) => {
    const { token, user } = useAuth();
    const { pathname } = useLocation();

    if (!token) {
        return <Navigate to={`/login?returnUrl=${encodeURIComponent(pathname)}`} replace />;
    }

    if (roles && !roles.some((r) => user?.roles?.includes(r))) {
        return <Navigate to={`/access-denied?returnUrl=${encodeURIComponent(pathname)}`} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
