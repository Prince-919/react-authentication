import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={"/login"} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/unauthorize"} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoutes;
