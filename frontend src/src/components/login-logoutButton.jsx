//import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoggedInButton({changeBoolLog, changeBoolReg, changeBoolSet}) { //otetaan propsina vastaan changeBool funktio, muutetaan sen arvo trueksi.

const { logout, accessToken } = useAuth(); //importataan accestoken
const { user } = useAuth(); //importataan username
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [confirm, setConfirm] =useState(false); //confirm liittyy uloskirjautumisen varmistukseen, jos true niin sit renderöidään varsinainen logout ikkuna
const navigate = useNavigate();

const handlelogin = () => {
  changeBoolLog(true); //suljetaan rekisteröinti ikkuna, jos auki
  changeBoolReg(false);
}
const handleConfirm = () => {
  changeBoolLog(false); //suljetaan login ikkuna, jos auki
  changeBoolReg(true);
}
const handleSettings = () => {
  if(accessToken)
  {
    changeBoolSet(true);
  }

}
const handleLogout = async (e) => {
    try 
    {
      await logout(user);
      setLoading(true);
      console.log("kirjaudutaan ulos");
    } catch (err) 
    {
      setError(err.message); //catchataan virheet
    } finally
    {
      setLoading(false); //resetoidaan boolean muuttujat
      setConfirm(false);
      changeBoolSet(false);
      navigate("/");
    }
  };

if(!accessToken)
{
return (
    <div className="loginBtns">
        <button onClick={() => {
            handlelogin()
            }}>
            Login
        </button>
    </div>
  );
}
if(accessToken && !confirm){
return (
    <div className="loginBtns">
        <button onClick={() => {
            setConfirm(true) //asetetaan confirm trueksi
            }}>
            Logout
        </button>
        <button onClick={() => {
            handleSettings() //asetetaan confirm trueksi
            }}>
            Account settings
        </button>
    </div>
  );
}
if(confirm)
return (
    <div className="loginBtns">
        <button onClick={() => {
            handleLogout(user)
            }}>
            Logout
        </button>
        <button onClick={() => {
            setConfirm(false);
            }}>
            Cancel
        </button>
        <div id="logout-confirm">confim logout?</div>
    </div>
  );  
}


