import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen bg-black flex flex-col">
        <div className="flex text-white items-center gap-1 absolute left-4 top-4">
          <h1 className="text-3xl font-dancing-script">BillCraft</h1>
          <img src="/invoice.svg" alt="" className="h-5 w-5" />
        </div>
        <div className="h-full rounded-xl text-white flex items-center">
          <div className="flex flex-col gap-8 w-1/2 pl-14">
            <div className="flex items-center gap-2">
              <h1 className="text-7xl">
                Welcome to{" "}
                <span className="font-dancing-script">BillCraft</span>
              </h1>
            </div>
            <div className="w-2/3 text-gray-400">
              <p>
                Effortlessly manage clients and create custom invoices using our
                beautiful, customizable templates.
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate("/register")}
                className="bg-teal-600 py-3 px-8 rounded-3xl font-bold text-2xl"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="h-[25rem] w-[25rem] flex justify-center items-center rounded-full overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 shadow-[0px_0px_20px_10px_#81e6d9]">
              <p className="text-9xl font-dancing-script">Hello</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
