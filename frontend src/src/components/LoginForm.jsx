import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginForm({ onClose, changeBoolLog, changeBoolReg, changeBoolSet }) {
  const [username, setUsername] = useState(""); //alustetaaan username ja password "" eli tyhjiksi
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //muutetaan login napin teksti ''loading''
  const { login, accessToken } = useAuth(); //importataan accesstoken testiä varten, siirrä tää myöhemmin app.js autentikointia varten

  
const handleConfirm = () => {
  changeBoolLog(false); //suljetaan login ikkuna, jos auki
  changeBoolReg(true);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      onClose(); //täällä suljetaan login komponentti automaattisesti

    } catch (err) {
      setError(err.message); //catchataan virheet
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className= "loginform">
      <h1 id="login">Login</h1>
      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="formDiv">
          <label id="fieldText">Username:</label>
          <input id="field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      
        <div>
          <label id="fieldText">Password:</label>
          <input id="field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div className="loginBtns">

          <button id="singleButton" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>

          <button id="singleButton" type="button" onClick={onClose}>
            Close
          </button>

        </div>
        <br></br>
        <div id="no-user" onClick={() => handleConfirm()}>Don't have an account? 
        <label id="signup"> Sign up!</label>
        </div>
        <br></br>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LoginForm;