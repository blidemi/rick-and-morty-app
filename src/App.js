import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './redux/charactersSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const { characters, status, error } = useSelector((state) => state.characters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="loading">Loading...</div>;
  if (status === 'failed') return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <div className="characters-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-info">
              <h2 className="character-name">{character.name}</h2>
              <p className="character-status">
                <span
                  className={`status-indicator ${
                    character.status.toLowerCase()
                  }`}></span>
                {character.status} - {character.species}
              </p>
              <p className="character-location">
                <strong>Last known location:</strong> {character.location.name}
              </p>
              <p className="character-origin">
                <strong>First seen in:</strong> {character.origin.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
