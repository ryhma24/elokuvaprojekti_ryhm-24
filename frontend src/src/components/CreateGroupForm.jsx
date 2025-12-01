import { useState } from "react";
import { useGroups } from "../contexts/GroupsContext.jsx";

function CreateGroupForm({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createGroup } = useGroups();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createGroup(name, description);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create Group"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default CreateGroupForm;