import { FiUnlock } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PasswordStrength, TextInput } from "../../components";
import Lottie from "lottie-react";
import resetPassAnimation from "../../animation/reset-password.json";
import useCustomForm from "../../hooks/useCustomForm";
import * as Yup from "yup";
import api from "../../api/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match."
    ),
  });

  const onSubmit = async (values) => {
    const response = await api.post("/reset-password", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.status === 200) {
      navigate("/login");
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="hidden md:flex w-full md:w-1/2 bg-transparent items-center justify-center p-6">
          <Lottie
            animationData={resetPassAnimation}
            loop
            className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 py-12 px-8 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-start">
            <FiUnlock className="text-3xl text-white/90 mb-2 mx-auto md:mx-0" />
            <h2 className="text-2xl font-bold text-white">
              Set a new password
            </h2>
            <p className="text-sm text-white/90 mt-1">
              Enter and confirm your new password below.
            </p>
          </div>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <TextInput
              label="Password *"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
            <TextInput
              label="Confirm Password *"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
            <PasswordStrength score={formik.values.password} />
            <button
              type="submit"
              className="w-full bg-white text-indigo-600 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:bg-indigo-100 transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
