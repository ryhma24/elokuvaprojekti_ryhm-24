import { useState } from "react";
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResultslist';
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/registerForm'
import { LoggedInButton } from '../components/login-logoutButton'
import { useAuth } from "../contexts/AuthContext.jsx";

function NavBar() {

    const { accessToken } = useAuth();
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false) //true/false määrittelee näkyykö login komponentti.
    //pitää laittaa myöhemmin falseksi, jotta se ei sivun alkaessa näy

    function welcomeUser()
    {
        let currentUser = "Guest";
        if(accessToken)
        {
            const currentUserWithQuotes = JSON.stringify(user.username);
            const currentUserWithoutQuotes = currentUserWithQuotes.split('"').join('');
            return currentUserWithoutQuotes;
        }
        return currentUser
    }

    return (

        <div className="masterwrapper">
        <nav className="navbar">

            <div className="navbar-links">
                <a className="nav-link" href="/">Home</a>
                <a className="nav-link" href="/allmovies" >Movies</a>
                <a className="nav-link" href="/allseries">Series</a>
                <a className="nav-link" href="/groups">Groups</a>
            </div>
            <div className="search-bar-container">
                <SearchBar setResults={setResults}/>
                <SearchResults results={results}/>  
            </div>
             <div className="welcome-user">
              <p id="welcome-user-text">Welcome, {welcomeUser()}!</p>
            </div>
            <LoggedInButton changeBoolLog = {setShowLogin} changeBoolReg = {setShowRegister} />
        </nav>
        <nav className="navbar-small-devices">
            <div className="dropdown">
                <button className="dropbtn">Dropdown </button>
                
                <div className="dropdown-content">
                    <a className="nav-link" href="/">Home</a>
                    <a className="nav-link" href="/allmovies" >Movies</a>
                    <a className="nav-link" href="/allseries">Series</a>
                    <a className="nav-link" href="/groups">Groups</a>
                </div>
            </div>
        </nav>
            {showLogin && <LoginForm onClose={() => setShowLogin(false)} />} 
            {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
        </div>
        


    )
}

export default NavBar;