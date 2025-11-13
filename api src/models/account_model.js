import { pool } from "../database.js";

export async function getAll() {
  const result = await pool.query("SELECT * FROM account");
  return result.rows; 
}
