import { useState } from "react";
import { SiFusionauth } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut, FiMail } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import api from "../api/api";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <SiFusionauth className="text-white text-3xl" />
          <span className="tracking-wide">TrueAuth</span>
        </Link>
        <div className="relative">
          {isAuthenticated ? (
            <div>
              <RxAvatar
                className="w-10 h-10 text-white rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50"
                  onMouseLeave={closeDropdown}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                    <FiUser />
                    <p>{user.username}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 truncate">
                    <FiMail />
                    <p className="truncate">{user.email}</p>
                  </div>
                  <hr className="my-2" />
                  <DropdownBox user={user} />
                  <div
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#2575fc] hover:bg-[#e8eaf7] transition-all duration-100"
                  >
                    <FiLogOut />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-white text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/20 hover:backdrop-blur-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const DropdownBox = ({ user }) => {
  const adminNavItems = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      path: "/admin",
    },
    {
      label: "Profile",
      icon: <ImProfile />,
      path: "/admin/profile",
    },
  ];
  const userNavItem = [
    {
      label: "Profile",
      icon: <ImProfile />,
      path: "/user/profile",
    },
  ];
  const navItems = user?.role === "admin" ? adminNavItems : userNavItem;
  return (
    <>
      {navItems.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#6a11cb] hover:bg-[#f0ebfa] transition-all duration-100"
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );
};
