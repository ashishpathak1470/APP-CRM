import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AudienceList from './components/AudienceForm';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (

    <>
    <AudiaenceForm/>
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={user ? <Navigate to="/audience" /> : <Login onLogin={handleLogin} onLogout={handleLogout} user={user} />} />
    //     <Route path="/audience" element={user ? <AudienceList user={user} /> : <Navigate to="/" />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
