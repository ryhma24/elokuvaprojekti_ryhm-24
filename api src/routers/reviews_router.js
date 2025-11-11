import { Router } from "express";
import { getReviews, deleteOneReview, addReview, updateReview } from "../controllers/reviews_controller.js";

const reviewsRouter = Router();

reviewsRouter.get("/:id", getReviews); //id tulee urlin parametriin
reviewsRouter.post("/", addReview);
reviewsRouter.put("/:id", updateReview);
reviewsRouter.delete("/:id", deleteOneReview);


export default reviewsRouter;