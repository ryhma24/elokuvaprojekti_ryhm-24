import { Router } from "express";
import { getReviews, getAReview, deleteOneReview, addReview, updateReview } from "../controllers/reviews_controller.js";
import { authenticateToken } from "../middleware/auth.js";


const reviewsRouter = Router();

reviewsRouter.get("/:id", authenticateToken, getReviews); //autenticate tokeni luo suojauksen näihin reitteihin
reviewsRouter.get("/review/:id", authenticateToken, getAReview);
reviewsRouter.post("/",authenticateToken, addReview);
reviewsRouter.put("/:id", authenticateToken, updateReview);
reviewsRouter.delete("/:id", authenticateToken, deleteOneReview); // :id on parametri urliin


export default reviewsRouter;