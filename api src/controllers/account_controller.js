
import {
       getAll, addOne, authenticateAccount, saveRefreshToken, getAccountByRefreshToken, 
       clearRefreshToken, deleteAccount, setDeletionFlag, 
       cancelDeletionFlag, checkDeletionFlagFromuser, 
       getDeletionDate, UpdatePassword, UpdateEmail, getIdFromAccount, getEmailFromAccount
       } from "../models/account_model.js";

import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.js";
import { validateEmail } from "../middleware/ValidateEmail.js";

export async function getAccounts(req, res, next) {
  try {
    const users = await getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getId(req, res, next) {
  try {
    const { username }  = req.params;
    console.log("tässä on un "+ username)
    const userId = await getIdFromAccount(username);
    res.json(userId);
  } catch (err) {
    next(err);
  }
}

export async function getEmail(req, res, next) {
  try {
    const { username }  = req.params;
    const userEmail = await getEmailFromAccount(username);
    console.log("user email: "+JSON.stringify(userEmail))
    res.json(userEmail);
  } catch (err) {
    next(err);
  }
}

export async function getDeletionDateFromAcc(req, res, next) {
  try {
    const { username } = req.params;
    const deletionDate = await getDeletionDate(username);
    res.json(deletionDate);
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  try 
  {
    const { username, password} = req.body;
    const pwLength = password.length; // if lauseke ei jostain syystä tajua password.lengthiä suoraan

    if (!username || !password) 
    {
      return res.status(400).json({ error: "password required!" });
    }

    if (pwLength < 8)
    {
      return res.status(400).json( {error: "New password has to be at least 8 characters long!"})
    }

    const user = await UpdatePassword(username, password);
    res.status(201).json({ message: "Password changed succesfully!", username: user.username });
  } 
  catch (err) 
  {
      next(err);
  }
  
}

export async function changeEmail(req, res, next) {

    try 
    {
      const { username, email} = req.body;

      if (!username) 
      {
        return res.status(400).json({ error: "username required!" });
      }

      if(!validateEmail(email))
      {
        return res.status(400).json({ error: "Please use correct email format!"});
      }


      const user = await UpdateEmail(username, email);
      res.status(201).json({ message: "Email changed succesfully!", username: user.username, newemail: user.email });
    } 
    catch (err) 
    {
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
      return res.status(400).json({ error: "Username, password and email required!" });
    }

    if (pwLength < 8)
    {
      return res.status(400).json( {error: "Password has to be at least 8 characters long!"})
    }

    if(!validateEmail(email))
    {
      res.status(400).json({ error: "Please use correct email format!"});
    }

    const user = await addOne(username, password, email);
    res.status(201).json({ message: "User created succesfully", username: user.username });
  } 
  catch (err) 
  {
    if (err.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({ error: "Username already exists" });
    }
    next(err);
  }
}

export async function setAccountForDeletion(req, res, next) { //flagaan käyttäjä poistoa varten, flag scheduleri poistaa kaikki flagatut käyttäjät 2vk päästä ko. käyttäjän flagaamisen päivämäärästä alkaen
  try {
      console.log("tässä on res.rows "+JSON.stringify(req.body.username))
      const response = await setDeletionFlag(req.body.username);
      if(!response[0].username)
      {
        console.log("käyttäjää ei löytynyt poistoa varten. "+response[0].username)
        return res.status(404).json({message: "user not found"})
      }
      res.status(200).json({username: response[0].username, deletion_date: response[0].deletion_date });
    } catch (err) {
      next(err);
    }
}

export async function cancelAccountDeletion(req, res, next) { //peruutetaan käyttäjän poisto
  try {
      console.log("cancel deletion username on: "+req.body)
      const response = await cancelDeletionFlag(req.body.username);
      if(!response.username)
      {
        console.log("käyttäjää ei löytynyt poistoa varten. "+response.username)
        return res.status(404).json({message: "user not found"})
      }
      res.status(200).json({ message: "Account deletion cancelled", username: response });
    } catch (err) {
      next(err);
    }
}

export async function getFlags(req, res, next) { //tää funtio on sitä varten, että flag-scheduleri saa tarkistettua kaikki poistoon flagatut käyttäjät
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
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await authenticateAccount(username, password);

    if (!user) {
      return res.status(401).json({ error: "Wrong username or password" });
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

    if (!refreshToken)
    {
      res.status(400).json({ message: "No token" });
    }

    if (refreshToken) {
      const user = await getAccountByRefreshToken(refreshToken);

      if (user) {

        await clearRefreshToken(user.username);
      }
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

export async function deleteOneAccount(req, res, next) {
  try {
    console.log("poistetaan käyttäjä: "+req.params.id)
    const accountData = await deleteAccount(req.params.id);
    
     if (!accountData) {
      return res.status(404).json({ error: "account not found" });
    }
    res.json(accountData);
  } catch (err) {
    next(err);
  }
}