import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const REACT_APP_API_URL = "http://localhost:3001";

const GroupsContext = createContext(null);

export function GroupsProvider({ children }) {
  const { accessToken, user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get all groups (public)
  const fetchGroups = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${REACT_APP_API_URL}/groups`, {
        method: "GET",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to fetch groups");
      }
      const data = await res.json();
      setGroups(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get single group (requires auth and membership)
  const fetchGroup = async (groupId) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${REACT_APP_API_URL}/groups/${groupId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();

        if (res.status === 403) {
          return {
            status: 403,
            error: errorData.error,
            groupName: errorData.groupName,
          };
        }

        throw new Error(
          errorData.error || "Failed to fetch group with status " + res.status
        );
      }
      const data = await res.json();
      setCurrentGroup(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (name, description) => {
    console.log(user)
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${REACT_APP_API_URL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create group");
      }
      const data = await res.json();
      setGroups([...groups, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete group (owner only)
  const deleteGroup = async (groupId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${REACT_APP_API_URL}/groups/${groupId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete group");
      }
      setGroups(groups.filter((g) => g.idgroup !== groupId));
      setCurrentGroup(null);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Request to join group
  const requestJoinGroup = async (groupId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/group-members/${groupId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to request join");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get membership status
  const getMembershipStatus = async (groupId) => {
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/group-members/${groupId}/status`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to get status");
      }
      const data = await res.json();
      return data.status;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  // Get group members
  const getGroupMembers = async (groupId) => {
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/group-members/${groupId}/members`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to get members");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };

  // Get pending requests (owner only)
  const getPendingRequests = async (groupId) => {
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/group-members/${groupId}/pending`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to get pending requests");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };

  // Respond to join request (accept/reject)
  const respondToRequest = async (groupId, requestId, status) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/group-members/${groupId}/requests/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to respond to request");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove member or leave group
  const removeMember = async (groupId, memberId) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/group-members/${groupId}/members/${memberId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to remove member");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    groups,
    currentGroup,
    loading,
    error,
    fetchGroups,
    fetchGroup,
    createGroup,
    deleteGroup,
    requestJoinGroup,
    getMembershipStatus,
    getGroupMembers,
    getPendingRequests,
    respondToRequest,
    removeMember,
    setCurrentGroup,
    setError,
  };

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
}

export function useGroups() {
  return useContext(GroupsContext);
}