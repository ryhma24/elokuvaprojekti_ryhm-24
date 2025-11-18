const apiKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getNowInTheathers = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data);
    return data.results; 
}
export const getGenre = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("API Data:", data);
    return data.results;
} 
