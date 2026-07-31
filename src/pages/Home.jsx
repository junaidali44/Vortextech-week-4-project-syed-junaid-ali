import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { endpoints } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/movies/MovieCard';
import './Home.css';

const Home = () => {
  const { data: trending, loading, error } = useFetch(endpoints.trending('week'));

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  const movies = trending?.results?.slice(0, 12) || [];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover <span>Cinematic</span> Excellence
            </h1>
            <p className="hero-subtitle">
              Explore the world of movies with CineVault. Find trending films, 
              hidden gems, and all-time classics.
            </p>
            <Link to="/movies" className="hero-btn">
              Explore Movies →
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="trending-section">
        <div className="container">
          <h2 className="section-title">
            Trending <span>This Week</span>
          </h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;