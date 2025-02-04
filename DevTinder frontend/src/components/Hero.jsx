"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero.jpg";
import { useDispatch, useSelector } from "react-redux";

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  },[user])

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(to right, #514A9D, #24C6DC)",
      }}
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center">
        <div className="absolute inset- bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
            Connecting Developers. Building Futures.
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
            Find your next tech collaborator, mentor, or opportunity.
          </p>
          <div className="space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-2 ease-in-out transform hover:scale-105 animate-pulse">
              <Link to="/signup">Create an Account</Link>
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out">
              <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          <ChevronDownIcon className="h-8 w-8 text-white animate-bounce" />
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 bg-white text-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Empowering Developers, Building Futures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Innovate Together",
                description:
                  "DevTinder is the bridge connecting the most creative minds in the tech industry. Collaborate, share ideas, and innovate like never before.",
              },
              {
                title: "Build Meaningful Connections",
                description:
                  "Find peers who share your passion for technology. Forge connections that lead to groundbreaking projects and lifelong friendships.",
              },
              {
                title: "Explore Tech Opportunities",
                description:
                  "Stay updated with the latest trends, job opportunities, and resources in the tech world. DevTinder helps you stay ahead.",
              },
              {
                title: "Your Tech Haven",
                description:
                  "DevTinder is a community where developers thrive, learn, and grow. Together, we’re building the future of technology.",
              },
              {
                title: "Learn. Create. Lead.",
                description:
                  "Whether you're a beginner or an expert, DevTinder provides the platform to share knowledge, learn, and become a leader in the tech space.",
              },
              {
                title: "Join the Movement",
                description:
                  "Be part of a growing network of developers pushing the boundaries of innovation. DevTinder is your gateway to a brighter tech future.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-[6px] shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.01] hover:shadow-2xl"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 mt-2">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-cyan-400">
            Why Join DevTinder?
          </h2>
          <p className="text-sm max-w-3xl mx-auto leading-relaxed">
            DevTinder helps you connect with like-minded developers, find
            mentors, collaborate on exciting projects, and grow your career in
            the tech industry. Whether {"you're "}looking for your next big
            opportunity or want to expand your professional network, DevTinder
            is the platform for you.
          </p>
        </div>
      </section>
    </div>
  );
}
