import { useState } from "react";

function RegisterForm({ onBack }) {
  const [username, setUsername] = useState(""); //alustetaaan username ,password ja email "" eli tyhjiksi
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); //viesti kertomaan käyttäjälle, onnistuiko rekisteröinti. alustetaan tyhjäksi.
  const [loading, setLoading] = useState(false); //muutetaan login napin teksti ''loading''
  const REACT_APP_API_URL = "http://localhost:3001"
  //const { register } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault(); //alussa resetoidaan viestit ja estetään default.
    setError("");
    setMessage("");
    setLoading(true);

    if(password === passwordAgain)
  {
    try {
      const res = await register(username, password, email);
      setMessage(res.message)
    } catch (err) {
      setError(err.message); //catchataan virheet
    } finally {
      setLoading(false); 
    }
  }
    else
    {
      setError("passwords don't match!");
      setLoading(false); 
    }
  };

  const register = async (username, password, email) => {
    const res = await fetch(`${REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Rekisteröinti epäonnistui");
    }

    const data = await res.json();
    return data;
  };

  return (
    <div class="registerform">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="fieldText">Username:</label>
          <input id="field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            //required
          />
        </div>

        <div>
          <label id="fieldText">Password:</label>
          <input id="field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //required
          />
        </div>

        <div>
          <label id="fieldText">Password again:</label>
          <input id="field"
            type="password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            //required
          />
        </div>

        <div>
          <label id="fieldText">email:</label>
          <br></br>
          <input id="field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //required
          />
        </div>

         <br></br>

        <div className="loginBtns">
        <button id="singleButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>

        <button id="singleButton" type="button" onClick={onBack}>
          Back
        </button>
        </div>

         <br></br>

        {message && <div id="fieldText">{message}</div>} 
        {error && <div id="fieldText">{error}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;