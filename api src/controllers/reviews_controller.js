import { getAllReviewsFromUser, getOneReviewByIdreview, deleteReview, getReviewByMovieId, updateOneReview } from "../models/reviews_model.js";

export async function getReviewsUser(req, res, next) {
  try {
    const moviedata = await getAllReviewsFromUser(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "reviews not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}

export async function getAReviewByIdreview(req, res, next) {
  try {
    const moviedata = await getOneReviewByIdreview(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}

export async function getAReviewbyMovieid(req, res, next) {
  try {
    const moviedata = await getReviewByMovieId(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}

export async function addReview(req, res, next) {
  console.log("add called");
  try {
    console.log(req.body);
    const response = await addOneReview(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function updateReview(req, res, next) {
  try {
    const response = await updateOneReview(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteOneReview(req, res, next) {
  try {
    const moviedata = await deleteReview(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}

