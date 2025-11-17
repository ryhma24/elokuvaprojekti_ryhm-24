import { pool } from "../database.js";

// Get all groups owned by owner
export async function getAllGroupsByOwner(ownerId) {
  const result = await pool.query(
    "SELECT * FROM groups WHERE owner = $1",
    [ownerId]
  );
  return result.rows;
}

// Get ALL groups
export async function getAllGroups() {
  const result = await pool.query("SELECT * FROM groups");
  return result.rows;
}

// Get one group by its id
export async function getOneGroup(id) {
  const result = await pool.query(
    "SELECT * FROM groups WHERE idgroup = $1",
    [id]
  );
  return result.rows[0];
}

// Add a new group
export async function addOneGroup(group) {
  const result = await pool.query(
    "INSERT INTO groups (name, group_color, member_status, movie_list, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      group.name,
      group.group_color,
      group.member_status,
      group.movie_list,
      group.owner,
    ]
  );
  return result.rows[0];
}

// Update an existing group
export async function updateOneGroup(id, group) {
  const result = await pool.query(
    "UPDATE groups SET name=$1, group_color=$2, member_status=$3, movie_list=$4, owner=$5 WHERE idgroup=$6 RETURNING *",
    [
      group.name,
      group.group_color,
      group.member_status,
      group.movie_list,
      group.owner,
      id,
    ]
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
