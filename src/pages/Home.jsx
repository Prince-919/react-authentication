// import { Link } from "react-router-dom";
// import { SiFusionauth } from "react-icons/si";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center px-6 py-16">
//       <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-10 shadow-2xl">
//         <div className="flex flex-col md:flex-row items-center gap-10">
//           {/* Left Side */}
//           <div className="text-center md:text-left w-full md:w-1/2">
//             <div className="flex justify-center md:justify-start mb-4">
//               <SiFusionauth className="text-white text-4xl" />
//             </div>
//             <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
//               Your Gateway to Secure Access
//             </h1>
//             <p className="text-white/90 mt-4 text-lg">
//               TrueAuth is the modern solution for authentication and user
//               management. Login, register, and manage with confidence.
//             </p>

//             <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
//               <Link
//                 to="/login"
//                 className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 hover:backdrop-blur-lg transition"
//               >
//                 Register
//               </Link>
//             </div>
//           </div>

//           {/* Right Side: Optional Illustration */}
//           <div className="hidden md:block w-full md:w-1/2">
//             <img
//               src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
//               alt="Authentication Illustration"
//               className="rounded-xl shadow-lg w-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";
import { SiFusionauth } from "react-icons/si";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="text-center md:text-left w-full md:w-1/2">
            <div className="flex justify-center md:justify-start mb-4">
              <SiFusionauth className="text-white text-4xl" />
            </div>

            {isAuthenticated ? (
              <>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Welcome, {user?.username}!
                </h1>
                <p className="text-white/90 mt-4 text-lg">
                  You're successfully logged in to <strong>TrueAuth</strong>.
                  Manage your account securely and efficiently.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Your Gateway to Secure Access
                </h1>
                <p className="text-white/90 mt-4 text-lg">
                  TrueAuth is the modern solution for authentication and user
                  management. Login, register, and manage with confidence.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
                  <Link
                    to="/login"
                    className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-100 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 hover:backdrop-blur-lg transition"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="hidden md:block w-full md:w-1/2">
            <img
              src="../assets/programmer.gif"
              alt="Authentication Illustration"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
