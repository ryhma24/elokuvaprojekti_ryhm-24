import { getAll } from "../models/account_model.js";

export async function getAccounts(req, res, next) {
  try {
    const accounts = await getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
}
