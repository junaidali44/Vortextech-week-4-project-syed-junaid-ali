import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faCalendarAlt, 
  faClock, 
  faFilm,
  faPlay,
  faHeart,
  faShare,
  faArrowLeft,
  faUser,
  faQuoteLeft,
  faThumbsUp,
  faChartBar,
  faLanguage,
  faMoneyBill,
  faTrophy,
  faUsers,
  faExternalLinkAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import { endpoints, getImageUrl, formatDate, formatRuntime, getRatingPercentage } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/Movies/MovieCard';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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

  useEffect(() => {
    // Check if movie is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
  }, [id]);

  if (movieLoading) return <LoadingSpinner />;
  if (movieError) return <div className="error-message">Error: {movieError}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  const posterUrl = getImageUrl(movie.poster_path, 'large', 'poster');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'large', 'backdrop');
  const rating = getRatingPercentage(movie.vote_average);
  
  const trailer = videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const teaser = videos?.results?.find(video => video.type === 'Teaser' && video.site === 'YouTube');
  const featuredVideo = trailer || teaser || videos?.results?.[0];
  
  const cast = credits?.cast?.slice(0, 12) || [];
  const crew = credits?.crew || [];
  const director = crew.find(person => person.job === 'Director');
  const writers = crew.filter(person => person.department === 'Writing');
  const producers = crew.filter(person => person.job === 'Producer');
  
  const similarMovies = similar?.results?.slice(0, 8) || [];

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push({ id: movie.id, title: movie.title, poster_path: movie.poster_path });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 80) return '#22c55e';
    if (rating >= 60) return '#eab308';
    if (rating >= 40) return '#f97316';
    return '#ef4444';
  };

  const getCertification = () => {
    const releaseDates = movie.release_dates?.results;
    if (!releaseDates) return 'NR';
    const usRelease = releaseDates.find(r => r.iso_3166_1 === 'US');
    if (!usRelease) return 'NR';
    const rating = usRelease.release_dates?.find(r => r.certification)?.certification;
    return rating || 'NR';
  };

  return (
    <div className="movie-detail-page">
      {/* Backdrop with Parallax Effect */}
      <div 
        className="movie-backdrop"
        style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none' }}
      >
        <div className="backdrop-overlay"></div>
        <div className="backdrop-gradient"></div>
      </div>

      <div className="container">
        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>

        <div className="movie-detail-content">
          {/* Poster Section */}
          <div className="movie-detail-poster">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} />
            ) : (
              <div className="poster-placeholder">
                <FontAwesomeIcon icon={faFilm} />
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="poster-actions">
              <button 
                className={`poster-action ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <button 
                className="poster-action"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: movie.title,
                      text: movie.overview,
                      url: window.location.href,
                    });
                  }
                }}
                title="Share"
              >
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>

            {/* Rating Badge */}
            {movie.vote_average > 0 && (
              <div 
                className="poster-rating"
                style={{ borderColor: getRatingColor(rating) }}
              >
                <div className="rating-circle" style={{ background: getRatingColor(rating) }}>
                  <span className="rating-number">{rating}%</span>
                </div>
                <div className="rating-details">
                  <span className="rating-label">User Score</span>
                  <span className="rating-votes">{movie.vote_count?.toLocaleString()} votes</span>
                </div>
              </div>
            )}

            {/* Certification Badge */}
            {getCertification() !== 'NR' && (
              <div className="certification-badge">
                {getCertification()}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="movie-detail-info">
            <div className="movie-header">
              <h1 className="movie-detail-title">{movie.title}</h1>
              {movie.original_title !== movie.title && (
                <p className="movie-original-title">{movie.original_title}</p>
              )}
            </div>

            {movie.tagline && (
              <p className="movie-tagline">
                <FontAwesomeIcon icon={faQuoteLeft} />
                {movie.tagline}
              </p>
            )}

            {/* Meta Info */}
            <div className="movie-meta-grid">
              <div className="meta-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div>
                  <span className="meta-label">Released</span>
                  <span className="meta-value">{formatDate(movie.release_date)}</span>
                </div>
              </div>
              {movie.runtime && (
                <div className="meta-item">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    <span className="meta-label">Runtime</span>
                    <span className="meta-value">{formatRuntime(movie.runtime)}</span>
                  </div>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="meta-item">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <div>
                    <span className="meta-label">Budget</span>
                    <span className="meta-value">${movie.budget.toLocaleString()}</span>
                  </div>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="meta-item">
                  <FontAwesomeIcon icon={faTrophy} />
                  <div>
                    <span className="meta-label">Revenue</span>
                    <span className="meta-value">${movie.revenue.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div className="movie-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
                onClick={() => setActiveTab('cast')}
              >
                <FontAwesomeIcon icon={faUsers} />
                Cast & Crew
              </button>
              <button 
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <FontAwesomeIcon icon={faChartBar} />
                Details
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="tab-panel overview-panel">
                  <div className="movie-overview">
                    <h3>Storyline</h3>
                    <p>{movie.overview || 'No overview available.'}</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="quick-stats">
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <span>{movie.vote_average?.toFixed(1)}/10</span>
                      <label>Average Rating</label>
                    </div>
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faUsers} />
                      <span>{movie.vote_count?.toLocaleString()}</span>
                      <label>Total Votes</label>
                    </div>
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faLanguage} />
                      <span>{movie.original_language?.toUpperCase()}</span>
                      <label>Language</label>
                    </div>
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faFilm} />
                      <span>{movie.production_companies?.length || 0}</span>
                      <label>Production</label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cast' && (
                <div className="tab-panel cast-panel">
                  {director && (
                    <div className="crew-highlight">
                      <h4>Director</h4>
                      <div className="crew-item">
                        <div className="crew-avatar">
                          {director.profile_path ? (
                            <img 
                              src={getImageUrl(director.profile_path, 'medium', 'profile')} 
                              alt={director.name}
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUser} />
                          )}
                        </div>
                        <div>
                          <span className="crew-name">{director.name}</span>
                          <span className="crew-role">Director</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {writers.length > 0 && (
                    <div className="crew-highlight">
                      <h4>Writers</h4>
                      <div className="crew-list">
                        {writers.slice(0, 3).map((writer) => (
                          <div key={writer.id} className="crew-item small">
                            <span className="crew-name">{writer.name}</span>
                            <span className="crew-role">Writer</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="cast-section">
                    <h4>Cast</h4>
                    <div className="cast-grid">
                      {cast.map((person) => (
                        <div key={person.id} className="cast-item">
                          {person.profile_path ? (
                            <img 
                              src={getImageUrl(person.profile_path, 'medium', 'profile')} 
                              alt={person.name}
                              className="cast-image"
                              loading="lazy"
                            />
                          ) : (
                            <div className="cast-image-placeholder">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                          )}
                          <p className="cast-name">{person.name}</p>
                          <p className="cast-character">{person.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="tab-panel details-panel">
                  <div className="details-grid">
                    {movie.status && (
                      <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className="detail-value">{movie.status}</span>
                      </div>
                    )}
                    {movie.original_language && (
                      <div className="detail-item">
                        <span className="detail-label">Original Language</span>
                        <span className="detail-value">{movie.original_language?.toUpperCase()}</span>
                      </div>
                    )}
                    {movie.production_companies?.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Production Companies</span>
                        <span className="detail-value">
                          {movie.production_companies.map(c => c.name).join(', ')}
                        </span>
                      </div>
                    )}
                    {movie.production_countries?.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Production Countries</span>
                        <span className="detail-value">
                          {movie.production_countries.map(c => c.name).join(', ')}
                        </span>
                      </div>
                    )}
                    {movie.spoken_languages?.length > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Spoken Languages</span>
                        <span className="detail-value">
                          {movie.spoken_languages.map(l => l.name).join(', ')}
                        </span>
                      </div>
                    )}
                    {movie.release_dates?.results && (
                      <div className="detail-item">
                        <span className="detail-label">Certification</span>
                        <span className="detail-value">{getCertification()}</span>
                      </div>
                    )}
                    {movie.budget > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Budget</span>
                        <span className="detail-value">${movie.budget.toLocaleString()}</span>
                      </div>
                    )}
                    {movie.revenue > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Revenue</span>
                        <span className="detail-value">${movie.revenue.toLocaleString()}</span>
                      </div>
                    )}
                    {movie.homepage && (
                      <div className="detail-item full">
                        <span className="detail-label">Website</span>
                        <a 
                          href={movie.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="detail-link"
                        >
                          {movie.homepage}
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="movie-actions">
              {featuredVideo && (
                <button 
                  className="action-btn primary"
                  onClick={() => setShowTrailer(true)}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  Watch Trailer
                </button>
              )}
              <button 
                className={`action-btn secondary ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
              >
                <FontAwesomeIcon icon={faHeart} />
                {isFavorite ? 'Saved' : 'Save to Favorites'}
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section (Full Width) */}
        {cast.length > 0 && activeTab !== 'cast' && (
          <section className="cast-section">
            <div className="cast-header">
              <h3 className="section-subtitle">Top Cast</h3>
              <button 
                className="view-all-btn"
                onClick={() => setActiveTab('cast')}
              >
                View All
                <FontAwesomeIcon icon={faArrowLeft} className="rotate-icon" />
              </button>
            </div>
            <div className="cast-grid">
              {cast.slice(0, 6).map((person) => (
                <div key={person.id} className="cast-item">
                  {person.profile_path ? (
                    <img 
                      src={getImageUrl(person.profile_path, 'medium', 'profile')} 
                      alt={person.name}
                      className="cast-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="cast-image-placeholder">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
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
            <h3 className="section-subtitle">You Might Also Like</h3>
            <div className="movie-grid">
              {similarMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && featuredVideo && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowTrailer(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="trailer-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideo.key}?autoplay=1`}
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