import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
        <div className="h-[30rem] w-2/3 bg-black rounded-xl text-white flex flex-col justify-center items-center">
          <div className="flex items-center gap-2">
            <h1>Welcome to <span className="font-dancing-script">BillCraft</span></h1>
            <img src="/invoice.svg" alt="" className="h-6 w-6" />
          </div>
          <div>
            <p>
              Effortlessly manage clients and create custom invoices using our
              beautiful, customizable templates.
            </p>
          </div>
          <div>
            <button onClick={() => navigate("/register")} className="bg-red-600 py-2 px-2 rounded-lg">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
