"use client";
import React, { useEffect } from "react";

interface ErrorProps {
  reset: () => void;
  error: unknown;
}

const error = ({ reset, error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center space-y-5 mt-5 mx-5">
      <h1 className="text-base sm:text-lg md:text-2xl text-amber-700 dark:text-amber-400">
        Something went wrong, please try again.
      </h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default error;
