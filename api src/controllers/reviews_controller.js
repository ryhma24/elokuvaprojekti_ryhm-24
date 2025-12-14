import { getAllReviewsFromUser, getOneReviewByIdreview, addOneReview, deleteReview, getReviewByMovieId, updateOneReview } from "../models/reviews_model.js";

export async function getReviewsUser(req, res, next) {
  try {
    const moviedata = await getAllReviewsFromUser(req.params.id);
     if (moviedata.length === 0) {
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
  try {
    const { review, rating, idaccount, idmovie, date, ismovie } = req.body;

    if (!review || !rating || !idaccount || !idmovie || !date || !ismovie) {
      return res.status(400).json({ error: "request missing column data!" });
    }
    console.log("Request body:", req.body);
    const response = await addOneReview(req.body);
    res.json({message: "review added successfully!"}, response);
  } catch (err) {
    console.log(err);
    if(err.code === "23505")
    {
      return res.status(409).json({ error: "Dublicate review" });
    }
    next(err);
  }
}

export async function updateReview(req, res, next) {
  try {
    console.log("Request body:", req.body);
    const response = await updateOneReview(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteOneReview(req, res, next) {
  try {
    const moviedata = await deleteReview(req.params.id);
    if (moviedata.length === 0) {
      return res.status(404).json({ error: "review not found" });
    }
    res.json(
    {message: "review deleted", id: req.params.id}, 
    moviedata);
  } catch (err) {
    next(err);
  }
}

