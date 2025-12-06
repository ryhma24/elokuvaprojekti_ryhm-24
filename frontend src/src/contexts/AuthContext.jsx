import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [deletionFlag, setDeletionFlag] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletionDate, setDeletionDate] = useState(null);
  const [idaccount, setIdaccount ] = useState(null);

  // Tarkista sessio sivun latautuessa
  useEffect(() => {
    refreshToken();
  }, []);
  
  
  const getDeletionDate = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/getdeletiondate/${user.username}`, {
      credentials: "include", // Lähetä ja vastaanota cookies
      headers: {
          "Authorization": `Bearer ${accessToken}`, 
        },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "cant get deletion date");
    }

    const dateOfDeletion = await res.json();
    console.log("deletion date on: "+JSON.stringify(dateOfDeletion[0].deletion_date))
    
    setDeletionDate(dateOfDeletion[0].deletion_date);
  }

  const getDeletionFlag = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/getflagged/${user.username}`, {
      credentials: "include", // Lähetä ja vastaanota cookies
      headers: {
          "Authorization": `Bearer ${accessToken}`
        },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "cant get deletion date");
    }
    
    const flag = await res.json();
    setDeletionFlag({deletionFlag: flag[0].deletion_flag})

  }


  const login = async (username, password) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/login`, {
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
    setIdaccount({idaccount: data.idaccount});
    setUser({ username: data.username });
    setAccessToken(data.accessToken);
    return data;
  };

  const logout = async () => {
    console.log("const logoutissa")
    await fetch(`${import.meta.env.VITE_APP_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setAccessToken(null);
  };

  const changePw = async (password) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/changePassword`, {
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" 
        },
      credentials: "include",
      body: JSON.stringify({ username: user.username, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "pw change failed");
    }

    const data = await res.json();
    console.log(data)
    return data;
  };

  const changeEmail = async (email) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/changeEmail`, {
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" 
        },
      credentials: "include",
      body: JSON.stringify({ username: user.username, email }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "email change failed");
    }

    const data = await res.json();
    console.log(data)
    return data;
  };

  const setAccountForDeletion = async (username) => {

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/setDeletionFlag`, {
      method: "PUT",
      body: JSON.stringify({ username }),
      credentials: "include",
      headers: {
          "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" 
        },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "flagging for delete failed");
    }

    const data = await res.json();
    console.log("const data on "+JSON.stringify(data))
    setDeletionDate(data.deletion_date);
  };

  const cancelDeletion = async () => {
    console.log("working?")
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/cancelDeletionFlag`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({username: user.username}),
      headers: {
          "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" 
        },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "delete cancel failure");
    }
    const data = await res.json();
    console.log("const data on "+JSON.stringify(data))
  };

  const refreshToken = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/refresh`, {
        method: "POST",
        credentials: "include", // Lähetä cookie
      });

      if (res.ok) {
        const data = await res.json();
        setAccessToken(data.accessToken);
        setIdaccount(data.idaccount);
        //console.log(data)
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
    changePw,
    user,
    accessToken,
    login,
    logout,
    refreshToken,
    loading,
    setAccountForDeletion,
    deletionFlag,
    getDeletionDate,
    getDeletionFlag,
    cancelDeletion,
    deletionDate,
    idaccount,
    changeEmail
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}