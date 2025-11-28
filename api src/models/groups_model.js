import { pool } from "../database.js";

// Get ALL groups with owner information
export async function getAllGroups() {
  const result = await pool.query(
    `SELECT g.*, a.username as owner_username 
     FROM groups g
     JOIN account a ON g.owner = a.idaccount
     ORDER BY g.created_at DESC`
  );
  return result.rows;
}

// Get one group by its id with owner info
export async function getOneGroup(id) {
  const result = await pool.query(
    `SELECT g.*, a.username as owner_username 
     FROM groups g
     JOIN account a ON g.owner = a.idaccount
     WHERE g.idgroup = $1`,
    [id]
  );
  return result.rows[0];
}

// Add a new group (simplified)
export async function addOneGroup(name, description, owner) {
  const result = await pool.query(
    "INSERT INTO groups (name, description, owner) VALUES ($1, $2, $3) RETURNING *",
    [name, description, owner]
  );
  return result.rows[0];
}

// Update an existing group
export async function updateOneGroup(id, name, description) {
  const result = await pool.query(
    "UPDATE groups SET name=$1, description=$2 WHERE idgroup=$3 RETURNING *",
    [name, description, id]
  );
  return result.rows[0];
}

// Delete a group 
export async function deleteGroup(id) {
  const result = await pool.query(
    "DELETE FROM groups WHERE idgroup = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

// Get all groups owned by owner
export async function getAllGroupsByOwner(ownerId) {
  const result = await pool.query(
    `SELECT g.*, a.username as owner_username 
     FROM groups g
     JOIN account a ON g.owner = a.idaccount
     WHERE g.owner = $1
     ORDER BY g.created_at DESC`,
    [ownerId]
  );
  return result.rows;
}