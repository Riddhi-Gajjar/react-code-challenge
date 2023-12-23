import React, { useState, useRef } from "react";
import { Balance } from "../balance/Balance";
import { Expense } from "../expense/Expense";

export const Tracker = () => {
  const [showAmountForm, setShowAmountForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [updatedExpense, setShowUpdatedExpense] = useState();
  const [updatedBalance, setShowUpdatedBalance] = useState();

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleAddAmount = () => {
    setShowAmountForm(true);
    setShowExpenseForm(false);
  };
  const handleAmountSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      type: "balance",
      amount: parseFloat(amount),
      description,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
    setShowAmountForm(false);
  };
  const handleExpense = () => {
    setShowAmountForm(false);
    setShowExpenseForm(true);
  };
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const currentTotalBalance = calculateTotalBalance();
    if (currentTotalBalance - parseFloat(expenseAmount) >= 0) {
      const newTransaction = {
        type: "expense",
        amount: parseFloat(expenseAmount),
        description: expenseDescription,
      };

      setTransactions([...transactions, newTransaction]);
      setExpenseAmount("");
      setExpenseDescription("");
      setShowExpenseForm(false);
    } else {
      alert("Expense exceeds available balance. Cannot add expense.");
    }
  };
  const handleSelectedTrasaction = (index, type) => {
    if (type == "expense") {
      setSelectedTransaction(transactions[index]);
    }
  };
  const calculateTotalBalance = () => {
    const totalBalance = transactions
      .filter((transaction) => transaction.type === "balance")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const calculatedBalance = totalBalance - totalExpense;
    return calculatedBalance >= 0 ? calculatedBalance : totalBalance;
  };
  const totalBalance = calculateTotalBalance();
  let totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const handleDeleteTransaction = (selectedTransaction) => {
    if (selectedTransaction) {
      const trasactionData = transactions.filter(
        (transaction) => transaction !== selectedTransaction
      );
      setTransactions(trasactionData);
      setSelectedTransaction(null);
    }
  };

  const addUpdatedexpense = (transaction) => {
    let totalExpenseInt = parseInt(totalExpense);
    let totalBalanceInt = parseInt(totalBalance);
    let transactionInt = parseInt(transaction);
    setShowUpdatedExpense(totalExpenseInt + transactionInt);
    setShowUpdatedBalance(totalBalanceInt - transactionInt);
    setSelectedTransaction(false);
  };

  return (
    <div className="container mx-auto">
      <div className="tracker-wrapper font-NunitoSans md:p-7 mt-3  text-left inline-block border-2">
        <p className="font-bold text-3xl">Expense Tracker</p>
        <div className="flex mt-3">
          <Balance
            totalBalance={updatedBalance ? updatedBalance : totalBalance}
          />
          <p className="border border-black"></p>
          <Expense
            totalExpense={updatedExpense ? updatedExpense : totalExpense}
          />
        </div>
        <div className="btn-wrapper flex flex-col items-start m-5">
          {showAmountForm ? (
            <form
              className="absolute right-0 top-0 lg:right-[50px] flex flex-col bg-slate-300 p-3 m-2 text-xl text-right"
              onSubmit={handleAmountSubmit}
            >
              <span
                className="close-icon cursor-pointer text-4xl"
                onClick={() => setShowAmountForm(false)}
              >
                &times;
              </span>
              <input
                type="number"
                id="amount"
                value={amount}
                placeholder="Amount"
                onChange={(event) => setAmount(event.target.value)}
                required
              />
              <input
                type="text"
                id="description"
                value={description}
                placeholder="Description"
                onChange={(event) => setDescription(event.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-slate-400 p-2 mt-2 rounded-full"
              >
                Add Amount
              </button>
            </form>
          ) : null}

          <button
            onClick={handleAddAmount}
            className="bg-slate-400 px-6 py-4 mb-2 rounded-full"
          >
            Add Amount
          </button>
          {showExpenseForm ? (
            <form
              className="absolute right-0 top-0 lg:right-[50px] flex flex-col bg-slate-300 p-3 m-2 text-xl text-right"
              onSubmit={handleExpenseSubmit}
            >
              <span
                className="cursor-pointer text-4xl"
                onClick={() => setShowExpenseForm(false)}
              >
                &times;
              </span>
              <input
                type="number"
                id="expenseAmount"
                value={expenseAmount}
                placeholder="Amount"
                onChange={(event) => setExpenseAmount(event.target.value)}
                required
              />
              <input
                type="text"
                id="expenseDescription"
                value={expenseDescription}
                placeholder="Description"
                onChange={(event) => setExpenseDescription(event.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-slate-400 p-2 mt-2 rounded-full"
              >
                Add expense
              </button>
            </form>
          ) : null}
          <button
            onClick={handleExpense}
            className="bg-slate-400 px-6 py-4 mb-2 rounded-full"
          >
            Add Expense
          </button>
        </div>
        <div className="transaction-detail">
          <p className="font-bold">Recent Transactions:</p>
          <div>
            <ul>
              {transactions.map((transaction, index) => (
                <li
                  key={index}
                  className={`${
                    transaction.type == "balance" && "cursor-not-allowed"
                  } m-3 bg-slate-400 px-6 py-3 mb-2 cursor-pointer`}
                  onClick={() =>
                    handleSelectedTrasaction(index, transaction.type)
                  }
                >
                  {transaction.description}
                  <p>₹{transaction.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedTransaction && (
          <div className="absolute right-0 lg:right-[50px] bg-slate-300 text-xl p-3 flex flex-col items-start ">
            <span
              className="cursor-pointer text-4xl"
              onClick={() => setSelectedTransaction(false)}
            >
              &times;
            </span>
            <input
              defaultValue={selectedTransaction.amount}
              onChange={(event) => setSelectedTransaction(event.target.value)}
            />
            <input defaultValue={selectedTransaction.description} />
            <div>
              <button
                className="bg-slate-400 p-2 m-1 rounded-full"
                onClick={() => addUpdatedexpense(selectedTransaction)}
              >
                Add Expense
              </button>
              <button
                onClick={() => handleDeleteTransaction(selectedTransaction)}
                className="bg-slate-400 p-2 m-1 rounded-full"
              >
                Delete Expense
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
