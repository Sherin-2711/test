// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import SearchForm from "./components/SearchForm";
import SubscriptionPlans from "./components/SubscriptionPlans";
import UploadPhotos from "./components/UploadPhotos";
import CreateBlog from "./components/CreateBlog";
import Chatbot from "./components/Chatbot";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
        />
        <Route path="/search" element={<SearchForm/>}/>
        <Route path="/subscription" element={<SubscriptionPlans/>}/>
        <Route path="/upload"  element={<UploadPhotos/>}/>
        <Route path="/blog"  element={<CreateBlog/>}/>
        <Route path="/chatboot" element={<Chatbot />} />
      </Routes>

    
    </Router>
  );
};

export default App;
