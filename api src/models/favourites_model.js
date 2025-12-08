import { pool } from "../database.js";

export async function getAllFavourites(id) {
    const result =await pool.query("SELECT * FROM favourites WHERE idaccount = $1", [id])
    return result.rows;
}

export async function addFavourite(favourite) {
    const result = await pool.query("INSERT INTO favourites (movieid, idaccount, ismovie) VALUES ($1, $2, $3)", [favourite.movieId, favourite.idaccount, favourite.ismovie ])
    return result.rows;
}

export async function deleteFavourite(favourite) {
    const result = await pool.query("DELETE FROM favourites WHERE movieid = $1 AND idaccount = $2 RETURNING *", [favourite.movieId, favourite.idaccount])
    return result.rows;

}