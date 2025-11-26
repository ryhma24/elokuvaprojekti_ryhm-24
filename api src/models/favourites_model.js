import { pool } from "../database.js";

export async function getAllFavourites(id) {
    const result =await pool.query("SELECT * FROM favourites WHERE idaccount = $1", [id])
    return result.rows;
}

export async function addFavourite(favourite) {
    const result = await pool.query("INSERT INTO favourites (favourites, idaccount) VALUES ($1, $2)", [favourite.favourites, favourite.idaccount])
    return result.rows;
}

export async function deleteFavourite(id) {
    const result =await pool.query("DELETE * FROM favourites WHERE idfavourites = $1", [id])
    return result.rows;

}