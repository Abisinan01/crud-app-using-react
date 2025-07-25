import { Outlet, Navigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

export const ProtectedRoutes = () => {
    const { token, role, loading, isRemoved } = useAdminAuth()
    console.log('isremoved 1', isRemoved)
    if (loading) return;
    return token && role === 'user'  ? <Outlet /> : <Navigate to="/login" replace />
}

export const PublicRoutes = () => {
    const { token, role, loading, isRemoved } = useAdminAuth()
    console.log('isremoved 2', isRemoved)

    if (loading) return;
    return token && role === 'user' ? <Navigate to="/" /> : <Outlet />;
}