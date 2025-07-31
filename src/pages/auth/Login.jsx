import { SiFusionauth } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../components";
import Lottie from "lottie-react";
import loginAnimation from "../../animation/login.json";
import useCustomForm from "../../hooks/useCustomForm";
import * as Yup from "yup";
import api from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
  });

  const onSubmit = async (values) => {
    if (values.username.includes("@")) {
      values.email = values.username;
      delete values.username;
    }
    const response = await api.post("/login", values);
    console.log(response);
    if (response.status === 201) {
      login(response.data);
      navigate("/");
    }
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-4 py-8">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left: Registration Form */}
        <div className="w-full md:w-1/2 py-12 px-8 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <SiFusionauth className="text-4xl text-white/90" />
              <span className="text-xl font-bold text-white">TrueAuth</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-6">
              Welcome back!
            </h2>
            <p className="text-sm text-white/90 mt-1">
              Login to continue accessing your secure dashboard.
            </p>
          </div>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <TextInput
              label="Username or Email *"
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
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
            <div className="flex items-center justify-between text-sm text-white/90">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-600" />
                Remember me
              </label>
              <Link
                to="/forget-password"
                className="text-white/90 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-indigo-600 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:bg-indigo-100 transition"
            >
              Log in
            </button>

            <p className="text-sm text-center text-white/90 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-white font-medium hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 bg-transparent items-center justify-center p-6">
          <Lottie
            animationData={loginAnimation}
            loop
            className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
