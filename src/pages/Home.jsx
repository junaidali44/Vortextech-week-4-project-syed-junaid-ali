import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faFilm, 
  faPlay, 
  faStar, 
  faClock,
  faFire,
  faTrophy,
  faChartLine,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import { endpoints, getImageUrl } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/Movies/MovieCard';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const slideTimer = useRef(null);
  
  const { data: trending, loading, error } = useFetch(endpoints.trending('week'));
  const { data: nowPlaying } = useFetch(endpoints.nowPlaying);
  const { data: topRated } = useFetch(endpoints.topRated);

  useEffect(() => {
    if (trending?.results) {
      setFeaturedMovies(trending.results.slice(0, 5));
    }
  }, [trending]);

  // Auto-slide with smooth transition
  useEffect(() => {
    if (featuredMovies.length > 0) {
      slideTimer.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(slideTimer.current);
  }, [featuredMovies.length]);

  const changeSlide = (newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900); // Match transition duration
  };

  const nextSlide = () => {
    if (featuredMovies.length === 0) return;
    const next = (currentSlide + 1) % featuredMovies.length;
    changeSlide(next);
  };

  const prevSlide = () => {
    if (featuredMovies.length === 0) return;
    const prev = (currentSlide - 1 + featuredMovies.length) % featuredMovies.length;
    changeSlide(prev);
  };

  // Reset timer on manual interaction
  const handleManualSlide = (newIndex) => {
    changeSlide(newIndex);
    clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  const movies = trending?.results?.slice(0, 12) || [];
  const topMovies = topRated?.results?.slice(0, 6) || [];
  const upcomingMovies = nowPlaying?.results?.slice(0, 6) || [];

  const featuredMovie = featuredMovies[currentSlide];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        {featuredMovie && (
          <div 
            className={`hero-slide ${isTransitioning ? 'animating' : ''}`}
            style={{
              backgroundImage: `url(${getImageUrl(featuredMovie.backdrop_path, 'large', 'backdrop')})`
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-gradient"></div>
            
            <div className="container hero-container">
              <div className="hero-content">
                <div className="hero-badge">
                  <FontAwesomeIcon icon={faFire} />
                  <span>Trending Now</span>
                </div>
                
                <h1 className="hero-title">
                  {featuredMovie.title}
                </h1>
                
                <div className="hero-meta">
                  <span className="hero-rating">
                    <FontAwesomeIcon icon={faStar} />
                    {featuredMovie.vote_average?.toFixed(1)}/10
                  </span>
                  <span className="hero-year">
                    {new Date(featuredMovie.release_date).getFullYear()}
                  </span>
                  <span className="hero-genres">
                    {featuredMovie.genre_ids?.slice(0, 3).map(id => {
                      const genreMap = {
                        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
                        80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
                        14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
                        9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
                        53: 'Thriller', 10752: 'War', 37: 'Western'
                      };
                      return genreMap[id];
                    }).filter(Boolean).join(' • ')}
                  </span>
                </div>
                
                <p className="hero-description">
                  {featuredMovie.overview?.slice(0, 180)}
                  {featuredMovie.overview?.length > 180 && '...'}
                </p>
                
                <div className="hero-actions">
                  <Link to={`/movie/${featuredMovie.id}`} className="hero-btn primary">
                    <FontAwesomeIcon icon={faPlay} />
                    Watch Now
                  </Link>
                  <Link to={`/movie/${featuredMovie.id}`} className="hero-btn secondary">
                    <FontAwesomeIcon icon={faArrowRight} />
                    More Info
                  </Link>
                </div>
              </div>
            </div>

            {/* Slide Controls */}
            <div className="slide-controls">
              <button 
                className="slide-btn" 
                onClick={prevSlide}
                disabled={isTransitioning}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div className="slide-indicators">
                {featuredMovies.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => handleManualSlide(index)}
                  />
                ))}
              </div>
              <button 
                className="slide-btn" 
                onClick={nextSlide}
                disabled={isTransitioning}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Quick Stats - Same as before */}
      <section className="quick-stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faFilm} />
              </div>
              <div className="stat-info">
                <span className="stat-number">{trending?.total_results?.toLocaleString() || '0'}</span>
                <span className="stat-label">Movies Available</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="stat-info">
                <span className="stat-number">4.5+</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="stat-info">
                <span className="stat-number">Top 100</span>
                <span className="stat-label">Trending Films</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <div className="stat-info">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* Trending Movies */}
      <section className="movies-section trending-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <div className="section-icon-wrapper">
                <FontAwesomeIcon icon={faFire} className="section-icon" />
              </div>
              <div>
                <h2 className="section-title">
                  Trending <span>This Week</span>
                </h2>
                <p className="section-subtitle">Most popular movies right now</p>
              </div>
            </div>
            <Link to="/movies" className="view-all-link">
              View All
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="movie-grid-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="movies-section top-rated-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <div className="section-icon-wrapper gold">
                <FontAwesomeIcon icon={faTrophy} className="section-icon" />
              </div>
              <div>
                <h2 className="section-title">
                  Top <span>Rated</span>
                </h2>
                <p className="section-subtitle">Critically acclaimed masterpieces</p>
              </div>
            </div>
            <Link to="/movies?category=top_rated" className="view-all-link">
              View All
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="movie-grid">
            {topMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="movie-grid-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Now Playing */}
      <section className="movies-section upcoming-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <div className="section-icon-wrapper purple">
                <FontAwesomeIcon icon={faClock} className="section-icon" />
              </div>
              <div>
                <h2 className="section-title">
                  Now <span>Playing</span>
                </h2>
                <p className="section-subtitle">Currently in theaters</p>
              </div>
            </div>
            <Link to="/movies?category=now_playing" className="view-all-link">
              View All
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="movie-grid">
            {upcomingMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="movie-grid-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Explore More?</h2>
              <p>Discover thousands of movies, create your watchlist, and never miss a great film.</p>
            </div>
            <Link to="/movies" className="cta-btn">
              Browse All Movies
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;