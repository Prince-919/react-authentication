import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditDrawer = ({ isOpen, user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white z-50 shadow-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700">Edit User</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {["username", "email", "role", "phone"].map((field) => (
          <div key={field}>
            <label className="text-xs text-gray-500 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditDrawer;
