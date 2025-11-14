
function NavBar() {
    return (

        <nav className="navbar">

            <div className="navbar-links">
                <a className="nav-link">Home</a>
                <a className="nav-link">Movies</a>
                <a className="nav-link">TV-Series</a>
                <a className="nav-link">Groups</a>
            </div>
            <div className="navbar-actions">
                <form className="search-form">
                    <input type="text" placeholder="Search..." />
                </form>
                <button>Login</button>
            </div>
        </nav>


    )
}

export default NavBar;
