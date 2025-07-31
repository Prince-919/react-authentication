import { FiUnlock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../components";
import Lottie from "lottie-react";
import forgetPassAnimation from "../../animation/forget-password.json";
import useCustomForm from "../../hooks/useCustomForm";
import * as Yup from "yup";
import api from "../../api/api";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required."),
  });

  const onSubmit = async (values) => {
    const response = await api.post("/forget-password", values);
    console.log(response);
    if (response.status === 201) {
      navigate("/reset-password");
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="hidden md:flex w-full md:w-1/2 bg-transparent items-center justify-center p-6">
          <Lottie
            animationData={forgetPassAnimation}
            loop
            className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 py-12 px-8 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-start">
            <FiUnlock className="text-3xl text-white/90 mb-2 mx-auto md:mx-0" />
            <h2 className="text-2xl font-bold text-white">Forgot Password?</h2>
            <p className="text-sm text-white/90 mt-1">
              Enter your email and we’ll send you instructions to reset your
              password.
            </p>
          </div>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <TextInput
              label="Email *"
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />

            <button
              type="submit"
              className="w-full bg-white text-indigo-600 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:bg-indigo-100 transition"
            >
              Send Reset Link
            </button>

            <p className="text-sm text-center text-white/90 mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-white font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
