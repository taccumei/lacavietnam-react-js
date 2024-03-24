import { useState, createContext, useContext } from "react";
import * as userService from '../services/userService.js';
import { toast } from 'react-toastify';

const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success('Login Successful');
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setUser('null');
    toast.success('Log out successfully!')
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

