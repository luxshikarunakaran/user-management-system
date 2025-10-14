import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:opacity-90",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-50",
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="text-current" />}
      {children}
    </button>
  );
};

export default Button;
