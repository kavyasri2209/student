import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const LS_KEY = "edutrack_auth_user";

/** currentUser shape:
 * { name: string, role: 'admin'|'coordinator'|'teacher' }
 */

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setCurrentUser(JSON.parse(raw));
  }, []);

  const login = (name, role) => {
    const user = { name, role };
    setCurrentUser(user);
    localStorage.setItem(LS_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
