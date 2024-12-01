import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Initialize from localStorage if available
    return localStorage.getItem("authToken");
  });

  const login = (token, username) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  };

  // Effect to sync localStorage updates if needed
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ login, authToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
