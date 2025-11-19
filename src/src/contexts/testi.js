import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [error, setError] = useState("");
  const { user, logout, accessToken } = useAuth();

  const fetchBooks = async () => {
    if (!user || !accessToken) {
      setError("Sinun on kirjauduttava nähdäksesi kirjat");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/book`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Authentikointi vaaditaan");
        }
        throw new Error("Kirjojen haku epäonnistui");
      }

      const data = await res.json();
      setBooks(data);
      setShowBooks(true);
    } catch (err) {
      console.error("Kirjojen näyttäminen epäonnistui:", err);
      setError(err.message);
      setBooks([]);
      setShowBooks(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setBooks([]);
    setShowBooks(false);
    setError("");
  };

  return (
    <div>
      <div>
        <h1>Book Application</h1>
        <div>
          {user && `Logged in as: ${user.username}`}
        </div>
      </div>

      <div>
        {!user ? (
          <button
            onClick={() => setShowLogin(true)}

          >
            Login
          </button>
        ) : (
          <>
            <button
              onClick={fetchBooks}
              disabled={loading}
            >
              {loading ? "Loading..." : "Kirjat"}
            </button>
            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {error && (
        <div>
          {error}
        </div>
      )}

      {showBooks && books.length === 0 && !loading && (
        <p>Ei kirjoja löytynyt.</p>
      )}

      {showBooks && books.length > 0 && (
        <table border="1" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;