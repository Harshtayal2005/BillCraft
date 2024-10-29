import React from "react";
import ClientInfoBox from "../components/ClientInfoBox.jsx";

const Clients = () => {
  return (
    <>
      <div className="min-h-screen bg-[#5f878b] py-3 px-5">
        <div className="py-4 mb-4">Hola people</div>
        <div className="flex flex-wrap gap-4 justify-around">
          <ClientInfoBox />
          <ClientInfoBox />
          <ClientInfoBox />
          <ClientInfoBox />
        </div>
      </div>
    </>
  );
};

export default Clients;
