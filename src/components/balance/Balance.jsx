import React from "react";

export const Balance = ({ totalBalance }) => {
  return (
    <div className="p-4">
      <p className="font-bold text-2xl">Balance</p>
      <p className="text-lg">₹{totalBalance.toFixed(2)}</p>
    </div>
  );
};
