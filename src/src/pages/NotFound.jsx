import { Link } from "react-router-dom"
import NavBar from "../components/NavBar";

const NotFound = () => {
    return (
        <div>
            <NavBar/>
            <h1>Page Not Found</h1>
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </div>
    )
}

export default NotFound;