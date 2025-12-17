import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { accessToken, idaccount } = useAuth();
  const [favouriteState, setFavouriteState] = useState([]);

  useEffect(() => {
    async function fetchFavourites() {
      if (!accessToken || !idaccount) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/favourites/${idaccount}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        const data = await res.json();
        setFavouriteState(data.map(f => f.movieid));

      } catch (err) {
        console.error("Error fetching favourites:", err);
        setFavouriteState([]);
      }
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