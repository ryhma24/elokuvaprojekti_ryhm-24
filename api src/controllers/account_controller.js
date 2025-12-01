
import {getAll, addOne, authenticateAccount, saveRefreshToken, getAccountByRefreshToken, 
       clearRefreshToken, deleteAccount, setDeletionFlag, cancelDeletionFlag, checkDeletionFlagFromuser, getDeletionDate } from "../models/account_model.js";

import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.js";

export async function getAccounts(req, res, next) {
  try {
    const users = await getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getDeletionDateFromAcc(req, res, next) {
  try {
    const { username } = req.params;
    console.log("toimiiko ajan haku?")
    const deletionDate = await getDeletionDate(username);
    res.json(deletionDate);
  } catch (err) {
    next(err);
  }
}

export async function addAccount(req, res, next) {
  try 
  {
    const { username, password, email } = req.body;
    const pwLength = password.length; // if lauseke ei jostain syystä tajua password.lengthiä suoraan

    if (!username || !password || !email) 
    {
      return res.status(400).json({ error: "Käyttäjänimi, salasana ja email vaaditaan" });
    }

    if (pwLength < 8)
    {
      return res.status(400).json( {error: "Salasanan pitää olla vähintään 8 merkkiä pitkä"})
    }

    const user = await addOne(username, password, email);
    res.status(201).json({ message: "Käyttäjä luotu onnistuneesti", username: user.username });
  } 
  catch (err) 
  {
    if (err.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({ error: "Käyttäjänimi on jo olemassa" });
    }
    next(err);
  }
}

export async function setAccountForDeletion(req, res, next) {
  try {
      console.log("tässä on res.rows "+JSON.stringify(req.body.username))
      const response = await setDeletionFlag(req.body.username);
      res.status(200).json({username: response[0].username, deletion_date: response[0].deletion_date });
    } catch (err) {
      next(err);
    }
}

export async function cancelAccountDeletion(req, res, next) {
  try {
      const response = await cancelDeletionFlag(req.body.username);
      res.status(200).json({ message: "Tilin poisto keskeytetty", username: response });
    } catch (err) {
      next(err);
    }
}

export async function getFlags(req, res, next) {
  try {
    const { username } = req.params;
    console.log(username)
    const flag = await checkDeletionFlagFromuser(username);
    res.json(flag);
    console.log(flag)
  } catch (err) {
    console.log("errorissa");
    next(err);
  }
}


export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Käyttäjänimi ja salasana vaaditaan" });
    }

    const user = await authenticateAccount(username, password);

    if (!user) {
      return res.status(401).json({ error: "Väärä salasana tai käyttäjänimi" });
    }

    const accessToken = generateAccessToken(user.username);
    const refreshToken = generateRefreshToken(user.username);


    await saveRefreshToken(user.username, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,                              // Ei JavaScript-pääsyä
      secure: process.env.NODE_ENV === "development", // HTTPS tuotannossa
      sameSite: "strict",                          // CSRF-suojaus
      maxAge: 7 * 24 * 60 * 60 * 1000,            // 7 päivää
    });

    res.json({
      message: "Login successful",
      username: user.username,
      accessToken,
      idaccount: user.idaccount
    });
  } catch (err) {
    next(err);
  }
}

export async function refreshAccessToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      console.log("Refresh token required");
      return res.status(401).json({ error: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      console.log("Invalid or expired refresh token");
      return res.status(403).json({ error: "Invalid or expired refresh token" });
    }

    const user = await getAccountByRefreshToken(refreshToken);

    if (!user) {
      console.log("Invalid refresh token");
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user.username);
    const idaccount = user.idaccount
    //console.log(idaccount)

    res.json({ accessToken, idaccount });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("kirjaudutaan ulos");

    if (refreshToken) {
      const user = await getAccountByRefreshToken(refreshToken);

      if (user) {

        await clearRefreshToken(user.username);
      }
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Kirjauduttu ulos" });
  } catch (err) {
    next(err);
  }
}

export async function deleteOneAccount(req, res, next) {
  try {
    console.log("täs on un "+req.params.id)
    const accountData = await deleteAccount(req.params.id);
    
     if (!accountData) {
      return res.status(404).json({ error: "account not found" });
    }
    res.json(accountData);
  } catch (err) {
    next(err);
  }
}