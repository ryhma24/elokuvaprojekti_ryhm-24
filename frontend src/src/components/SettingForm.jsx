import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { currentUser } from "../middleware/currentUser.jsx";

function SettingsForm({ onClose }) {

  const [username, setUsername] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const { accessToken, setAccountForDeletion, getDeletionFlag, deletionDate, getDeletionDate } = useAuth();
  const currentuser = currentUser();

  
  
   
useEffect(() => {
if(accessToken)
   {
   getDeletionFlag()
   }
}, []);
    
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
          await setAccountForDeletion(username); //funktio flagaamiselle joskus tähän
        } catch (err) {
          setError() //catchataan virheet
        } finally {
          
          setLoading(false); 
          setMessage("Account will be deleted in "+deletionDate);
          setConfirmDeletion(false);
        }
    }
  };

  const cancelDeletion = async (e) => {
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
          //await setAccountForDeletion(username); //funktio flagaamiselle joskus tähän
        } catch (err) {
          setError() //catchataan virheet
        } finally {
          
          setLoading(false); 
          setMessage("Account will be deleted in "+deletionDate);
        }
    }
  };

if(!confirmDeletion && accessToken){
  return (
    <div class= "loginform">
      <h2>Account settings</h2>   

        <button onClick={() => {
            setConfirmDeletion(true)
            getDeletionDate()
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
if(confirmDeletion && accessToken && !deletionDate)
{
   console.log(deletionDate)
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
            setError("")
            }}>
            Back
        </button>

        {error && <div>{error}</div>}
        {message && <div>{message}</div>}

    </div>
  )
}
if(accessToken && deletionDate)
{
  return (
   <div class= "loginform">
      <h2>Account settings</h2>   

      <form onSubmit={cancelDeletion}>
        <div>
          <label>Your account has already been flagged for deletion.</label>
          <br></br>
          <label>Deletion date: {deletionDate}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>

          <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "cancel deletion"}
        </button>
      </form>

        <button onClick={() => {
            setConfirmDeletion(false);
            }}>
            close
        </button>

        {error && <div>{error}</div>}
        {message && <div>{message}</div>}

    </div>
  )
}
}


export default SettingsForm;
