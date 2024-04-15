import React from "react";
export const Error500 = () => {
  return (
    <div className="min-h-[600px] m-auto w-auto max-w-[560px] flex items-center justify-center flex-row">
      <h1 className="max-w-[529px] font-semibold mb-4">Woops! Something went wrong</h1>
      <h2 className="error-subtitle">
        Have you tried turning it off and on again?
      </h2>
    </div>
  );
};

export default Error500;
