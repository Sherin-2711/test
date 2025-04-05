// components/Navbar.jsx
import React from "react";
import { FaRegMap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFC300] text-sm ${className}`}
    />
  );
};

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-full font-medium transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const isCreator = user?.email === "creator@example.com";

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-[#85A947] shadow-lg">
      <div
        className="text-3xl text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Wanderlust Canvas
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-1 text-white hover:text-[#FFC300] transition cursor-pointer text-lg"
          onClick={() => navigate("/")}
        >
          <FaRegMap className="text-xl" />
          <span>Explore</span>
        </div>

        <Input
          type="text"
          placeholder="Search"
          className="w-48"
          style={{ backgroundColor: "#fff", color: "#333" }}
        />

        {!user ? (
          <>
            <Button
              className="bg-[#ffff] hover:bg-[#FFC300] text-[#000]"
              onClick={() => navigate("/search")}
            >
              Search Form
            </Button>
            <Button
              className="bg-[#FFF] hover:bg-[#FFC300] text-[#000]"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button className="bg-white text-[#000] hover:bg-[#FFC300] hover:text-white">
              Signup
            </Button>
          </>
        ) : isCreator ? (
          <>
            <Button
              className="bg-[#Fff] hover:bg-[#FFC300] text-[#85A947"
              onClick={() => navigate("/upload")}
            >
              Upload Photos
            </Button>
            <span className="text-white font-medium">Creator</span>
            <Button
              className="bg-white text-[black] hover:bg-[#FFC300] hover:text-black"
              onClick={() => setUser(null)}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              className="bg-white text-[#C70039] hover:bg-[#FFC300] hover:text-white"
              onClick={() => navigate("/search")}
            >
              Search Form
            </Button>
            <span className="text-white font-medium">Demo User</span>
            <Button
              className="bg-white text-[#C70039] hover:bg-[#FFC300] hover:text-white"
              onClick={() => setUser(null)}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
