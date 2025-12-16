import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { accessToken, idaccount } = useAuth();
  const [reviewState, setReviewState] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);  

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

        if (Array.isArray(data)) {
          setReviewState(data);
        } else if (Array.isArray(data.reviews)) {
          setReviewState(data.reviews);
        } else {
          setReviewState([]);
        }

      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviewState([]);
      }
    }

    fetchReview();
  }, [accessToken, idaccount]);

  async function fetchReviewsByMovieId(movieId) {
    try {
      const res = await fetch(`http://localhost:3001/reviews/review/movieid/${movieId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
      const data = await res.json();
      console.log("allmoviedata", data)
      if (Array.isArray(data)) {
        setMovieReviews(data);
      } else if (Array.isArray(data.reviews)) {
        setMovieReviews(data.reviews);
      } else {
        setMovieReviews([]);
      }

    } catch (err) {
      console.error("Error fetching reviews:", err);
      setMovieReviews([]);
    }
  }

  return (
    <ReviewContext.Provider value={{ reviewState, setReviewState, movieReviews, setMovieReviews, fetchReviewsByMovieId }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);