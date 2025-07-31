import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a11cb] to-[#2575fc] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl text-center text-white">
        {/* Animation */}
        <div className="w-60 h-60 mx-auto mb-6">
          <img src="../assets/unauthorized.webp" alt="" />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm text-white/80 mb-6">
          You do not have permission to access this page.
        </p>

        {/* Go Back Button */}
        <Link
          to="/"
          className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-full transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
