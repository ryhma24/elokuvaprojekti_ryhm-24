import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/registerForm";
import { LoggedInButton } from "./components/login-logoutButton";

import NavBar from "./components/NavBar";
import MovieCard from "./components/MovieCard";
import { getNowInTheathers } from "./api/api";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import GroupPage from "./pages/GroupPage";
import TitleItems from "./pages/TitleItems";
import NotFound from "./pages/NotFound";

//const [showLogin, setShowLogin] = useState(false)
//const [showRegister, setShowRegister] = useState(false) //true/false määrittelee näkyykö login komponentti.
//pitää laittaa myöhemmin falseksi, jotta se ei sivun alkaessa näy

function App() {
  return (
    <>
      <div>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<GroupPage />} />
            <Route path="/:type/title/:id" element={<TitleItems />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

