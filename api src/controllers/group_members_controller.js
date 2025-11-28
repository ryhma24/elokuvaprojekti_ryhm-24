import {
  createJoinRequest,
  getGroupMembers,
  getPendingRequests,
  updateRequestStatus,
  removeMember,
  isMember,
  isOwner,
  getMembershipStatus,
} from "../models/group_members_model.js";
import { getOneGroup } from "../models/groups_model.js";

// Request to join a group
export async function requestJoin(req, res, next) {
  try {
    const { idgroup } = req.params;
    const idaccount = req.user.idaccount; // from authenticateToken middleware

    // Check if group exists
    const group = await getOneGroup(idgroup);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if user is already owner
    if (group.owner === idaccount) {
      return res.status(400).json({ error: "You are the owner of this group" });
    }

    const request = await createJoinRequest(idgroup, idaccount);
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
}

// Get members of a group
export async function getMembers(req, res, next) {
  try {
    const { idgroup } = req.params;
    const members = await getGroupMembers(idgroup);
    res.json(members);
  } catch (err) {
    next(err);
  }
}

// Get pending requests (owner only)
export async function getPending(req, res, next) {
  try {
    const { idgroup } = req.params;
    const idaccount = req.user.idaccount;

    // Check if user is owner
    const isGroupOwner = await isOwner(idgroup, idaccount);
    if (!isGroupOwner) {
      return res.status(403).json({ error: "Only group owner can view requests" });
    }

    const requests = await getPendingRequests(idgroup);
    res.json(requests);
  } catch (err) {
    next(err);
  }
}

// Accept or reject join request (owner only)
export async function respondToRequest(req, res, next) {
  try {
    const { idgroup, requestId } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'
    const idaccount = req.user.idaccount;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Check if user is owner
    const isGroupOwner = await isOwner(idgroup, idaccount);
    if (!isGroupOwner) {
      return res.status(403).json({ error: "Only group owner can respond to requests" });
    }

    const updated = await updateRequestStatus(requestId, status);
    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Remove member from group (owner or member themselves)
export async function removeMemberFromGroup(req, res, next) {
  try {
    const { idgroup, memberId } = req.params;
    const idaccount = req.user.idaccount;

    // Check if user is owner or removing themselves
    const isGroupOwner = await isOwner(idgroup, idaccount);
    const isSelf = parseInt(memberId) === idaccount;

    if (!isGroupOwner && !isSelf) {
      return res.status(403).json({ 
        error: "Only group owner can remove members, or members can remove themselves" 
      });
    }

    const removed = await removeMember(idgroup, memberId);
    if (!removed) {
      return res.status(404).json({ error: "Member not found in group" });
    }

    res.json(removed);
  } catch (err) {
    next(err);
  }
}

// Get user's membership status in a group
export async function checkMembershipStatus(req, res, next) {
  try {
    const { idgroup } = req.params;
    const idaccount = req.user.idaccount;

    const group = await getOneGroup(idgroup);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if user is owner
    if (group.owner === idaccount) {
      return res.json({ status: 'owner' });
    }

    // Check membership status
    const status = await getMembershipStatus(idgroup, idaccount);
    res.json({ status: status || 'not_member' });
  } catch (err) {
    next(err);
  }
}