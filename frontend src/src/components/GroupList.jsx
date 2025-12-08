import { useEffect, useState } from "react";
import { useGroups } from "../contexts/GroupsContext";
import { useAuth } from "../contexts/AuthContext";
import "../css/GroupList.css";

function GroupList({ onGroupSelect, onCreateClick }) {
  const { groups, fetchGroups, loading, error } = useGroups();
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading && groups.length === 0) {
    return <div>Loading groups...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="group-list-header">
        <h2>Groups</h2>
        {user && (
          <button onClick={onCreateClick} className="create-group-button">
            {" "}
            Create New Group
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <p>No groups available. Create the first one!</p>
      ) : (
        <div>
          {groups.map((group) => (
            <div
              key={group.idgroup}
              className="group-list-item"
              onClick={() => onGroupSelect(group.idgroup)}
            >
              <h3>{group.name}</h3>
              <p>{group.description || "No description"}</p>
              <small>Owner: {group.owner_username}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupList;