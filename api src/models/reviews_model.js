import { pool } from "../database.js";


export async function getAllReviews(id) {

  console.log(typeof id);

  const result = await pool.query("SELECT reviews FROM reviews WHERE idaccount = $1", [id]);
  return result.rows; 
}

export async function addOneReview(userReview) {
  const result = await pool.query("INSERT INTO reviews (review,rating,idaccount,idmovie) VALUES($1,$2,$3,$4)", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie]);
  return result.rows;
}

export async function updateOneReview(id, userReview) {
  console.log("update:"+id);
  const result = await pool.query("UPDATE reviews SET review=$1, rating=$2, idaccount=$3, idmovie=$4", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie]);
  return result.rows;
}

export async function deleteReview(id) {
  console.log("delete:"+id);
  const result = await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
  return result.rows;
}
