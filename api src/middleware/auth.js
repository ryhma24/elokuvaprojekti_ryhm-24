import { verifyAccessToken } from "../utils/jwt.js";
import { pool } from "../database.js";

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(403).json({ error: "Invalid or expired access token" });
  }


  //////////////////////////


  try {
    const result = await pool.query(
      "SELECT idaccount, username, email FROM account WHERE username = $1",
      [decoded.username]
    );
    
    if (!result.rows[0]) {
      return res.status(403).json({ error: "User not found" });
    }

    req.user = result.rows[0]; // { idaccount, username, email }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Authentication error" });
  }
}

// Optional authentication - doesn't fail if no token
export async function optionalAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return next(); // Continue without user
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return next(); // Continue without user
  }

  try {
    const result = await pool.query(
      "SELECT idaccount, username, email FROM account WHERE username = $1",
      [decoded.username]
    );
    
    if (result.rows[0]) {
      req.user = result.rows[0];
    }
  } catch (error) {
    // Ignore error, continue without user
  }
  
  next();
}