import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "15m";  // 15 minuuttia
const REFRESH_TOKEN_EXPIRY = "7d";  // 7 päivää

export function generateAccessToken(user) {
  return jwt.sign(
    { username: user.username, idaccount: user.idaccount },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { username: user.username, idaccount: user.idaccount },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}