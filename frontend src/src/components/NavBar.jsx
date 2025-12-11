import { useState } from "react";
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResultslist';
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/registerForm'
import SettingsForm from "./SettingForm.jsx";
import { LoggedInButton } from '../components/login-logoutButton'
import { currentUser } from "../middleware/currentUser.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

function NavBar() {
    
    const { accessToken, idaccount } = useAuth()
    const [results, setResults] = useState([]);
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showSettings, setShowSettings] = useState(false) //true/false määrittelee näkyykö login komponentti.
    //pitää laittaa myöhemmin falseksi, jotta se ei sivun alkaessa näy

    return (

        <div className="masterwrapper">
            <nav className="navbar">

                <div className="navbar-links">
                    <a className="nav-link" href="/">Home</a>
                    <a className="nav-link" href="/movie" >Movies</a>
                    <a className="nav-link" href="/tv">Series</a>
                    <a className="nav-link" href="/groups" >Groups</a>
                    {accessToken && (<a className="nav-link" href="/profile" >Profile</a>)}
                </div>
                <div className="search-bar-container">
                    <SearchBar setResults={setResults} />
                    <SearchResults results={results} />
                </div>
                <div className="welcome-user">
                    <p id="welcome-user-text">Welcome, {currentUser()}!</p>
                </div>
                <LoggedInButton
                    changeBoolLog={setShowLogin}
                    changeBoolReg={setShowRegister}
                    changeBoolSet={setShowSettings} />
            </nav>
            {showLogin && <LoginForm onClose={() => setShowLogin(false)}
                changeBoolLog={setShowLogin}
                changeBoolReg={setShowRegister}
                changeBoolSet={setShowSettings} />}

            <nav className="navbar-small-devices">
                <div className="dropdown">
                    <button className="dropbtn">Dropdown </button>

                    <div className="dropdown-content">
                        <a className="nav-link" href="/">Home</a>
                        <a className="nav-link" href="/movie" >Movies</a>
                        <a className="nav-link" href="/tv">Series</a>
                        <a className="nav-link" href="/groups">Groups</a>
                        {accessToken && (<a className="nav-link" href="/profile" >Profile</a>)}
                    </div>
                </div>
                <div className="search-bar-container">
                    <SearchBar setResults={setResults} />
                    <SearchResults results={results} />
                </div>
                
                <LoggedInButton
                    changeBoolLog={setShowLogin}
                    changeBoolReg={setShowRegister}
                    changeBoolSet={setShowSettings} />
            </nav>

            {showRegister && <RegisterForm onBack={
                () =>
                    [
                        setShowRegister(false),
                        setShowLogin(true)
                    ]
            } />}
            {showSettings && <SettingsForm onClose={() => setShowSettings(false)} />}
        </div>



    )
}

export default NavBar;