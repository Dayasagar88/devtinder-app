import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  EDIT_PROFILE_URL,
  LOGOUT_URL,
  VIEW_PROFILE,
} from "../constants/routes";
import { addUser, removeUser } from "../utils/userSlice";
import ProfileCard from "./ProfileCard";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { removeConnections } from "@/utils/connectionSlice";
import { removeConnectionRequest } from "@/utils/connectionRequestSlice";
import { removeFeed } from "@/utils/feedSlice";
import { AppContext } from "./Body";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const {showProfileCard, setShowProfileCard} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.post(LOGOUT_URL, {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(removeUser());
        dispatch(removeConnections());
        dispatch(removeConnectionRequest());
        dispatch(removeFeed());
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleProfileClick = () => {
    setShowProfileCard(true);
  };

  const handleCloseProfileCard = () => {
    setShowProfileCard(false);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        EDIT_PROFILE_URL,
        { ...updatedUser , new : false},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data?.message);
        dispatch(addUser(res.data?.loggedInUser));
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user?.new || 
      (!user?.about && !user?.profession && !user?.age && !user?.gender && !user?.photoUrl)
    ) {
      setIsProfileComplete(false);
    } else {
      setIsProfileComplete(true);
    }
  }, [user]);

  return (
    <div
      className="navbar h-[64px] top-0 text-gray-200 z-20"
      style={{
        background: "linear-gradient(to right, #3B3A73, #1F78A4)", // Slightly darker tones
      }}
    >
      <div className="flex-1">
        <Link to={user ? "/app" : "/"} className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          {!isProfileComplete && (
            <Badge variant="secondary">
              &quot;Hey {user?.firstName}! Complete your profile <br /> and make
              it stand out!&quot;
            </Badge>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="img" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link onClick={handleProfileClick} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {showProfileCard && user && (
        <ProfileCard
          loading={isLoading}
          user={user}
          onClose={handleCloseProfileCard}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default Navbar;
