import { MdErrorOutline } from "react-icons/md";

const TextInput = ({ label, errors, touched, placeholder, name, ...rest }) => {
  const hasError = errors && touched && touched[name] && errors[name];

  return (
    <div className="relative w-full mb-8">
      <input
        id={name}
        name={name}
        placeholder=" "
        autoComplete="off"
        {...rest}
        className={`peer w-full bg-transparent border-b-2 px-2.5 pt-5 pb-2 text-base text-white focus:outline-none outline-none transition-all duration-300
          ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-white/30 focus:border-purple-500"
          } `}
      />
      <label
        htmlFor={name}
        className={`absolute left-2.5 top-2 text-sm text-white/60 pointer-events-none transition-all duration-200
          peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-300`}
      >
        {label}
      </label>
      {hasError && (
        <div className="flex items-center gap-1 text-red-400 text-sm mt-2 animate-fadeIn">
          <MdErrorOutline className="text-base" />
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );
};

export default TextInput;
