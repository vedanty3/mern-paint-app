import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Canvas from "../Components/Canvas";

const Secret = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user}`, { theme: "dark", position: "bottom-right" });
      }
    };
    verifyUser();
  }, [navigate, cookies, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/register");
  };

  return (
    <>
      <div className="App">
        <nav>
          <button onClick={logout}>Logout</button>
        </nav>
        <div className="canvas">
          <Canvas width={1024} height={650} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Secret;
