import { Router } from "express";
import {
  getGroups,           
  getGroupsByOwner,    
  getAGroup,
  addGroup,
  updateGroup,
  deleteOneGroup,
} from "../controllers/groups_controller.js";
import { authenticateToken, optionalAuth } from "../middleware/auth.js";

const groupsRouter = Router();

// Public routes
groupsRouter.get("/", getGroups); // List all groups - no auth needed

// Protected routes
groupsRouter.get("/owner/:ownerId", authenticateToken, getGroupsByOwner);
groupsRouter.get("/:id", optionalAuth, getAGroup); // Optional auth to show if user can view
groupsRouter.post("/", authenticateToken, addGroup);
groupsRouter.put("/:id", authenticateToken, updateGroup);
groupsRouter.delete("/:id", authenticateToken, deleteOneGroup);

export default groupsRouter;