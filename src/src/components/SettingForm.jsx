import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { currentUser } from "../middleware/currentUser.jsx";

function SettingsForm({ onClose }) {

  const [username, setUsername] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const { accessToken } = useAuth(); //importataan accesstoken testiä varten, siirrä tää myöhemmin app.js autentikointia varten
  const currentuser = currentUser();

  const deleteaccount = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
      if(currentuser != username)
        {
          setError("wrong username");
        }
      else
    {
        try 
        {
          //await ---(username, password); //funktio flagaamiselle joskus tähän
          setMessage("Account will be deleted after 14 days");

        } catch (err) {
          setError() //catchataan virheet
        } finally {
          setLoading(false); 
        }
    }
  };

if(!confirmDeletion && accessToken){
  return (
    <div class= "loginform">
      <h2>Account settings</h2>   

        <button onClick={() => {
            setConfirmDeletion(true)
            }}>
            Delete account
        </button>

        <button type="button" onClick={onClose}>
          Close
        </button>

        {error && <div>{error}</div>}

    </div>
  );
}
if(confirmDeletion && accessToken)
{
  return (
   <div class= "loginform">
      <h2>Account settings</h2>   

      <form onSubmit={deleteaccount}>
        <div>
          <label>Give your username to confirm:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>

          <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Delete account"}
        </button>
      </form>

        <button onClick={() => {
            setConfirmDeletion(false)
            }}>
            Cancel deletion
        </button>

        {error && <div>{error}</div>}
        {message && <div>{message}</div>}

    </div>
  )
}
}


export default SettingsForm;
