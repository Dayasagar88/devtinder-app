"use client";

import axios from "axios";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast } from "sonner";
import { AppContext } from "./Body";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [inputFields, setInputFields] = useState({
    emailId: "",
    password: "",
  });
  const user = useSelector((store) => store.user);
  const { setShowProfileCard } = useContext(AppContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateForm = (formData) => {
    // Add validation logic here if needed
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      // Handle  form submission logic here
      const res = await axios.post(
        LOGIN_URL,
        {
          ...inputFields, //server expect the fields directly instead of nested object
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(addUser(res.data?.user));
        toast.success(res.data?.message);
        navigate("/app");
        
       
        if (res.data?.user?.new) setShowProfileCard(true);
      }
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.response.data);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <div
      className=" h-[calc(100vh-64px)] flex items-center justify-center p-4 animate-fade-in"
      style={{
        background: "linear-gradient(to right, #514A9D, #24C6DC)",
      }}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Welcome Back to DevTinder
        </h1>
        <div className="bg-gray-800 p-6 shadow-lg rounded-[6px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg text-sm"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                value={inputFields.emailId}
                onChange={(e) =>
                  setInputFields((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                type="email"
                id="emailId"
                name="emailId"
                placeholder="john@example.com"
                className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              {errors.emailId && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <div className=" relative">
                <input
                  value={inputFields.password}
                  onChange={(e) =>
                    setInputFields((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  type={!isPasswordVisible ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder={isPasswordVisible ? "••••••••" : "john@1234"}
                  className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
                {!isPasswordVisible ? (
                  <Eye
                    onClick={togglePassword}
                    className=" absolute right-2 top-1 cursor-pointer"
                  />
                ) : (
                  <EyeClosed
                    onClick={togglePassword}
                    className="absolute right-2 top-1 cursor-pointer"
                  />
                )}
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin m-auto" /> : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/signup"
              className="text-sm text-cyan-300 hover:text-cyan-400"
            >
              {"Don't"} have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
