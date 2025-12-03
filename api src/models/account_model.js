
import { pool } from "../database.js";
import  bcrypt  from "bcrypt";
import { formatDay } from "../middleware/date-formatter.js";

const SALT_ROUNDS = 10;

export async function addOne(username, password, email) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    "INSERT INTO account (username, password, email, deletion_flag) VALUES ($1, $2, $3, FALSE) RETURNING username",
    [username, hashedPassword, email]
  );
  return result.rows[0];
}

export async function UpdatePassword(username, newPassword) {
  const newHashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const result = await pool.query(
    "UPDATE account SET password = $1 WHERE username = $2 RETURNING username",
    [newHashedPassword, username]
  );
  return result.rows[0];
}

export async function UpdateEmail(username, newEmail) {
  
  const result = await pool.query(
    "UPDATE account SET email = $1 WHERE username = $2 RETURNING username, email",
    [newEmail, username]
  );
  return result.rows[0];
}

export async function getAll() {
  const result = await pool.query("SELECT username FROM account");
  return result.rows;
}

export async function getDeletionDate(username) {
  console.log("username getdeletiondatessa on: "+username);
  const result = await pool.query("SELECT deletion_date FROM account where username = $1", 
    [username]);
  return result.rows;
}

export async function setDeletionFlag(username) {
 
  //asetetaan account poistoa varten 2 viikon päähän
  const deletionDate = formatDay();
  console.log(deletionDate);

  const result = await pool.query
  ("UPDATE account SET deletion_flag = TRUE, deletion_date = $1 WHERE username = $2 RETURNING username, deletion_date",
    [deletionDate, username]
  );
  return result.rows;
  
}

export async function cancelDeletionFlag(username) {

  //perutetaan käyttäjän poisto
  const result = await pool.query
  ("UPDATE account SET deletion_flag = FALSE, deletion_date = NULL WHERE username = $1 RETURNING username",
    [username]
  );
  return result.rows;
}

export async function checkDeletionFlagFromuser(username) {

  //tarkistetaan käyttäjän flagi
  const result = await pool.query
  ("SELECT deletion_flag FROM account WHERE username = $1", [username]
  );
  return result.rows;
}


export async function authenticateAccount(username, password) {
  const result = await pool.query(
    "SELECT username, password, idaccount FROM account WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    console.log("käyttäjää ei löytynyt");
    return null;
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    console.log("kirjauduttu käyyäjällä: "+user.username)
    console.log("käyttäjän id: "+user.idaccount)
    return { username: user.username, idaccount: user.idaccount };
  }
  console.log("salasana tai käyttäjänimi on väärin");
  return null;
}

export async function saveRefreshToken(username, refreshToken) {
  const result = await pool.query(
    "UPDATE account SET refresh_token = $1 WHERE username = $2 RETURNING username",
    [refreshToken, username]
  );
  return result.rows[0];
}

export async function getAccountByRefreshToken(refreshToken) {
  const result = await pool.query(
    "SELECT username, idaccount FROM account WHERE refresh_token = $1",
    [refreshToken]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
} 


export async function clearRefreshToken(username) {
  const result = await pool.query(
    "UPDATE account SET refresh_token = NULL WHERE username = $1 RETURNING username",
    [username]
  );
  return result.rows[0];
}

export async function deleteAccount(id) {
  console.log("delete:"+id); //tässä poistetaan olemassa oleva account idaccountin perusteella.
  //jos accountilla on tietoa muissa tauluissa, poistuu ne cascade delete-tietokantasäännön avulla.
  const result = await pool.query("DELETE FROM account WHERE idaccount = $1 ", [id]);
  return result.rows;
}