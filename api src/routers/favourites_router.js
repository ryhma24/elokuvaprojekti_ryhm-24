import { Router } from "express";
import { getAllFavourites, addFavourite, deleteFavourite } from "../controllers/favourites_controller.js";


const favouritesRouter = Router();

favouritesRouter.get("/:id", getAllFavourites); 
favouritesRouter.post("/:id", addFavourite);
favouritesRouter.delete("/:id", deleteFavourite);


export default favouritesRouter;