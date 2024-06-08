import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AudienceForm from "./components/AudienceForm";
import CampaignsList from "./components/CampaignsList";
import Login from "./components/Login";
import axios from "axios";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/current_user");
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = (profile) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Footer />
    </>
    // <Router>
    //   {/* <div className="container mx-auto p-4">
    //     <nav className="mb-4">
    //       <Link to="/" className="mr-4">
    //         Home
    //       </Link>
    //       {user ? (
    //         <>
    //           <Link to="/create-audience" className="mr-4">
    //             Create Audience
    //           </Link>
    //           <Link to="/campaigns">Campaigns</Link>
    //         </>
    //       ) : null}
    //     </nav>
    //     <Login onLogin={handleLogin} onLogout={handleLogout} user={user} />
    //     <Routes>
    //       <Route path="/create-audience" element={<AudienceForm />} />
    //       <Route path="/campaigns" element={<CampaignsList />} />
    //       <Route
    //         path="/"
    //         element={
    //           <h1 className="text-3xl font-bold">Welcome to the Mini CRM</h1>
    //         }
    //       />
    //     </Routes>
    //   </div> */}
    // </Router>
  );
}

export default App;
