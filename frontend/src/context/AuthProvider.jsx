import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { getToken, setToken, removeToken, getUser, setUser } from '../utils/auth';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const savedUser = getUser();
    
    if (token && savedUser) {
      setUserState(savedUser);
      // Verify token is still valid
      authAPI.getProfile()
        .then(response => {
          setUserState(response.data.user);
          setUser(response.data.user);
        })
        .catch(() => {
          removeToken();
          setUserState(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    const { user: userData, token } = response.data;
    
    setToken(token);
    setUser(userData);
    setUserState(userData);
    
    return response.data;
  };

  const signup = async (userData) => {
    const response = await authAPI.signup(userData);
    const { user: newUser, token } = response.data;
    
    setToken(token);
    setUser(newUser);
    setUserState(newUser);
    
    return response.data;
  };

  const logout = () => {
    removeToken();
    setUserState(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
