import React from "react";

export const Input = ({
  label,
  error,
  className = "",
  disabled = false,
  ...props
}) => {
  const inputClasses = `w-full h-11 px-3 border rounded-lg outline-none transition ${
    error
      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
      : "border-gray-300 focus:ring-2 focus:ring-indigo-400"
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input className={inputClasses} disabled={disabled} {...props} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
