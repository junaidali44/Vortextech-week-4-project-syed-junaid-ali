import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  const removeFavorite = (movieId) => {
    const updated = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="empty-favorites">
            <span className="empty-icon">⭐</span>
            <h2>No favorites yet</h2>
            <p>Start adding movies to your favorites list</p>
            <Link to="/movies" className="browse-btn">
              Browse Movies →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h2 className="section-title">
            Your <span>Favorites</span>
          </h2>
          <p className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-item-wrapper">
              <MovieCard movie={movie} />
              <button 
                className="remove-favorite"
                onClick={() => removeFavorite(movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;