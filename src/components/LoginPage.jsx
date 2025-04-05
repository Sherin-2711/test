// components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (email === "demo@example.com" && password === "demo123") {
        setUser({ name: "Demo User", email: "demo@example.com" });
        navigate("/");
      } else if (email === "creator@example.com" && password === "creator123") {
        setUser({ name: "Creator", email: "creator@example.com" });
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F0D7]">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#85A947] px-8 py-6 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-white text-opacity-90 mt-1">Log in to continue your journey</p>
          </div>
          
          {/* Form Section */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <label className="block text-[#333] text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">✉</span>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#F0F0D7] bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] transition"
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-[#333] text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">🔒</span>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-[#F0F0D7] bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] transition"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="text-gray-500">
                    {showPassword ? "👁" : "👁‍🗨"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-[#85A947] hover:underline">Forgot password?</a>
              </div>
            </div>
            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full bg-[#85A947] text-white py-3 px-4 rounded-lg font-medium shadow-md hover:bg-opacity-90 transition flex justify-center items-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="inline-block animate-pulse">Logging in...</span>
              ) : (
                "Log In"
              )}
            </button>
            
            <div className="mt-6 text-center">
              <span className="text-[#333] text-sm">Don't have an account?</span>
              <a href="#" className="text-[#85A947] text-sm font-medium ml-1 hover:underline">
                Sign up now
              </a>
            </div>
          </div>
        </div>
        
        {/* Demo credentials */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md border-l-4 border-[#85A947]">
          <p className="text-sm text-[#333] font-medium">Demo Credentials:</p>
          <p className="text-xs text-gray-600 mt-1">Email: demo@example.com | Password: demo123</p>
          <p className="text-xs text-gray-600">Email: creator@example.com | Password: creator123</p>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-[#333] opacity-70">
            © 2025 Travel Blog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;