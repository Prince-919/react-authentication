import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-4 py-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col items-center text-center">
        <img
          src="../assets/pagenotfound.gif"
          alt="404 Animation"
          className="w-full max-w-[300px] mb-6 rounded-md overflow-hidden"
        />

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-white/90 mb-6 text-sm md:text-base">
          Oops! The page you're looking for doesn’t exist or might have been
          moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-full transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
