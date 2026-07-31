import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, formatDate, getRatingPercentage } from '../../api/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path, 'medium', 'poster');
  const rating = getRatingPercentage(movie.vote_average);

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-image">
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={movie.title}
            loading="lazy"
            className="movie-poster"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <span>🎬</span>
          </div>
        )}
        <div className="movie-card-overlay">
          <span className="movie-card-rating">
            ⭐ {rating}%
          </span>
          <span className="movie-card-view">View Details →</span>
        </div>
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-date">
          {formatDate(movie.release_date)}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;