import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faArrowRight, 
  faCalendarAlt,
  faClock,
  faHeart,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import { getImageUrl, formatDate, getRatingPercentage, formatRuntime } from '../../api/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = getImageUrl(movie.poster_path, 'medium', 'poster');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'medium', 'backdrop');
  const rating = getRatingPercentage(movie.vote_average);
  const isFavorite = false; // Will be connected to favorites context

  const getRatingColor = (rating) => {
    if (rating >= 80) return '#22c55e';
    if (rating >= 60) return '#eab308';
    if (rating >= 40) return '#f97316';
    return '#ef4444';
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/movie/${movie.id}`} className="movie-card-list">
        <div className="movie-card-list-image">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} loading="lazy" />
          ) : (
            <div className="poster-placeholder">
              <FontAwesomeIcon icon={faStar} />
            </div>
          )}
        </div>
        <div className="movie-card-list-content">
          <h3 className="movie-card-list-title">{movie.title}</h3>
          <div className="movie-card-list-meta">
            <span className="meta-rating">
              <FontAwesomeIcon icon={faStar} className="star-icon" />
              {rating}%
            </span>
            {movie.release_date && (
              <span className="meta-date">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {formatDate(movie.release_date)}
              </span>
            )}
            {movie.vote_count && (
              <span className="meta-votes">
                <FontAwesomeIcon icon={faClock} />
                {movie.vote_count.toLocaleString()} votes
              </span>
            )}
          </div>
          <p className="movie-card-list-overview">
            {movie.overview?.slice(0, 180) || 'No overview available.'}
            {movie.overview?.length > 180 && '...'}
          </p>
          <div className="movie-card-list-actions">
            <span className="view-details">
              View Details
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-card-image">
        {posterUrl ? (
          <>
            <img 
              src={posterUrl} 
              alt={movie.title}
              loading="lazy"
              className="movie-poster"
            />
            {backdropUrl && isHovered && (
              <div className="movie-card-backdrop">
                <img src={backdropUrl} alt="" loading="lazy" />
              </div>
            )}
          </>
        ) : (
          <div className="movie-poster-placeholder">
            <FontAwesomeIcon icon={faStar} />
          </div>
        )}
        
        <div className="movie-card-overlay">
          <div className="movie-card-rating" style={{ background: getRatingColor(rating) }}>
            <FontAwesomeIcon icon={faStar} className="star-icon" />
            <span>{rating}%</span>
          </div>
          
          <div className="movie-card-actions">
            <button 
              className="action-btn favorite-btn"
              onClick={(e) => {
                e.preventDefault();
                // Toggle favorite
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button 
              className="action-btn play-btn"
              onClick={(e) => {
                e.preventDefault();
                // Play trailer
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>

          <span className="movie-card-view">
            View Details
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>

        {movie.vote_count > 1000 && (
          <div className="movie-card-badge">
            <FontAwesomeIcon icon={faStar} />
            Popular
          </div>
        )}
      </div>

      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-footer">
          <p className="movie-card-date">
            <FontAwesomeIcon icon={faCalendarAlt} />
            {formatDate(movie.release_date)}
          </p>
          {movie.vote_average > 0 && (
            <div className="movie-card-rating-mini">
              <FontAwesomeIcon icon={faStar} className="star-icon-mini" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;