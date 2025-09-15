import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/userContext";

const PaymentPanel = (props) => {
  const [selected, setSelected] = useState("upi");
  const { user, setuser } = useContext(UserDataContext);

  const paymentMethods = [
    {
      id: "upi",
      icon: "ri-qr-code-line",
      label: "UPI",
      description: "Google Pay, PhonePe, Paytm",
    },
    {
      id: "card",
      icon: "ri-bank-card-line",
      label: "Credit / Debit Card",
      description: "Visa, Mastercard, Rupay",
    },
    {
      id: "netbanking",
      icon: "ri-bank-line",
      label: "Net Banking",
      description: "All major banks supported",
    },
    {
      id: "wallet",
      icon: "ri-wallet-3-line",
      label: "Wallet",
      description: "Paytm Wallet, Amazon Pay",
    },
    {
      id: "cash",
      icon: "ri-money-rupee-circle-line",
      label: "Cash",
      description: "Pay directly to driver",
    },
  ];

  return (
    <div className="h-full flex flex-col rounded-tr-3xl p-6 bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Choose Payment Method</h1>
        <i
          onClick={() => props.setPayment(false)}
          className="ri-close-line text-2xl text-gray-500 cursor-pointer"
        ></i>
      </div>

      {/* Payment Options */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all 
              ${
                selected === method.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
          >
            <i
              className={`${method.icon} text-2xl ${
                selected === method.id ? "text-green-600" : "text-gray-500"
              }`}
            ></i>
            <div className="flex-1">
              <h2 className="font-semibold text-base">{method.label}</h2>
              <p className="text-gray-500 text-sm">{method.description}</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center 
              ${
                selected === method.id
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300"
              }`}
            >
              {selected === method.id && (
                <i className="ri-check-line text-white text-sm"></i>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Extra actions */}
      {selected === "card" && (
        <button className="mt-4 text-sm text-blue-600 font-medium">
          + Add New Card
        </button>
      )}
      {selected === "upi" && (
        <button className="mt-4 text-sm text-blue-600 font-medium">
          + Add New UPI ID
        </button>
      )}

      {/* Confirm Button */}
      <button
        onClick={() => {
          setuser({
            ...user,
            payment: selected,
          });
          props.setPayment(false);
        }}
        className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md transition-all"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentPanel;
