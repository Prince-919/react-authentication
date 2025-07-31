import { useRef } from "react";
import OtpForm from "./OtpForm";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const EmailOtp = () => {
  const inputRef = useRef([]);
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const getTheOtp = () => {
    const otp = inputRef.current?.map((item) => item.value);
    return otp.join("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/mail-verification", {
        otp: getTheOtp(),
        userId: window.location.href.split("=")[1],
      });
      updateUser(response.data.data);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <OtpForm inputRef={inputRef} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EmailOtp;
