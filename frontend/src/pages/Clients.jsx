import React, { useEffect, useState } from "react";
import ClientInfoBox from "../components/ClientInfoBox.jsx";
import AddClientForm from "../components/AddClientForm.jsx";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([
    {
      _id: "Harsh-default",
      name: "Harsh Fav Client ❤️",
      email: "soyaa0301@gmail.com",
      userAvatar: "jisoo.png",
    },
  ]);
  const [toggleForm, setToggleForm] = useState(0);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/v1/profile/clients");
        setClients(response.data.data);
      } catch (error) {
        console.log("No Clients were found for this user");
      }
    };
    fetchClients();
  }, [clients, toggleForm]);

  const removeClient = async (clientId) => {
    try {
      await axios.delete(`/api/v1/profile/remove/${clientId}`);
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== clientId)
      );
    } catch (error) {}
  };

  const handleClick = () => {
    setToggleForm(1 - toggleForm);
  };

  return (
    <>
      {toggleForm === 1 && <AddClientForm handleClick={handleClick} />}
      <div
        className={`${
          toggleForm === 1 && "hidden"
        } min-h-screen bg-teal-900 py-3 px-10`}
      >
        <div className="flex justify-end sm:justify-between mb-6">
          <div className="bg-green-500 hidden sm:flex items-center px-2 rounded-lg">
            <p className="font-bold">
              Please refresh the page if client is not added
            </p>
          </div>
          <button
            onClick={() => handleClick()}
            className={`bg-green-600 px-4 py-2 rounded-full font-bold border-2 border-black`}
          >
            Add Client
          </button>
        </div>
        <div className={`flex flex-wrap gap-28 justify-evenly`}>
          {clients.map((values) => (
            <ClientInfoBox
              key={values._id}
              name={values.name}
              email={values.email}
              userAvatar={values.userAvatar}
              removeClient={removeClient}
              clientId={values._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Clients;
