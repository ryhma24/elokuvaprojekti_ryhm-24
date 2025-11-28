import { useState } from "react";
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResultslist';
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/registerForm'
import { LoggedInButton } from '../components/login-logoutButton'
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from 'react-router-dom'; // <--- ADD THIS LINE (or similar)


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

        <div class="masterwrapper">
        <nav className="navbar">

            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <a className="nav-link">Movies</a>
                <a className="nav-link">Series</a>
                <Link to="/groups" className="nav-link">Groups</Link>
                
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
            {showLogin && <LoginForm onClose={() => setShowLogin(false)} />} 
            {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
        </div>
        


    )
}

export default NavBar;