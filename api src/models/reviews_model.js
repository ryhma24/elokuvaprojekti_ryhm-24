import { pool } from "../database.js";


export async function getAllReviewsFromUser(id) {
  //tässä haetaan jonkun käyttäjän kaikki reviewit.
  const result = await pool.query("SELECT * FROM reviews WHERE idaccount = $1", [id]);
  return result.rows; 
}

export async function getReviewByMovieId(id) {
  //haetaan jonkun tietyn elokuvan kaikki reviewit
  const result = await pool.query("SELECT * FROM reviews WHERE idmovie = $1", [id]);
  return result.rows; 
}

export async function getOneReviewByIdreview(id) {

  console.log(typeof id);
  //tässä haetaan olemassa oleva review idreviewin perusteella.
  const result = await pool.query("SELECT * FROM reviews WHERE idreviews = $1", [id]);
  return result.rows; 
}

export async function addOneReview(userReview) {
  console.log("lisätään elokuva"); //tässä luodaan automaattisesti autoinkrementillä uusi review, missä idreview sarake luodaan automaattisesi.
  const result = await pool.query("INSERT INTO reviews (review, rating, idaccount, idmovie, date, ismovie, username, idavatar) VALUES($1,$2,$3,$4,$5,$6,$7,$8)", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie, userReview.date, 
    userReview.ismovie,userReview.username, userReview.idavatar]);
  return result.rows;
}

export async function updateOneReview(id, userReview) {
  console.log("update:"+id); //tässä päivitetään olemassa oleva review idreviewsin perusteella.
  const result = await pool.query("UPDATE reviews SET review=$1, rating=$2, idaccount=$3, idmovie=$4, date=$5, ismovie=$6, username=$7, idavatar=$8 WHERE idreviews = $9", [userReview.review, userReview.rating, userReview.idaccount,
   userReview.idmovie, userReview.date, userReview.ismovie, userReview.username, userReview.idavatar, id]);
  return result.rows;
}

export async function deleteReview(id) {
  console.log("delete:"+id); //tässä poistetaan olemassa oleva review idreviewsin perusteella.
  const result = await pool.query("DELETE FROM reviews WHERE idreviews = $1 RETURNING idreviews", [id]);
  return result.rows;
}

export async function updateOneReviewIcon(idavatar, username) {

  const result = await pool.query("UPDATE reviews SET idavatar=$1 WHERE username = $2", [userReview.idavatar, username]);
  return result.rows;
}
