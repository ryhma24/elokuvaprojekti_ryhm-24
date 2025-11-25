import { useState } from "react";

function RegisterForm({ onClose }) {
  const [username, setUsername] = useState(""); //alustetaaan username ,password ja email "" eli tyhjiksi
  const [password, setPassword] = useState("");
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

    try {
      await register(username, password, email);
      setMessage("Rekisteröinti onnistui! Voit sulkea ikkunan.")
    } catch (err) {
      setError(err.message); //catchataan virheet
    } finally {
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
    <div>
      <h2>Luo käyttäjätili</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Käyttäjänimi:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            //required
          />
        </div>

        <div>
          <label>Salasana:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //required
          />
        </div>

        <div>
          <label>email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Ladataan..." : "Rekisteröidy"}
        </button>

        <button type="button" onClick={onClose}>
          Sulje
        </button>

        {message && <div>{message}</div>} 
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;