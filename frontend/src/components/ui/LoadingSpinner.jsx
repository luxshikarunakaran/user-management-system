import React from "react";
import { IconSpinner } from "../../icons/index.jsx";

export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  return (
    <IconSpinner
      className={`${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
};

export default LoadingSpinner;
