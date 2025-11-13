import { Router } from "express";
import { getAccounts, addAccount, login, refreshAccessToken, logout, deleteOneAccount } from "../controllers/account_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const accountRouter = Router();

// Julkiset reitit
accountRouter.post("/register", addAccount);
accountRouter.post("/login", login);
accountRouter.post("/refresh", refreshAccessToken);
accountRouter.post("/logout", logout);

// Suojatut reitit (vaativat autentikoinnin)
accountRouter.get("/getaccounts", authenticateToken, getAccounts);
accountRouter.delete("/deleteaccount/:id", authenticateToken, deleteOneAccount);

export default accountRouter;