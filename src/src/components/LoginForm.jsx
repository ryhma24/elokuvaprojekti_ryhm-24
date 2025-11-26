import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginForm({ onClose }) {
  const [username, setUsername] = useState(""); //alustetaaan username ja password "" eli tyhjiksi
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //muutetaan login napin teksti ''loading''
  const { login, accessToken } = useAuth(); //importataan accesstoken testiä varten, siirrä tää myöhemmin app.js autentikointia varten

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      //console.log("tässä on accesstoken: "+accessToken);
      onClose(); //täällä suljetaan login komponentti automaattisesti

    } catch (err) {
      setError(err.message); //catchataan virheet
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div class= "loginform">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <button type="button" onClick={onClose}>
          Close
        </button>

        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;