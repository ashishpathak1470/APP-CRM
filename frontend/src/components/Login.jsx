import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const clientId = "751320634084-347l3i08eao8c601d7bqn36g091b4b3f.apps.googleusercontent.com";

const Login = ({ onLogin, onLogout, user = null }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGSI = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "outline", size: "large" }
        );
      }
    };

    const handleCredentialResponse = async (response) => {
      try {
        const res = await axios.post("http://localhost:3000/auth/google", {
          token: response.credential,
        });
        onLogin(res.data);
        navigate('/audience');
      } catch (error) {
        console.error(error);
      }
    };

    initializeGSI();
  }, [onLogin, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout");
      onLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded w-full max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-4 text-lg">
            Log in to access your CRM dashboard and manage your customer
            relationships effectively.
          </p>
          {user ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/audience"><div id="google-signin-button"></div></Link>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <img
          src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?size=626&ext=jpg&ga=GA1.1.523283729.1717857103&semt=sph"
          alt="CRM Dashboard"
          className="object-contain h-full w-full"
        />
      </div>
    </div>
  );
};

export default Login;
