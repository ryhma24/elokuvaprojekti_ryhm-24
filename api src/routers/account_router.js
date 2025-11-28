import { Router } from "express";
import { getAccounts, addAccount, login, refreshAccessToken, logout, deleteOneAccount, setAccountForDeletion, cancelAccountDeletion, getFlags, getDeletionDateFromAcc } from "../controllers/account_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const accountRouter = Router();

// Julkiset reitit
accountRouter.post("/register", addAccount);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout);
accountRouter.post("/refresh", refreshAccessToken);

// Suojatut reitit (vaativat autentikoinnin)
accountRouter.get("/getflagged/:username",authenticateToken, getFlags);
accountRouter.get("/getdeletiondate/:username", authenticateToken, getDeletionDateFromAcc);
accountRouter.get("/getaccounts", authenticateToken, getAccounts);
accountRouter.delete("/deleteaccount/:id", authenticateToken, deleteOneAccount);
accountRouter.put("/setDeletionFlag", authenticateToken, setAccountForDeletion); //vie tää suojatuksi myöhemmin
accountRouter.put("/cancelDeletionFlag", authenticateToken, cancelAccountDeletion);

export default accountRouter;