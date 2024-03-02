import React, { createContext, useState, useContext } from 'react';
import Config from 'react-native-config';

const API_URL = Config.API_URL;
// const API_URL = 'https://app.bille.live';
// Create a context with an empty object as the default value
const AuthContext = createContext({});

const handleSignUp = async (data) => {

  // Make the API call
  try {
    const response = await fetch(`${API_URL}/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status != 200) return false;
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
};

const handleLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status !== 201) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handleAuth = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api-token-auth/`, { // Add this line to fetch the token from the API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = async (email, password) => {
    if (await handleLogin(email, password)) {
      const token = await handleAuth(email, password);
      if (token) {
        setAuthToken(token);
        return true;
      }
    }
    return false;
  };

  const signup = async (data) => {
    if (await handleSignUp(data)) {
      return await login(data.email, data.password);
    }
  };

  const logout = () => {
    setAuthToken(null); // Clear the token on logout
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
