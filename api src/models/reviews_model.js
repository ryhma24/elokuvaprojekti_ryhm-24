import { pool } from "../database.js";


export async function getAllReviewsFromUser(id) {

  console.log(typeof id);
  //tässä haetaan jonkun käyttäjän kaikki reviewit.
  const result = await pool.query("SELECT * FROM reviews WHERE idaccount = $1", [id]);
  return result.rows; 
}

export async function getReviewByMovieId(id) {

  console.log(typeof id);
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
  const result = await pool.query("INSERT INTO reviews (review, rating, idaccount, idmovie, date) VALUES($1,$2,$3,$4,$5)", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie, userReview.date]);
  return result.rows;
}

export async function updateOneReview(id, userReview) {
  console.log("update:"+id); //tässä päivitetään olemassa oleva review idreviewsin perusteella.
  const result = await pool.query("UPDATE reviews SET review=$1, rating=$2, idaccount=$3, idmovie=$4, date=$5 WHERE idreviews = $6", [userReview.review, userReview.rating, userReview.idaccount, userReview.idmovie, userReview.date, id]);
  return result.rows;
}

export async function deleteReview(id) {
  console.log("delete:"+id); //tässä poistetaan olemassa oleva review idreviewsin perusteella.
  const result = await pool.query("DELETE FROM reviews WHERE idreviews = $1", [id]);
  return result.rows;
}
