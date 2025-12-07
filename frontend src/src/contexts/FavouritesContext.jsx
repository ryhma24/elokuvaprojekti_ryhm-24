import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { accessToken, idaccount } = useAuth();
  const [favouriteState, setFavouriteState] = useState([]);

  useEffect(() => {
    async function fetchFavourites() {
      if (!accessToken) return;

      const res = await fetch(`http://localhost:3001/favourites/${idaccount}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      const data = await res.json();
      setFavouriteState(data.map(f => f.movieid));
    }

    fetchFavourites();
  }, [accessToken, idaccount]);

  return (
    <FavouritesContext.Provider value={{ favouriteState, setFavouriteState }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);