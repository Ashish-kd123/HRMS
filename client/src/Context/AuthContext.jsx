import { createContext, useEffect, useState,useContext } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();
export const AuthProvider = ({children})=>{
  const[user, setUser] = useState(()=>{
   const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const decoded = jwtDecode(parsed.token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("user");
        return null;
      }
      return parsed;
    }
    return null;
  });


  useEffect(() => {
   if (user && user.token) {
      const decoded = jwtDecode(user.token);
      const expTime = decoded.exp * 1000;
      const remainingTime = expTime - Date.now();

      const timeout = setTimeout(() => {
        logout();
      }, remainingTime);

      return () => clearTimeout(timeout);
    }
  }, [user]);


   const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

   const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
}
export const useAuth = () => useContext(AuthContext); 




