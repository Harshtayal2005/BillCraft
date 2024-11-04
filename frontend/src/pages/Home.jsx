import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("/api/v1/profile");
        if (response.status !== 200) {
          navigate("/welcome");
        }
      } catch (error) {
        navigate("/welcome");
      }
    };
    verifyUser();
  }, [navigate]);

  return <div>ulllllaalalalala home</div>;
};

export default Home;
