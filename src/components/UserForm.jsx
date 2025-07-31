import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useCustomForm from "../hooks/useCustomForm";
import * as Yup from "yup";
import api from "../api/api";
import TextInput from "./common/TextInput";
import PasswordStrength from "./common/PasswordStrength";

const UserForm = () => {
  const [isPassword, setIsPassword] = useState(false);
  const { user, updateUser } = useAuth();
  console.log("User:", user);
  const initialValues = {
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters.")
      .max(28, "Username must not exceed 28 characters."),
  });

  const onSubmit = async (values) => {
    const response = await api.post("/update-profile", values);
    updateUser(response.data.data);
    return response;
  };

  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <div className="w-full h-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl text-white p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>

      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={formik.handleSubmit}
      >
        {!isPassword ? (
          <>
            <div className="col-span-1">
              <TextInput
                label="Username *"
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
                value={formik.values.username}
              />
            </div>

            <div className="col-span-1">
              <TextInput
                label="Email *"
                type="email"
                name="email"
                disabled
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
                value={formik.values.email}
              />
            </div>

            <div className="sm:col-span-2">
              <TextInput
                label="Phone"
                type="tel"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
                value={formik.values.phone || ""}
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-1">
              <TextInput
                label="Password *"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
            </div>

            <div className="col-span-1">
              <TextInput
                label="Confirm Password *"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
            </div>

            <div className="sm:col-span-2 w-full">
              <PasswordStrength score={formik.values.password} />
            </div>
          </>
        )}

        <div className="sm:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setIsPassword(!isPassword)}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-300 to-indigo-400 text-indigo-800 font-bold px-6 py-3 rounded-lg shadow-md hover:from-purple-400 hover:to-indigo-500 transition"
          >
            {isPassword ? "Back to Profile" : "Change Password"}
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-100 transition"
          >
            {isPassword ? "Update Password" : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
