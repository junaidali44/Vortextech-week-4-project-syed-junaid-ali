import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import { endpoints } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/Movies/MovieCard';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  const { data, loading, error } = useFetch(
    debouncedQuery ? endpoints.search : null,
    { query: debouncedQuery },
    [debouncedQuery]
  );

  const movies = data?.results || [];
  const totalResults = data?.total_results || 0;

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h2 className="section-title">
            Search <span>Movies</span>
          </h2>
          <div className="search-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="search-input-large"
              autoFocus
            />
            {query && (
              <button 
                className="clear-search"
                onClick={() => setQuery('')}
              >
                ✕
              </button>
            )}
          </div>
          {debouncedQuery && (
            <p className="search-results-count">
              Found {totalResults} results for "{debouncedQuery}"
            </p>
          )}
        </div>

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-message">Error: {error}</div>
        )}

        {!loading && !error && debouncedQuery && movies.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No movies found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!debouncedQuery && !loading && !error && (
          <div className="search-prompt">
            <span className="search-prompt-icon">🎬</span>
            <h3>Start typing to search</h3>
            <p>Find your favorite movies</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;