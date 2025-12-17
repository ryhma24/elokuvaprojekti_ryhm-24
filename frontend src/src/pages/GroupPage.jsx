import { useState } from "react";
import NavBar from "../components/NavBar";
import GroupList from "../components/GroupList";
import GroupDetail from "../components/GroupDetail";
import CreateGroupForm from "../components/CreateGroupForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/registerForm";
import React from 'react'
import { FaRectangleXmark } from 'react-icons/fa6'
import { GroupSearchBar } from "../components/GroupSearchBar";
import { GroupSearchResults } from "../components/SearchResultslist";
import { useGroups } from "../contexts/GroupsContext";
import { useEffect } from "react";

  function GroupPage() {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [results, setResults] = useState([]);
    const { selectedMovies } = useGroups();

    useEffect(() => {
    if (selectedMovies) {
      console.log("moviedata:", selectedMovies);
      }
    }, [selectedMovies]);

    const handleGroupSelect = (groupId) => {
      setSelectedGroupId(groupId);
    };

    const handleBackToList = () => {
      setSelectedGroupId(null);
    };

    const handleCreateGroupClose = () => {
      setShowCreateGroup(false);
    };

    const handleRemoveMovie = (idmovie) => {
      alert("clicked")
    }

  return (
    <div>
      <NavBar/>
      {/* 1. Render the Create Group Form  */}
      {showCreateGroup && <CreateGroupForm onClose={handleCreateGroupClose} />}

      {/* 2. Conditional Rendering for List or Detail View */}
      <div className="groups-content-area">
        {selectedGroupId ? (
          // IF selectedGroupId is set, render the Detail Component
          <div>
            <div>
              <GroupDetail groupId={selectedGroupId} onBack={handleBackToList} />
              <div className="group-search-bar-container">
                <GroupSearchBar setResults={setResults} />
                <GroupSearchResults results={results} />
              </div>
            </div>
        <div className="group-right-side">
              <div className="addedTitles">
                <h3>Added Movies</h3>
                  {selectedMovies.length === 0 ? (
                    <p>No movies added yet</p>
                  ) : (
                    selectedMovies.map(movie => (
                      <div key={movie.id} className="movie-card">
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveMovie(movie.id)}
                          >
                          <FaRectangleXmark id='fa-xmark' style={{ color: "#c01919ff" }}/>
                        </button>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                          alt={movie.title}
                        />
                        <div>
                          <strong>{movie.title}</strong>
                          <small>{movie.year}</small>
                          <small>{movie.type}</small>
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>
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