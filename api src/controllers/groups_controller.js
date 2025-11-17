import {
  getAllGroups,
  getAllGroupsByOwner,
  getOneGroup,
  addOneGroup,
  updateOneGroup,
  deleteGroup,
} from "../models/groups_model.js";

export async function getGroups(req, res, next) {
  try {
    const groups = await getAllGroups();
    res.json(groups);
  } catch (err) {
    next(err);
  }
}


export async function getGroupsByOwner(req, res, next) {
  try {
    const groups = await getAllGroupsByOwner(req.params.ownerId);
    if (!groups.length)
      return res.status(404).json({ error: "No groups found" });

    res.json(groups);
  } catch (err) {
    next(err);
  }
}

export async function getAGroup(req, res, next) {
  try {
    const group = await getOneGroup(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    next(err);
  }
}

export async function addGroup(req, res, next) {
  try {
    const newGroup = await addOneGroup(req.body);
    res.status(201).json(newGroup);
  } catch (err) {
    next(err);
  }
}

export async function updateGroup(req, res, next) {
  try {
    const updated = await updateOneGroup(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Group not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteOneGroup(req, res, next) {
  try {
    const deleted = await deleteGroup(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Group not found" });
    res.json(deleted);
  } catch (err) {
    next(err);
  }
}
