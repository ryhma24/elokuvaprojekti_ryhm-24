import { Router } from "express";
import { getAccounts } from "../controllers/account_controller.js";

const accountRouter = Router();

accountRouter.get("/", getAccounts);

export default accountRouter;
