import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { endpoints, getImageUrl, formatDate, formatRuntime, getRatingPercentage } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/movies/MovieCard';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  
  const { data: movie, loading: movieLoading, error: movieError } = useFetch(
    endpoints.movieDetails(id)
  );
  
  const { data: credits, loading: creditsLoading } = useFetch(
    endpoints.movieCredits(id)
  );
  
  const { data: videos, loading: videosLoading } = useFetch(
    endpoints.movieVideos(id)
  );
  
  const { data: similar, loading: similarLoading } = useFetch(
    endpoints.similarMovies(id)
  );

  if (movieLoading) return <LoadingSpinner />;
  if (movieError) return <div className="error-message">Error: {movieError}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  const posterUrl = getImageUrl(movie.poster_path, 'large', 'poster');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'large', 'backdrop');
  const rating = getRatingPercentage(movie.vote_average);
  
  const trailer = videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const cast = credits?.cast?.slice(0, 12) || [];
  const similarMovies = similar?.results?.slice(0, 8) || [];

  return (
    <div className="movie-detail-page">
      {/* Backdrop */}
      <div 
        className="movie-backdrop"
        style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none' }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="container">
        <div className="movie-detail-content">
          {/* Poster */}
          <div className="movie-detail-poster">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} />
            ) : (
              <div className="poster-placeholder">🎬</div>
            )}
          </div>

          {/* Info */}
          <div className="movie-detail-info">
            <h1 className="movie-detail-title">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-meta">
              <span className="meta-item">
                <span className="meta-label">⭐</span> {rating}%
              </span>
              <span className="meta-item">
                <span className="meta-label">📅</span> {formatDate(movie.release_date)}
              </span>
              {movie.runtime && (
                <span className="meta-item">
                  <span className="meta-label">⏱️</span> {formatRuntime(movie.runtime)}
                </span>
              )}
            </div>

            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>

            <div className="movie-actions">
              {trailer && (
                <button 
                  className="action-btn primary"
                  onClick={() => setShowTrailer(true)}
                >
                  ▶ Watch Trailer
                </button>
              )}
              <button className="action-btn secondary">
                ⭐ Add to Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="cast-section">
            <h3 className="section-subtitle">Cast</h3>
            <div className="cast-grid">
              {cast.map((person) => (
                <div key={person.id} className="cast-item">
                  {person.profile_path ? (
                    <img 
                      src={getImageUrl(person.profile_path, 'medium', 'profile')} 
                      alt={person.name}
                      className="cast-image"
                    />
                  ) : (
                    <div className="cast-image-placeholder">👤</div>
                  )}
                  <p className="cast-name">{person.name}</p>
                  <p className="cast-character">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="similar-section">
            <h3 className="section-subtitle">Similar Movies</h3>
            <div className="movie-grid">
              {similarMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>
            <div className="trailer-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="trailer-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;