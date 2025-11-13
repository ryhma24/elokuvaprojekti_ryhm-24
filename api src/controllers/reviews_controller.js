import { getAllReviews, getOneReview, deleteReview, addOneReview, updateOneReview } from "../models/reviews_model.js";

export async function getReviews(req, res, next) {
  try {
    const moviedata = await getAllReviews(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "reviews not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}

export async function getAReview(req, res, next) {
  try {
    const moviedata = await getOneReview(req.params.id);
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

