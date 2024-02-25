import React, { createContext, useState, useContext } from 'react';

// Create a context with an empty object as the default value
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    setAuthToken(token); // Imagine this is called after a successful login
  };

  const logout = () => {
    setAuthToken(null); // Clear the token on logout
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
