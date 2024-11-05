import React from "react";
import { useNavigate } from "react-router-dom";

const Temp = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-[20%] bg-gradient-to-t from-gray-800 to-yellow-500 flex flex-col justify-between items-center py-7">
          <div className="flex flex-col gap-20">
            <div className="flex gap-1 justify-center">
              <h1 className="font-dancing-script font-bold text-2xl">
                BillCraft
              </h1>
              <img src="invoice.svg" alt="invoice" className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col gap-1 items-center">
                <div className="h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src="space-bg.jpg"
                    alt="space"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h1 className="font-bold text-2xl">Harsh Tayal</h1>
              </div>
              <div>
                <h1>Add Yours</h1>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="font-bold text-2xl">Log Out</button>
          </div>
        </div>
        <div className="w-[80%] px-8 pt-8 flex flex-col gap-14">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl">Welcome back, Harsh!</h1>
              <h2 className="text-gray-500">Take a look at all the beautiful templates available</h2>
            </div>
            <div>
                <button onClick={() => navigate("/clients")}>Clients</button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="h-[30rem] rounded-xl border-2 border-black overflow-hidden flex gap-2">
                <div className="bg-red-400 h-full w-[80%] overflow-auto">
                    <img src="template1.png" alt="space" className="h-[220%] w-full" />
                </div>
                <div className="bg-red-500 w-[20%] flex justify-center items-center">
                    <button onClick={() => window.open('http://localhost:5173/testing2', '_blank')} className="bg-gradient-to-t from-gray-800 to-yellow-500 py-3 px-10 text-2xl text-white font-bold rounded-2xl">Use</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Temp;
