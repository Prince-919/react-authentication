import { SiFusionauth } from "react-icons/si";
import Lottie from "lottie-react";
import OTPAnimation from "../../animation/OTP.json";

const OtpForm = ({ inputRef, handleSubmit }) => {
  const handleKeyUp = (index, e) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRef.current[index - 1].focus();
    } else if (
      e.target.value.length === 1 &&
      index < inputRef.current.length - 1
    ) {
      inputRef.current[index + 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData("text");
    const digits = pasteData.replace(/\D/g, "").split("");
    digits.forEach((digit, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = digit;
        if (index < inputRef.current.length - 1) {
          inputRef.current[index + 1].focus();
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] px-4 py-8">
      <div className="flex bg-white/10 backdrop-blur-lg border border-white/30 flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 py-12 px-8 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <SiFusionauth className="text-4xl text-white/90 mb-3 mx-auto md:mx-0" />
            <h2 className="text-3xl font-extrabold text-white">Verify OTP</h2>
            <p className="text-sm text-white mt-1">
              We’ve sent a 6-digit OTP to your email. Enter it below to
              continue.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-2 justify-center md:justify-start">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center text-white bg-transparent text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ref={(el) => (inputRef.current[index] = el)}
                  onKeyUp={(e) => handleKeyUp(index, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-white text-indigo-600 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:bg-indigo-100 transition"
            >
              Verify Email OTP
            </button>

            <p className="text-sm text-center text-white/90">
              Didn’t receive the code?{" "}
              <button
                type="button"
                className="text-white font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </form>
        </div>
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center p-6 bg-white">
          <Lottie
            animationData={OTPAnimation}
            loop={true}
            className="w-full max-w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
