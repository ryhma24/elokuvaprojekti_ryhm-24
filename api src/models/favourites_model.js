import { pool } from "../database.js";

export async function getAllFavourites(id) {
    const result =await pool.query("SELECT * FROM favourites WHERE idaccount = $1", [id])
    return result.rows;
}

export async function addFavourite(favourite) {
    const result = await pool.query("INSERT INTO favourites (favourites, idaccount) VALUES ($1, $2)", [favourite.favourites, favourite.idaccount])
    return result.rows;
}

export async function deleteFavourite(favourite) {
    const result = await pool.query("DELETE FROM favourites WHERE favourites = $1 AND idaccount = $2 RETURNING *", [favourite.favourites, favourite.idaccount])
    return result.rows;

}