import { useState, useEffect, useContext, createContext } from "react";
import API, { registerUnauthorizedHandler } from "./AxiosConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  // Seed from cache so returning users never see a spinner
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem("eazy_resume_user");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Only block protected routes when there is no cached user at all
  const [loading, setLoading] = useState(
    () => !localStorage.getItem("eazy_resume_user")
  );

  const saveUser = (u) => {
    setUser(u);
    if (u) {
      localStorage.setItem("eazy_resume_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("eazy_resume_user");
    }
  };

  const verifyToken = async () => {
    try {
      const response = await API.get("/user/verification");
      if (response.data.success) {
        saveUser(response.data.user);
      }
    } catch {
      saveUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    saveUser(null);
    setLoading(false);
  };

  useEffect(() => {
    registerUnauthorizedHandler(handleUnauthorized);
    verifyToken();
  }, []);

  const value = { isAuth: !!user, user, loading, refreshAuth: verifyToken };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
