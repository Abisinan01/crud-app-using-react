import { Outlet, Navigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";
import FullScreenLoader from "../components/ScreenLoading";

export const AdminProtectedRoutes = () => {
    const { token, role, loading } = useAdminAuth()
    if (loading) return ;
    return token && role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" />
}

export const AdminPublicRoutes = () => {
    const { token, role, loading } = useAdminAuth()
    if (loading) return ;
    return token && role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}