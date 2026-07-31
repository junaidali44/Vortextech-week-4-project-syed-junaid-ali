import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { endpoints } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/movies/MovieCard';
import './Movies.css';

const Movies = () => {
  const [category, setCategory] = useState('popular');
  const [page, setPage] = useState(1);

  const categoryMap = {
    popular: endpoints.popular,
    now_playing: endpoints.nowPlaying,
    top_rated: endpoints.topRated,
    upcoming: endpoints.upcoming,
  };

  const { data, loading, error } = useFetch(
    categoryMap[category],
    { page },
    [category, page]
  );

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && page === 1) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="movies-page">
      <div className="container">
        <div className="movies-header">
          <h2 className="section-title">
            Browse <span>Movies</span>
          </h2>
          <div className="category-filters">
            {['popular', 'now_playing', 'top_rated', 'upcoming'].map((cat) => (
              <button
                key={cat}
                className={`category-btn ${category === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;