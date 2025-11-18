import { pool } from "../database";

export async function getAllFavourites(id) {
    const result =await pool.query("SELECT * FROM favourites WHERE idfavourites = $1", [id])
    return result.rows;
}

export async function addFavourite(movieID, id) {
    const result = await pool.query("INSERT INTO favourites (movieID, idaccount) VALUES ($1, $2)", [movieID, id])
    return result.rows;
}

export async function deleteFavourite(id) {
    const result =await pool.query("DELETE * FROM favourites WHERE idfavourites = $1", [id])
    return result.rows;

}