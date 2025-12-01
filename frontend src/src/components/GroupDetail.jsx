import { useEffect, useState } from "react";
import { useGroups } from "../contexts/GroupsContext";
import { useAuth } from "../contexts/AuthContext";
import "../css/GroupDetail.css";

function GroupDetail({ groupId, onBack }) {
  const {
    currentGroup,
    fetchGroup,
    deleteGroup,
    requestJoinGroup,
    getMembershipStatus,
    getGroupMembers,
    getPendingRequests,
    respondToRequest,
    removeMember,
    loading,
    error,
    setError,
  } = useGroups();

  const { user, accessToken } = useAuth();
  const [membershipStatus, setMembershipStatus] = useState(null);
  const [members, setMembers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    loadGroupData();
  }, [groupId]);

  const loadGroupData = async () => {
    setLocalLoading(true);
    setLocalError("");
    try {
      // Get membership status first
      const status = await getMembershipStatus(groupId);
      setMembershipStatus(status);

      // Try to fetch group details
      try {
        await fetchGroup(groupId);

        // If successful, load members
        const membersData = await getGroupMembers(groupId);
        setMembers(membersData);

        // If owner, load pending requests
        if (status === "owner") {
          const requestsData = await getPendingRequests(groupId);
          setPendingRequests(requestsData);
        }
      } catch (err) {
        // User might not be a member yet
        setLocalError(err.message);
      }
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleJoinRequest = async () => {
    setLocalLoading(true);
    setLocalError("");
    try {
      await requestJoinGroup(groupId);
      alert("Join request sent!");
      await loadGroupData();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLeaveGroup = async () => {
    if (!window.confirm("Are you sure you want to leave this group?")) return;

    setLocalLoading(true);
    setLocalError("");
    try {
      // Get user's account ID from the token
      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      // Find current user in members list
      const currentUserMember = members.find(
        (m) => m.username === user.username
      );
      if (currentUserMember) {
        await removeMember(groupId, currentUserMember.idaccount);
        alert("Left group successfully");
        onBack();
      } else {
        throw new Error("Could not find your membership");
      }
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    setLocalLoading(true);
    setLocalError("");
    try {
      await deleteGroup(groupId);
      alert("Group deleted successfully");
      onBack();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    setLocalLoading(true);
    setLocalError("");
    try {
      await respondToRequest(groupId, requestId, "accepted");
      alert("Request accepted!");
      await loadGroupData();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    setLocalLoading(true);
    setLocalError("");
    try {
      await respondToRequest(groupId, requestId, "rejected");
      alert("Request rejected");
      await loadGroupData();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleRemoveMember = async (memberId, memberUsername) => {
    if (!window.confirm(`Remove ${memberUsername} from group?`)) return;

    setLocalLoading(true);
    setLocalError("");
    try {
      await removeMember(groupId, memberId);
      alert("Member removed");
      await loadGroupData();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  // Show loading state
  if (localLoading && !currentGroup) {
    return (
      <div>
        <button onClick={onBack}>Back to Groups</button>
        <div>Loading...</div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div>
        <button onClick={onBack}>Back to Groups</button>
        <div>Please login to view group details</div>
      </div>
    );
  }

  // Not a member yet
  if (membershipStatus === "not_member" || membershipStatus === null) {
    return (
      <div>
        <button onClick={onBack}>Back to Groups</button>
        <h2>Group Access Required</h2>
        <p>You need to be a member to view this group's details.</p>
        <button onClick={handleJoinRequest} disabled={localLoading}>
          {localLoading ? "Loading..." : "Request to Join"}
        </button>
        {localError && <div>{localError}</div>}
      </div>
    );
  }

  // Pending request
  if (membershipStatus === "pending") {
    return (
      <div>
        <button onClick={onBack}>Back to Groups</button>
        <h2>Join Request Pending</h2>
        <p>
          Your request to join this group is pending approval from the owner.
        </p>
      </div>
    );
  }

  // Rejected
  if (membershipStatus === "rejected") {
    return (
      <div>
        <button onClick={onBack}>Back to Groups</button>
        <h2>Request Rejected</h2>
        <p>Your request to join this group was rejected.</p>
        <button onClick={handleJoinRequest} disabled={localLoading}>
          {localLoading ? "Loading..." : "Request Again"}
        </button>
        {localError && <div>{localError}</div>}
      </div>
    );
  }

  // Member or Owner - show full details
  if (!currentGroup) {
    return (
      <div>
        <button onClick={onBack}>Back to Groups</button>
        <div>Error loading group details</div>
        {(error || localError) && <div>{error || localError}</div>}
      </div>
    );
  }

  const isOwner = membershipStatus === "owner";

  return (
    <div className="group-detail-wrapper">
      <button onClick={onBack}>Back to Groups</button>

      <h2>{currentGroup.name}</h2>
      <p>{currentGroup.description || "No description"}</p>
      <small>Owner: {currentGroup.owner_username}</small>

      {/* Action buttons */}
      <div className="group-actions">
        {isOwner ? (
          <button onClick={handleDeleteGroup} disabled={localLoading}>
            {localLoading ? "Loading..." : "Delete Group"}
          </button>
        ) : (
          <button onClick={handleLeaveGroup} disabled={localLoading}>
            {localLoading ? "Loading..." : "Leave Group"}
          </button>
        )}
      </div>

      {/* Members List */}
      <div className="group-section-list">
        <h3>Members ({members.length})</h3>
        {members.length === 0 ? (
          <p>No members yet</p>
        ) : (
          <div>
            {members.map((member) => (
              <div key={member.id} className="group-list-item-detail">
                <div>
                  <strong>{member.username}</strong>
                  <br />
                  <small>{member.email}</small>
                </div>
                {isOwner && member.username !== user.username && (
                  <button
                    onClick={() =>
                      handleRemoveMember(member.idaccount, member.username)
                    }
                    disabled={localLoading}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Requests (Owner Only) */}
      {isOwner && (
        <div className="group-section-list">
          <h3>Pending Join Requests ({pendingRequests.length})</h3>
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <div>
              {pendingRequests.map((request) => (
                <div key={request.id} className="group-list-item-detail">
                  <div>
                    <strong>{request.username}</strong>
                    <br />
                    <small>{request.email}</small>
                    <br />
                    <small>
                      Requested:{" "}
                      {new Date(request.requested_at).toLocaleDateString()}
                    </small>
                  </div>
                  <div>
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      disabled={localLoading}
                      className="accept-button"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      disabled={localLoading}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {(error || localError) && (
        <div className="group-error-message">{error || localError}</div>
      )}
    </div>
  );
}

export default GroupDetail;