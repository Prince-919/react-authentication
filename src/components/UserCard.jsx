import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../api/api";
import toast from "react-hot-toast";

const UserCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePhoneVerify = async () => {
    try {
      const response = await api.post("/get-phone-otp", { phone: user?.phone });
      toast.success(response.data.message);
      navigate("/verify-phone");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-4 sm:p-6 text-white flex flex-col justify-center">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative w-28 h-28">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#6a11cb] to-[#2575fc] blur-sm opacity-70"></div>
          <img
            src="https://i.pravatar.cc/100"
            alt="User Avatar"
            className="relative w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
          {user?.username}
        </h2>
        <span className="text-xs sm:text-sm text-white/80 bg-white/10 px-2 py-1 rounded-full border border-white/20 shadow-sm capitalize">
          {user?.role}
        </span>
        <span className="text-sm sm:text-base text-indigo-100 bg-white/10 px-3 py-1 rounded-full border border-white/20 shadow">
          Frontend Developer
        </span>
        <div className="w-full flex items-center justify-between gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-lg">
          <div className="text-left text-sm break-all">
            <span className="font-semibold">Email:</span> {user?.email}
          </div>
          {user.role === "user" ? (
            user?.emailVerified ? (
              <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                <FaCheckCircle /> Verified
              </span>
            ) : (
              <div className="inline-flex cursor-pointer items-center gap-2 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] hover:from-[#5f10c7] hover:to-[#1e63e5] text-white font-semibold px-3 py-1 rounded-full text-sm shadow">
                <FaEnvelope className="text-xs" />
                Verify
              </div>
            )
          ) : null}
        </div>
        {user.role === "user" && user?.phone && (
          <div className="w-full flex items-center justify-between gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-lg">
            <div className="text-left text-sm break-all">
              <span className="font-semibold">Phone:</span> {user?.phone}
            </div>
            {user.role === "user" && user?.phoneVerified ? (
              <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                <FaCheckCircle /> Verified
              </span>
            ) : (
              <button
                onClick={handlePhoneVerify}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-3 py-1 rounded-full text-sm shadow"
              >
                📱 Verify
              </button>
            )}
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <a href="#" className="text-white hover:text-indigo-200 text-lg">
            <BsLinkedin />
          </a>
          <a href="#" className="text-white hover:text-indigo-200 text-lg">
            <BsGithub />
          </a>
          <a href="#" className="text-white hover:text-indigo-200 text-lg">
            <BsTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
