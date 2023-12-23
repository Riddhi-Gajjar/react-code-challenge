import React from "react";

export const Expense = ({ totalExpense }) => {
  return (
    <div className="p-4">
      <p className="font-bold text-2xl">Expense</p>
      <p className="text-lg">₹{totalExpense.toFixed(2)}</p>
    </div>
  );
};
