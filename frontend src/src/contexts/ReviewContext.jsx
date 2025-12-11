import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { accessToken, idaccount } = useAuth();
  const [reviewState, setReviewState] = useState([]);

  useEffect(() => {
    async function fetchReview() {
      if (!accessToken || !idaccount) return;

      try {
        const res = await fetch(`http://localhost:3001/reviews/${idaccount}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        const data = await res.json();
        setReviewState(data);

      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviewState([]);
      }
    }

    fetchReview();
  }, [accessToken, idaccount]);

  return (
    <ReviewContext.Provider value={{ reviewState, setReviewState }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);