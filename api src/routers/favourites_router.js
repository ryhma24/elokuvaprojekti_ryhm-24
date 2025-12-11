import { Router } from "express";
import { getFavourites, addAFavourite, deleteAFavourite } from "../controllers/favourites_controller.js";
import { authenticateToken } from "../middleware/auth.js";


const favouritesRouter = Router();

favouritesRouter.get("/", getFavourites); //id tulee urliin
favouritesRouter.post("/addfavourite", authenticateToken, addAFavourite); //näissä parametrit tulee requestin bodyssa.
favouritesRouter.delete("/deletefavourite", authenticateToken, deleteAFavourite);


export default favouritesRouter;