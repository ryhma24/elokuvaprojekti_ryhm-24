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

export async function requestJoin(req, res, next) {
  try {
    const { idgroup } = req.params;
    const idaccount = req.user.idaccount; // from authenticateToken middleware

    const group = await getOneGroup(idgroup);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (group.owner === idaccount) {
      return res.status(400).json({ error: "You are the owner of this group" });
    }

    const request = await createJoinRequest(idgroup, idaccount);
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
}

export async function getMembers(req, res, next) {
  try {
    const { idgroup } = req.params;
    const members = await getGroupMembers(idgroup);
    res.json(members);
  } catch (err) {
    next(err);
  }
}

export async function getPending(req, res, next) {
  try {
    const { idgroup } = req.params;
    const idaccount = req.user.idaccount;

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

export async function respondToRequest(req, res, next) {
  try {
    const { idgroup, requestId } = req.params;
    const { status } = req.body; 
    const idaccount = req.user.idaccount;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

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

export async function removeMemberFromGroup(req, res, next) {
  try {
    const { idgroup, memberId } = req.params;
    const idaccount = req.user.idaccount;

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

export async function checkMembershipStatus(req, res, next) {
  try {
    const { idgroup } = req.params;
    const idaccount = req.user.idaccount;

    const group = await getOneGroup(idgroup);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (group.owner === idaccount) {
      return res.json({ status: 'owner' });
    }

    const status = await getMembershipStatus(idgroup, idaccount);
    res.json({ status: status || 'not_member' });
  } catch (err) {
    next(err);
  }
}