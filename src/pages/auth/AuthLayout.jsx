import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-50 w-full">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
