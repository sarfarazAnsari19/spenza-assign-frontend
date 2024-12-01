import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Auth = () => {
  const { login, authToken, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!response.ok) return false;
      const data = await response.json();
      return data.valid; 
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("username");

    if(token && verifyToken(token)) {
      setIsLoggedIn(!!token); // Set to true if token exists and valid
      setUsername(user);
    }
  }, [authToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/register";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok && isLogin) {
      login(data.token, username);
      setIsLoggedIn(true);
    } else {
      alert(data.message || "Operation failed");
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
         <h2>{isLogin ? "Login" : "Sign Up"}</h2>
         <form onSubmit={handleLogin}>
           <input
             type="text"
             placeholder="Username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           />
           <input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <button type="submit">{isLogin ? "Login" : "Register"}</button>
         </form>
         <button onClick={() => setIsLogin(!isLogin)}>
           {isLogin ? "Switch to Register" : "Switch to Login"}
         </button>
       </div>
      ) : (
        <div>
          <h1>Welcome {username}! You are logged in.</h1>
          <button onClick={() => navigateTo("/subscribe")}>Go to Subscribe</button>
          <button onClick={() => navigateTo("/subscriptions")}>
            View Subscriptions
          </button>
          <button onClick={() => navigateTo("/events")}>View Events</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
