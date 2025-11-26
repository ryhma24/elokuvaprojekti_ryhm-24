import { Router } from "express";
import { getAccounts, addAccount, login, refreshAccessToken, logout, deleteOneAccount, setAccountForDeletion, cancelAccountDeletion, getFlags } from "../controllers/account_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const accountRouter = Router();

// Julkiset reitit
accountRouter.post("/register", addAccount);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout);
accountRouter.post("/refresh", refreshAccessToken);
//accountRouter.get("/getflagged", getFlags);

// Suojatut reitit (vaativat autentikoinnin)
accountRouter.get("/getaccounts", authenticateToken, getAccounts);
accountRouter.delete("/deleteaccount/:id", authenticateToken, deleteOneAccount);
accountRouter.put("/setDeletionFlag", authenticateToken, setAccountForDeletion); //vie tää suojatuksi myöhemmin
accountRouter.put("/cancelDeletionFlag", authenticateToken, cancelAccountDeletion);

export default accountRouter;