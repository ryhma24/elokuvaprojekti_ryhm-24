import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";
import "./css/MovieCard.css";
import "./css/carousel.css";
import "./css/SearchResult.css";
import "./css/SearchResultslist.css";
import "./css/SearchBar.css";
import "./css/NavBar.css";
import "./css/login.css";

import TitleItems from "./pages/TitleItems.jsx";
import NotFound from "./pages/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GroupPage from "./pages/GroupPage.jsx";
import { GroupsProvider } from "./contexts/GroupsContext.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GroupsProvider>
          <App />
        </GroupsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
