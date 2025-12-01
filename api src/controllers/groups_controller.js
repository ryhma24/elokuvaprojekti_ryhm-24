import {
  getAllGroups,
  getAllGroupsByOwner,
  getOneGroup,
  addOneGroup,
  updateOneGroup,
  deleteGroup,
} from "../models/groups_model.js";
import { isMember, isOwner } from "../models/group_members_model.js";

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
    const { id } = req.params;
    const group = await getOneGroup(id);
    
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // If user is authenticated, check membership
    if (req.user) {
      const idaccount = req.user.idaccount;
      const userIsOwner = group.owner === idaccount;
      const userIsMember = await isMember(id, idaccount);

      // Only owner and members can see group details
      if (!userIsOwner && !userIsMember) {
        return res.status(403).json({ 
          error: "Only group members can view group details",
          groupName: group.name // Still show name for join requests
        });
      }
    } else {
      // Not authenticated - can't view details
      return res.status(401).json({ 
        error: "Authentication required to view group details" 
      });
    }

    res.json(group);
  } catch (err) {
    next(err);
  }
}

export async function addGroup(req, res, next) {
  try {
    const { name, description } = req.body;
    const owner = req.user.idaccount; // from authenticateToken

    if (!name) {
      return res.status(400).json({ error: "Group name is required" });
    }

    const newGroup = await addOneGroup(name, description, owner);
    res.status(201).json(newGroup);
  } catch (err) {
    if (err.code === '23505') { // Unique violation
      return res.status(400).json({ error: "Group name already exists" });
    }
    next(err);
  }
}

export async function updateGroup(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const idaccount = req.user.idaccount;

    // Check if user is owner
    const userIsOwner = await isOwner(id, idaccount);
    if (!userIsOwner) {
      return res.status(403).json({ error: "Only group owner can update group" });
    }

    const updated = await updateOneGroup(id, name, description);
    if (!updated) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    res.json(updated);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: "Group name already exists" });
    }
    next(err);
  }
}

export async function deleteOneGroup(req, res, next) {
  try {
    const { id } = req.params;
    const idaccount = req.user.idaccount;

    // Check if user is owner
    const userIsOwner = await isOwner(id, idaccount);
    if (!userIsOwner) {
      return res.status(403).json({ error: "Only group owner can delete group" });
    }

    const deleted = await deleteGroup(id);
    if (!deleted) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    res.json(deleted);
  } catch (err) {
    next(err);
  }
}