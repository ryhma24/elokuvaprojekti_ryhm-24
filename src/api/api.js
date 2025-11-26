const apiKey = import.meta.env.VITE_API_KEY2;
const BASE_URL = "https://api.themoviedb.org/3";

export const getNowInTheathers = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Now in theathers API: ",data);
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
    console.log("Genres for movies API: ", data);
    return data.results;
} 
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1'`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Popular movies API: ", data);
    return data.results;
}
export const getPopularSeries = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?language=en-US&page=1'`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Popular series API: ", data);
    return data.results;
} 
