
const BASE_URL = "https://api.themoviedb.org/3";

export const getNowInTheathers = async () => {
    
    const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY2}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Now in theathers API: ",data);
    return data.results; 
}
export const getGenre = async () => {
    //console.log("API KEYgende:", import.meta.env.VITE_API_KEY2);
    const response = await fetch(`${BASE_URL}/genre/movie/list?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY2}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Genres for movies API: ", data);
    return data.results;
} 
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY2}`,
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
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY2}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Popular series API: ", data);
    return data.results;
}

let pageNumber = "3";
export const getDiscoverMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc'`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY2}`,
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log("Discover movies API: ", data);
    return data.results;
} 
