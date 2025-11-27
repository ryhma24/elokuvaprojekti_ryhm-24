import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

import './App.css'
import './css/MovieCard.css'
import './css/carousel.css'
import './css/SearchResult.css'
import './css/SearchResultsList.css'
import './css/SearchBar.css'
import './css/NavBar.css'
import './css/login.css'
import './css/AllMovies.css'
import TitleItems from './pages/TitleItems.jsx'
import NotFound from './pages/NotFound.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllMovies from "./pages/AllMovies.jsx";
import AllSeries from "./pages/AllSeries.jsx";
import Groups from "./pages/Groups.jsx";

const router = createBrowserRouter([
  {path:"/", element: <App/>},
  {path:"/:type/title/:id", element:<TitleItems/>},
  {path:"/allmovies", element: <AllMovies/>},
  {path:"/allseries", element: <AllSeries/>},
  {path:"/groups", element: <Groups/>},
  {path:"*", element:<NotFound/>},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>  
      <RouterProvider router={router}/>    
    </AuthProvider>
  </React.StrictMode>
);