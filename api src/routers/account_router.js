import { Router } from "express";
import { getAccounts, addAccount, login, refreshAccessToken, logout, deleteOneAccount, setAccountForDeletion, cancelAccountDeletion, getFlags } from "../controllers/account_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const accountRouter = Router();

// Julkiset reitit
accountRouter.post("/register", addAccount);
accountRouter.post("/login", login);
accountRouter.post("/refresh", refreshAccessToken);
accountRouter.post("/logout", logout);
accountRouter.put("/setDeletionFlag", setAccountForDeletion); //vie tää suojatuksi myöhemmin
accountRouter.put("/cancelDeletionFlag", cancelAccountDeletion);
accountRouter.get("/getflagged", getFlags);

// Suojatut reitit (vaativat autentikoinnin)
accountRouter.get("/getaccounts", authenticateToken, getAccounts);
accountRouter.delete("/deleteaccount/:id", authenticateToken, deleteOneAccount);

export default accountRouter;