import { createContext, useContext, useState, useEffect } from "react";
const REACT_APP_API_URL = "http://localhost:3001"

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tarkista sessio sivun latautuessa
  useEffect(() => {
    refreshToken();
  }, []);

  const login = async (username, password) => {
    const res = await fetch(`${REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Lähetä ja vastaanota cookies
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await res.json();
    setUser({ username: data.username });
    setAccessToken(data.accessToken);
    return data;
  };

  const logout = async () => {
    console.log("const logoutissa")
    await fetch(`${REACT_APP_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setAccessToken(null);
  };

  const setAccountForDeletion = async (user) => {
    await fetch(`${REACT_APP_API_URL}/setDeletionFlag`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ user }),
    });
  };

  const cancelDeletion = async (user) => {
    await fetch(`${REACT_APP_API_URL}/cancelDeletionFlag`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ user }),
    });
  };

  const refreshToken = async () => {
    try {
      const res = await fetch(`${REACT_APP_API_URL}/refresh`, {
        method: "POST",
        credentials: "include", // Lähetä cookie
      });

      if (res.ok) {
        const data = await res.json();
        setAccessToken(data.accessToken);

        // Dekoodaa username tokenista
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        setUser({ username: payload.username });
      }
    } catch (error) {
      console.log(error)
      console.error("Token refresh failed:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    accessToken,
    login,
    logout,
    refreshToken,
    loading,
    setAccountForDeletion,
    cancelDeletion
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}