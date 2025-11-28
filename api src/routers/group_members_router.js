import { Router } from "express";
import {
  requestJoin,
  getMembers,
  getPending,
  respondToRequest,
  removeMemberFromGroup,
  checkMembershipStatus,
} from "../controllers/group_members_controller.js";
import { authenticateToken } from "../middleware/auth.js";

const groupMembersRouter = Router();

// All routes require authentication
groupMembersRouter.post("/:idgroup/join", authenticateToken, requestJoin);
groupMembersRouter.get("/:idgroup/members", authenticateToken, getMembers);
groupMembersRouter.get("/:idgroup/pending", authenticateToken, getPending);
groupMembersRouter.put("/:idgroup/requests/:requestId", authenticateToken, respondToRequest);
groupMembersRouter.delete("/:idgroup/members/:memberId", authenticateToken, removeMemberFromGroup);
groupMembersRouter.get("/:idgroup/status", authenticateToken, checkMembershipStatus);

export default groupMembersRouter;