import { getAllFavourites, addFavourite, deleteFavourite } from "../models/favourites_model.js";

export async function getFavourites(req, res, next) {
  try {
    const moviedata = await getAllFavourites(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "favourites not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}

export async function addAFavourite(req, res, next) {
  try {
     const response= await addFavourite(req.body)
     res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteAFavourite(req, res, next) {
  try {
    const moviedata = await deleteFavourite(req.body.id);
     if (!moviedata) {
      return res.status(404).json({ error: "favourite not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}