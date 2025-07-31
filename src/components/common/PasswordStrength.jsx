import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const PasswordStrength = ({ score = "" }) => {
  const password = score;

  const getStrength = (password) => {
    if (password.length < 6) {
      return {
        label: "Too Short",
        gradient: "from-red-500 to-red-400",
        width: "10%",
      };
    }

    let score = 0;
    if (/[a-z]/.test(password)) score++; // lowercase
    if (/[A-Z]/.test(password)) score++; // uppercase
    if (/[0-9]/.test(password)) score++; // number
    if (/[^A-Za-z0-9]/.test(password)) score++; // special char

    if (score <= 1)
      return {
        label: "Weak",
        gradient: "from-red-500 to-red-400",
        width: "25%",
      };
    if (score === 2)
      return {
        label: "Medium",
        gradient: "from-yellow-400 to-yellow-300",
        width: "50%",
      };
    if (score >= 3)
      return {
        label: "Strong",
        gradient: "from-green-500 to-green-400",
        width: "100%",
      };
  };

  const strength = getStrength(password);

  return (
    <div className="w-full max-w-md text-white mt-4">
      {/* Strength Bar */}
      <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 bg-gradient-to-r ${strength?.gradient}`}
          style={{ width: strength?.width }}
        />
      </div>

      {/* Label with icon */}
      {password && (
        <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
          {strength.label === "Strong" ? (
            <FaCheckCircle className="text-green-400" />
          ) : (
            <FaExclamationTriangle className="text-yellow-300" />
          )}
          <span>
            Strength: <span className="font-semibold">{strength.label}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
