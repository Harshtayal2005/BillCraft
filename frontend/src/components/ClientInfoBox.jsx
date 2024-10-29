import React from "react";

const ClientInfoBox = () => {
  return (
    <>
      <div className="inline-flex flex-col gap-4 bg-white rounded-b-2xl rounded-t-[7rem]">
        <div className="h-[14rem] w-[14rem] rounded-full overflow-hidden border-2 border-white">
          <img
            src="https://t4.ftcdn.net/jpg/07/08/47/75/360_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg"
            alt="jisoo image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="font-bold p-3 flex flex-col gap-1">
          <p className="text-lg">Harsh Tayal</p>
          <p className="text-sm text-gray-500">harshtayal2005@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default ClientInfoBox;
