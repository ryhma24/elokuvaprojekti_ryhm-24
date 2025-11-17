import { Router } from "express";
import {
  getGroups,           
  getGroupsByOwner,    
  getAGroup,
  addGroup,
  updateGroup,
  deleteOneGroup,
} from "../controllers/groups_controller.js";

const groupsRouter = Router();

groupsRouter.get("/", getGroups);
groupsRouter.get("/owner/:ownerId", getGroupsByOwner);
groupsRouter.get("/:id", getAGroup);
groupsRouter.post("/", addGroup);
groupsRouter.put("/:id", updateGroup);
groupsRouter.delete("/:id", deleteOneGroup);

export default groupsRouter;
