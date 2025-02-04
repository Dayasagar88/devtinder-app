"use client";

import axios from "axios";
import { Eye, EyeClosed, Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_URL } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const user = useSelector(store => store.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const HandleFormData = async (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await axios.post(
        SIGNUP_URL,
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data)
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
   useEffect(() => {
      if(user){
        navigate("/app")
      }
    },[user])

  return (
    <div
      className=" h-[calc(100vh-64px)] flex  items-center justify-center p-4 animate-fade-in"
      style={{
        background: "linear-gradient(to right, #514A9D, #24C6DC)",
      }}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Create DevTinder Account
        </h1>
        <div className="bg-gray-800 p-6  shadow-lg rounded-[6px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg text-sm"
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-200"
              >
                First Name
              </label>
              <input
                value={formData.firstName}
                onChange={(e) => HandleFormData(e)}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-200"
              >
                Last Name
              </label>
              <input
                value={formData.lastName}
                onChange={(e) => HandleFormData(e)}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                value={formData.emailId}
                onChange={(e) => HandleFormData(e)}
                type="email"
                id="emaiId"
                name="emailId"
                placeholder="john@example.com"
                className="mt-1 block w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <div className=" relative">
                <input
                  value={formData.password}
                  onChange={(e) => HandleFormData(e)}
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
              {isLoading ? (
                <Loader className="animate-spin m-auto" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-cyan-300 hover:text-cyan-400"
            >
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
