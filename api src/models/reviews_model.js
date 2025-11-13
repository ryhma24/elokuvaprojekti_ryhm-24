import { pool } from "../database.js";


export async function getAllReviews(id) {

  console.log(typeof id);

  const result = await pool.query("SELECT * FROM reviews WHERE idaccount = $1", [id]);
  return result.rows; 
}

export async function getOneReview(id) {

  console.log(typeof id);

  const result = await pool.query("SELECT * FROM reviews WHERE idreviews = $1", [id]);
  return result.rows; 
}

export async function addOneReview(userReview) {
  console.log("lisätään elokuva");
  const result = await pool.query("INSERT INTO reviews (review, rating, idaccount, idmovie, date) VALUES($1,$2,$3,$4,$5)", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie, userReview.date]);
  return result.rows;
}

export async function updateOneReview(id, userReview) {
  console.log("update:"+id);
  const result = await pool.query("UPDATE reviews SET review=$1, rating=$2, idaccount=$3, idmovie=$4, date=$5", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie, userReview.date]);
  return result.rows;
}

export async function deleteReview(id) {
  console.log("delete:"+id);
  const result = await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
  return result.rows;
}
