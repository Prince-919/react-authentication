import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const UserLayout = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>{<Outlet />}</div>
    </>
  );
};

export default UserLayout;
