import { createContext, useContext, useState } from "react";
const REACT_APP_API_URL = "http://localhost:3001"

const RegisterContext = createContext(null);

export function RegisterProvider({ children }) {
  //const [user, setUser] = useState(null);
  //const [loading, setLoading] = useState(true);

  const register = async (username, password, email) => {
    const res = await fetch(`${REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "register failed");
    }

    const data = await res.json();
    //setUser({ username: data.username });
    return data;
  };

  const value = 
  {
    register
  };
  return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
  
}

export function useRegister() {
  return useContext(RegisterContext);
}
  