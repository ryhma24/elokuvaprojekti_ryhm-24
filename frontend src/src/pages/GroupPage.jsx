import { useState } from "react";
import GroupList from "../components/GroupList";
import GroupDetail from "../components/GroupDetail";
import CreateGroupForm from "../components/CreateGroupForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/registerForm";

function GroupPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleBackToList = () => {
    setSelectedGroupId(null);
  };

  const handleCreateGroupClose = () => {
    setShowCreateGroup(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 1. Render the Create Group Form  */}
      {showCreateGroup && <CreateGroupForm onClose={handleCreateGroupClose} />}

      {/* 2. Conditional Rendering for List or Detail View */}
      <div className="groups-content-area">
        {selectedGroupId ? (
          // IF selectedGroupId is set, render the Detail Component
          <GroupDetail groupId={selectedGroupId} onBack={handleBackToList} />
        ) : (
          // ELSE (List View), render the GroupList
          <GroupList
            onGroupSelect={handleGroupSelect} // Clicks group -> sets selectedGroupId
            onCreateClick={() => setShowCreateGroup(true)} // Clicks button -> opens form
          />
        )}
      </div>
    </div>
  );
}

export default GroupPage;