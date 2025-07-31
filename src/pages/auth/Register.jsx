import { PiCashRegisterThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../components";
import Lottie from "lottie-react";
import loginAnimation from "../../animation/login.json";
import useCustomForm from "../../hooks/useCustomForm";
import * as Yup from "yup";
import { PasswordStrength } from "../../components";
import api from "../../api/api";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters.")
      .max(28, "Username must not exceed 28 characters."),
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match."
    ),
  });

  const onSubmit = async (values) => {
    const response = await api.post("/register", values);
    if (response.status === 201) {
      navigate("/login");
    }

    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-2 sm:px-4 py-6 overflow-x-hidden">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 py-6 px-6 sm:px-8 overflow-y-auto no-scrollbar">
          <div className="mb-4 text-center md:text-start">
            <PiCashRegisterThin className="text-3xl text-white/90 mb-2 mx-auto md:mx-0" />
            <h2 className="text-2xl font-bold text-white">
              Create your account
            </h2>
            <p className="text-sm text-white/90 mt-1">
              Sign up to access all features and start your journey with us.
            </p>
          </div>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <TextInput
              label="Username *"
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
            <TextInput
              label="Email *"
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
            <TextInput
              label="Password *"
              type="password"
              name="password"
              placeholder="Create a strong password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
            <TextInput
              label="Confirm Password *"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
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
              Sign Up
            </button>

            <p className="text-sm text-center text-white/90 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-medium hover:underline"
              >
                Log in here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Animation */}
        <div className="hidden md:flex w-full md:w-1/2 bg-transparent items-center justify-center p-6">
          <Lottie
            animationData={loginAnimation}
            loop
            className="w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
