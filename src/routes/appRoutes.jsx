import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AuthLayout,
  ForgetPassword,
  Login,
  Register,
  ResetPassword,
  Home,
  PageNotFound,
  AdminProfile,
  UserLayout,
  UserProfile,
  AdminDashboard,
  Unauthorized,
  VerifyEmail,
  VerifyPhone,
} from "../pages";
import ProtectedRoutes from "./protectedRoutes";

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-otp" element={<VerifyEmail />} />
          <Route path="verify-phone" element={<VerifyPhone />} />
        </Route>

        {/* User Private Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["admin", "user"]} />}>
          <Route element={<UserLayout />}>
            <Route path="user/profile" element={<UserProfile />} />
          </Route>
        </Route>
        {/* Admin Private Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route element={<UserLayout />}>
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
        <Route path="unauthorize" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default appRoutes;
