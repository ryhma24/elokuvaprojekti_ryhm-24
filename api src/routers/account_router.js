import { Router } from "express";

import { getAccounts, addAccount, login, refreshAccessToken, 
         logout, deleteOneAccount, setAccountForDeletion, cancelAccountDeletion, 
         getFlags, getDeletionDateFromAcc, changePassword,
         changeEmail, getId, getEmail, checkPassword
       } from "../controllers/account_controller.js";

import { authenticateToken } from "../middleware/auth.js";

const accountRouter = Router();

// Julkiset reitit
accountRouter.post("/register", addAccount);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout);
accountRouter.post("/refresh", refreshAccessToken);

// Suojatut reitit (vaativat autentikoinnin)
accountRouter.post("/checkpass",authenticateToken, checkPassword);
accountRouter.get("/getemail/:username",authenticateToken, getEmail);
accountRouter.get("/getflagged/:username",authenticateToken, getFlags);
accountRouter.get("/getid/:username", authenticateToken, getId);
accountRouter.get("/getdeletiondate/:username", authenticateToken, getDeletionDateFromAcc);
accountRouter.get("/getaccounts", authenticateToken, getAccounts);
accountRouter.delete("/deleteaccount/:id", authenticateToken, deleteOneAccount);
accountRouter.put("/setDeletionFlag", authenticateToken, setAccountForDeletion);
accountRouter.put("/cancelDeletionFlag", authenticateToken, cancelAccountDeletion);
accountRouter.put("/changePassword", authenticateToken, changePassword);
accountRouter.put("/changeEmail", authenticateToken, changeEmail);

export default accountRouter;