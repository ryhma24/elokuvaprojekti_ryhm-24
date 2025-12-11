import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { GroupsProvider } from "./contexts/GroupsContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { ReviewProvider } from "./contexts/ReviewContext";

import './App.css'
import './css/MovieCard.css'
import './css/carousel.css'
import './css/SearchResult.css'
import './css/SearchResultsList.css'
import './css/SearchBar.css'
import './css/NavBar.css'
import './css/login.css'
import './css/AllMovies.css'
import './css/Favourites.css'
import './css/Rating.css'
import './css/Profile.css'
import './css/TitleItems.css'
import TitleItems from './pages/TitleItems.jsx'
import NotFound from './pages/NotFound.jsx'
import AllMovies from "./pages/AllMovies.jsx";
import AllSeries from "./pages/AllSeries.jsx";
import GroupPage from "./pages/GroupPage.jsx";
import Profile from "./pages/Profile.jsx";
import FavouriteShare from "./pages/FavouriteShare.jsx";
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/", element: <App/>},
  {path:"/:type/title/:id", element:<TitleItems/>},
  {path:"/tv", element: <AllSeries/>},
  {path:"/movie", element: <AllMovies/>},
  {path:"/groups", element: <GroupPage/>},
  {path:"/profile", element:<Profile/>},
  {path:"/favourites/:id",element:<FavouriteShare/>},
  {path:"*", element:<NotFound/>}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GroupsProvider>
        <FavouritesProvider>
          <ReviewProvider>
            <RouterProvider router={router}/> 
          </ReviewProvider> 
        </FavouritesProvider>
      </GroupsProvider>    
    </AuthProvider>
  </React.StrictMode>
);