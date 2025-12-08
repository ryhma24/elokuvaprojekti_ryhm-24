import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const TitleItems = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

 
  useEffect(() => {
    const getTitleInfo = async () => {
      const apiKey1 = import.meta.env.VITE_API_KEY;
      console.log("API KEY:ss", import.meta.env.VITE_API_KEY);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${apiKey1}`)

        console.log(response);

        const json = await response.json();
        setData(json)

      } catch (error) {
        console.error('Error fetching movie data:', error)
        }
    }
    getTitleInfo();
  }, [type, id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
        <NavBar/>
      <h1>{data.title || data.name}</h1>
      <p>Description: {data.overview}</p>
      <p>Release date: {data.release_date || data.first_air_date}</p>
      <p>Rating: {data.vote_average}</p>
      {data.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title || data.name}
        />
      )}
    </div>
  );
};

export default TitleItems;