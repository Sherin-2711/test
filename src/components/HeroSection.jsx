// components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} // replace with your actual image path
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center max-w-xl">
        <h1 className="text-white text-4xl font-bold mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-white text-lg mb-6">
          Find hidden gems, explore cultures, and make unforgettable memories.
        </p>

        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="Search destinations..."
            className="px-6 py-3 w-full focus:outline-none rounded-l-full text-gray-700"
          />
          <button className="bg-[#85A947] text-white px-6 py-3 font-semibold hover:bg-[#FF5733] transition-all rounded-r-full">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
