
import {getAll, addOne, authenticateAccount, saveRefreshToken, getAccountByRefreshToken, clearRefreshToken } from "../models/account_model.js";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.js";

export async function getAccounts(req, res, next) {
  try {
    const users = await getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function addAccount(req, res, next) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await addOne(username, password, email);
    res.status(201).json({ message: "User created successfully", username: user.username });
  } catch (err) {
    if (err.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({ error: "Username already exists" });
    }
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await authenticateAccount(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const accessToken = generateAccessToken(user.username);
    const refreshToken = generateRefreshToken(user.username);


    await saveRefreshToken(user.username, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,                              // Ei JavaScript-pääsyä
      secure: process.env.NODE_ENV === "production", // HTTPS tuotannossa
      sameSite: "strict",                          // CSRF-suojaus
      maxAge: 7 * 24 * 60 * 60 * 1000,            // 7 päivää
    });

    res.json({
      message: "Login successful",
      username: user.username,
      accessToken
    });
  } catch (err) {
    next(err);
  }
}

export async function refreshAccessToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(403).json({ error: "Invalid or expired refresh token" });
    }

    const user = await getAccountByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user.username);

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await getAccountByRefreshToken(refreshToken);

      if (user) {

        await clearRefreshToken(user.username);
      }
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
}