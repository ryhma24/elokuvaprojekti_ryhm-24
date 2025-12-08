import { Router } from "express";
import { getReviewsUser, getAReviewByIdreview, deleteOneReview, addReview, updateReview, getAReviewbyMovieid } from "../controllers/reviews_controller.js";
import { authenticateToken } from "../middleware/auth.js";


const reviewsRouter = Router();

reviewsRouter.get("/review/:id", getAReviewByIdreview);
reviewsRouter.get("/review/movieid/:id", getAReviewbyMovieid);

//suojatut reitit alhaalla
reviewsRouter.get("/:id", authenticateToken, getReviewsUser);
reviewsRouter.post("/",authenticateToken, addReview);
reviewsRouter.put("/:id", authenticateToken, updateReview);
reviewsRouter.delete("/:id", authenticateToken, deleteOneReview); // :id on parametri urliin


export default reviewsRouter;