import React from "react";

export const Alert = ({ type = "info", children, className = "" }) => {
  const baseClasses = "px-4 py-3 rounded-lg text-sm border";
  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;
