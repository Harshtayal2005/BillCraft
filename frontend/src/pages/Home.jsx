import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AvatarUploader from "../components/AvatarUploader.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Home = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [toggle, setToggle] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const [templates, setTemplates] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [hamBurgerMenu, setHamBurgerMenu] = useState(0);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("/api/v1/profile");
        setUserInfo(response.data.data);
        if (response.status !== 200) {
          navigate("/error");
        }
      } catch (error) {
        navigate("/welcome");
      }
    };
    verifyUser();
    const getAvatar = async () => {
      try {
        const response = await axios.get("/api/v1/userAvatar/getAvatar");
        setAvatar(response.data.data.avatarUrl);
      } catch (error) {
        navigate("/welcome");
      }
    };
    getAvatar();
  }, [navigate, toggle]);

  const handleClick = () => {
    setToggle(1 - toggle);
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
      navigate("/signin");
    } catch (error) {
      navigate("/error");
      console.log("Error logging out", error);
    }
  };

  return (
    <>
      {toggle === 1 && <AvatarUploader handleClick={handleClick} />}
      <div className={`${toggle === 1 && "hidden"} min-h-screen flex`}>
        <div className="hidden w-[20%] bg-gradient-to-tl from-gray-900 to-lime-700 lg:flex flex-col justify-between items-center py-7 text-white">
          <div className="flex flex-col gap-20">
            <div className="flex gap-1 justify-center">
              <h1 className="font-great-vibes-regular font-bold text-2xl">
                BillCraft
              </h1>
              <img src="invoice.svg" alt="invoice" className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col gap-1 items-center">
                <div className="h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h1 className="text-2xl">{userInfo.fullname}</h1>
              </div>
              <div>
                <button onClick={handleClick}>Add Yours</button>
              </div>
            </div>
          </div>

          <div className="flex justify-center sticky bottom-8">
            <button onClick={handleLogoutClick} className="font-bold text-2xl">
              Log Out
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[80%] px-8 pt-8 flex flex-col gap-14">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">Welcome back, {userInfo.fullname}</h1>
              <h2 className="text-gray-500">
                Take a look at all the beautiful templates available
              </h2>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => navigate("/clients")}
                className="hidden lg:block bg-gradient-to-tl from-gray-900 to-lime-700 text-yellow-400 py-3 px-8 rounded-full"
              >
                Clients
              </button>
              <GiHamburgerMenu className="lg:hidden text-3xl mr-3" />
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly gap-8">
            {templates.map((template) => (
              <div key={template} onClick={() => window.open("https://bill-craft-by-harshtayal.vercel.app//template1")} className="h-[30rem] w-[20rem] rounded-lg border border-gray-300 overflow-hidden hover:cursor-pointer hover:scale-105 duration-500">
                <img
                  src="template1.png"
                  alt="template1"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
