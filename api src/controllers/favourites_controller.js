import { getAllFavourites, addFavourite, deleteFavourite } from "../models/favourites_model.js";

export async function getAllFavourites(req, res, next) {
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

export async function addFavourite(req, res, next) {
  try {
     const response= await addFavourite(req.body)
  } catch (err) {
    next(err);
  }
}

export async function deleteFavourite(req, res, next) {
  try {
    const moviedata = await deleteFavourite(req.params.id);
     if (!moviedata) {
      return res.status(404).json({ error: "favourite not found" });
    }
    res.json(moviedata);
  } catch (err) {
    next(err);
  }
}
