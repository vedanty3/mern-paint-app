import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
        } else toast(`Hi ${data.user}`, { theme: "dark" });
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
      <div className="private">
        <button onClick={logout}>Logout</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Secret;
