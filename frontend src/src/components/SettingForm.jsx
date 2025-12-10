import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { currentUser } from "../middleware/currentUser.jsx";

function SettingsForm({ onClose }) {

  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  const [passWindowVisible, setPassWindowVisible] = useState(false)
  const [mainWindowVisible, setmainWindowVisible] = useState(true)
  const [emailWindowVisible, setemailWindowVisible] = useState(false)
  const [confirmDeletion, setConfirmDeletion] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const { accessToken, setAccountForDeletion, 
          getDeletionFlag, deletionDate, getDeletionDate, 
          cancelDeletion, changePw, changeEmail,
          getEmail, accEmail } = useAuth();
  const currentuser = currentUser();

  
  
   
useEffect(() => {
if(accessToken)
   {
   getEmail()
   getDeletionFlag()
   }
}, []);
    
  const deleteaccount = async (e) => {
    e.preventDefault();
    setError("");
      if(currentuser != username)
        {
          setError("wrong username");
        }
      else
    {
        try 
        {
          await setAccountForDeletion(username);
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false); 
          setConfirmDeletion(false);
          setMessage("Account has been set for deletion.");
        }
    }
  };

  const cancelDeletionFrontend = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
        try 
        {
          await cancelDeletion(); //funktio flagaamiselle joskus tähän
        } catch (err) {
          setError() //catchataan virheet
        } finally 
        {
          setMessage("Account deletion cancelled!");
        }
    
  };
 const changepassFrontend = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if(newPassword === newPasswordAgain)
      {
        try 
        {
          await changePw(newPassword);
          setMessage("Password changed succesfully!"); 
        } catch (err) {
          setError(err.message)
        }
      }
    else
      {
        setError("Passwords don't match!")
      }
  };
const changeEmailFrontend = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

         try 
        {
          await changeEmail(newEmail);
          setMessage("Email changed succesfully!"); 
        } catch (err) {
          setError(err.message)
        }
        finally
        {
          getEmail()
        }
  };

if(!confirmDeletion && accessToken && mainWindowVisible){
  return (
    <div className= "loginform">
      <h2>Account settings</h2>  
      <br></br> 
      <div className="settingBtns">
        <button id="singleButton" onClick={() => {
            setConfirmDeletion(true);
            getDeletionDate();
            setMessage("");
            }}>
            Delete account
        </button>
        <button id="singleButton" onClick={() => {
            setMessage("");
            setNewEmail("");
            setemailWindowVisible(true);
            setmainWindowVisible(false);
            }}>
            Change email
        </button>
          <button id="singleButton" onClick={() => {
            setPassWindowVisible(true);
            setmainWindowVisible(false);
            setMessage("");
            setNewPassword("");
            setNewPasswordAgain("");
            }}>
            Change password
        </button>

        <button id="singleButton" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <br></br>
    {message && <div id="fieldText">{message}</div>}
    {error && <div id="fieldText">{error}</div>}

    </div>
  );
}
if(confirmDeletion && accessToken && !deletionDate)
{
   console.log(deletionDate)
  return (
   <div class= "loginform">
      <h2>Account settings</h2>   

      <div className="settingBtns">
      <form className="formContainer" onSubmit={deleteaccount}>
        <div >
          <label id="fieldText">Give your username to confirm:</label>
          <br></br>
          <br></br>
          <input id="field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
          <br></br>
          <button id="singleButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Delete account"}
        </button>
      </form>

        <button id="singleButton" onClick={() => {
            setConfirmDeletion(false)
            setError("")
            setMessage("");
            setmainWindowVisible(true);
            }}>
            Back
        </button>
      </div>
      <br></br>
        {error && <div id="fieldText">{error}</div>}
        {message && <div>{message}</div>}

    </div>
  )
}
if(accessToken && deletionDate && !passWindowVisible)
  {
    return (
    <div class= "loginform">
        <h2>Account settings</h2>   

          <div>
            <label id="fieldText">Your account has already been flagged for deletion.</label>
            <br></br>
            <br></br>
            <label id="fieldText">Deletion date: {deletionDate}</label>
      
          </div>
          <br></br>
          <div className="settingBtns">
          <button id="singleButton" type="button" onClick={cancelDeletionFrontend}>Cancel deletion</button>
              

          <button id="singleButton" onClick={() => {
              setConfirmDeletion(false);
              setMessage("");
              setmainWindowVisible(true);
              }}>
              Back
          </button>
          </div>
          <br></br>
          {error && <div id="fieldText">{error}</div>}
          {message && <div id="fieldText">{message}</div>}

      </div>
    )
  }
if(passWindowVisible && accessToken)
{
  return (
   <div class= "loginform">
      <h2>Account settings</h2>   

      <form className="formContainer" onSubmit={changepassFrontend}>
        <div>
          <label id="fieldText">Give your new password:</label>
          <input id="field"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}/>
        </div>
        <div>
          <label id="fieldText">Give your new password again:</label>
          <input id="field"
            type="password"
            value={newPasswordAgain}
            onChange={(e) => setNewPasswordAgain(e.target.value)}/>
            <br></br>
            <br></br>
        </div>
          <button id="singleButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Change password"}
        </button>
      </form>
      <br></br>
        <button id="singleButton" onClick={() => {
            setPassWindowVisible(false)
            setmainWindowVisible(true);
            setError("");
            setMessage("");
            }}>
            Back
        </button>
            <br></br>
            <br></br>
        {error && <div id="fieldText">{error}</div>}
        {message && <div id="fieldText">{message}</div>}

    </div>
  )
}
if(emailWindowVisible && accessToken)
{
  return (
   <div class= "loginform">
      <h2>Account settings</h2>   

      <form className="formContainer" onSubmit={changeEmailFrontend}>
        <div>
          <label id="fieldText">Give your new email:</label>
          <input id="field"
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}/>
            <br></br>
            <br></br>
        </div>
          <button id="singleButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Change email"}
        </button>
      </form>
      <br></br>
        <button id="singleButton" onClick={() => {
            setemailWindowVisible(false)
            setmainWindowVisible(true);
            setError("");
            setMessage("");
            }}>
            Back
        </button>
            <br></br>
            <br></br>
        {error && <div id="fieldText">{error}</div>}
        {message && <div id="fieldText">{message}</div>}
        <br></br>
        <div id="fieldText">Your current email: <div id="hiddenfield">{accEmail}</div></div>

    </div>
  )
}

}

export default SettingsForm;
