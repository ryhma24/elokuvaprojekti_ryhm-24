
import { pool } from "../database.js";
import  bcrypt  from "bcrypt";

const SALT_ROUNDS = 10;

export async function addOne(username, password, email) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    "INSERT INTO account (username, password, email) VALUES ($1, $2, $3) RETURNING username",
    [username, hashedPassword, email]
  );
  return result.rows[0];
}

export async function getAll() {
  const result = await pool.query("SELECT username FROM account");
  return result.rows;
}

export async function authenticateAccount(username, password) {
  const result = await pool.query(
    "SELECT username, password FROM account WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    console.log("käyttäjää ei löytynyt");
    return null;
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    return { username: user.username };
  }

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
    "SELECT username FROM account WHERE refresh_token = $1",
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