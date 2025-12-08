import { pool } from "../database.js";

export async function createJoinRequest(idgroup, idaccount) {
  const result = await pool.query(
    `INSERT INTO group_members (idgroup, idaccount, status) 
     VALUES ($1, $2, 'pending') 
     ON CONFLICT (idgroup, idaccount) 
     DO UPDATE SET status = 'pending', requested_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [idgroup, idaccount]
  );
  return result.rows[0];
}

export async function getGroupMembers(idgroup) {
  const result = await pool.query(
    `SELECT gm.*, a.username, a.email 
     FROM group_members gm
     JOIN account a ON gm.idaccount = a.idaccount
     WHERE gm.idgroup = $1 AND gm.status = 'accepted'
     ORDER BY gm.id`,
    [idgroup]
  );
  return result.rows;
}

export async function getPendingRequests(idgroup) {
  const result = await pool.query(
    `SELECT gm.*, a.username, a.email 
     FROM group_members gm
     JOIN account a ON gm.idaccount = a.idaccount
     WHERE gm.idgroup = $1 AND gm.status = 'pending'
     ORDER BY gm.requested_at DESC`,
    [idgroup]
  );
  return result.rows;
}

export async function updateRequestStatus(id, status) {
  const result = await pool.query(
    `UPDATE group_members 
     SET status = $1, responded_at = CURRENT_TIMESTAMP 
     WHERE id = $2 
     RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

export async function removeMember(idgroup, idaccount) {
  const result = await pool.query(
    `DELETE FROM group_members 
     WHERE idgroup = $1 AND idaccount = $2 
     RETURNING *`,
    [idgroup, idaccount]
  );
  return result.rows[0];
}

export async function isMember(idgroup, idaccount) {
  const result = await pool.query(
    `SELECT * FROM group_members 
     WHERE idgroup = $1 AND idaccount = $2 AND status = 'accepted'`,
    [idgroup, idaccount]
  );
  return result.rows.length > 0;
}

export async function isOwner(idgroup, idaccount) {
  const result = await pool.query(
    `SELECT * FROM groups WHERE idgroup = $1 AND owner = $2`,
    [idgroup, idaccount]
  );
  return result.rows.length > 0;
}

export async function getMembershipStatus(idgroup, idaccount) {
  const result = await pool.query(
    `SELECT status FROM group_members 
     WHERE idgroup = $1 AND idaccount = $2`,
    [idgroup, idaccount]
  );
  return result.rows[0]?.status || null;
}