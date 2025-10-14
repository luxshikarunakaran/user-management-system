import React from "react";

export const LoadingState = ({
  message = "Loading...",
  className = "",
  showMessage = true,
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      {showMessage && (
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
      <div className="h-96 bg-gray-200 rounded-2xl"></div>
    </div>
  );
};

export default LoadingState;
