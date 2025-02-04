import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { VIEW_PROFILE } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

export const AppContext = createContext();

const Body = ({ children }) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);

  const fetchUserData = async () => {
    if (userData) return;
    try {
      const res = await axios.get(VIEW_PROFILE, { withCredentials: true });
      if (res.data.success) {
        dispatch(addUser(res?.data?.user));
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <AppContext.Provider value={{ showProfileCard, setShowProfileCard }}>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default Body;
