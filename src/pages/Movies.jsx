import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, 
  faClock, 
  faStar, 
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import { endpoints } from '../api/tmdb';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MovieCard from '../components/movies/MovieCard';
import './Movies.css';

const Movies = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'popular';
  
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categoryMap = {
    popular: { endpoint: endpoints.popular, label: 'Popular', icon: faFire },
    now_playing: { endpoint: endpoints.nowPlaying, label: 'Now Playing', icon: faClock },
    top_rated: { endpoint: endpoints.topRated, label: 'Top Rated', icon: faStar },
    upcoming: { endpoint: endpoints.upcoming, label: 'Upcoming', icon: faCalendarAlt },
  };

  const currentCategory = categoryMap[category] || categoryMap.popular;
  const { data, loading, error } = useFetch(
    currentCategory.endpoint,
    { page },
    [category, page]
  );

  const movies = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 500);

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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading && page === 1) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="movies-page">
      <div className="container">
        {/* Header Section */}
        <div className="movies-header">
          <div className="movies-header-left">
            <h2 className="section-title">
              <FontAwesomeIcon icon={currentCategory.icon} className="section-icon" />
              <span>{currentCategory.label}</span>
              <span className="movies-count">{data?.total_results?.toLocaleString() || 0} films</span>
            </h2>
          </div>
          <div className="movies-header-right">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <rect x="3" y="4" width="18" height="4" rx="1"/>
                  <rect x="3" y="12" width="18" height="4" rx="1"/>
                  <rect x="3" y="20" width="18" height="4" rx="1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {Object.entries(categoryMap).map(([key, value]) => (
            <button
              key={key}
              className={`category-btn ${category === key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              <FontAwesomeIcon icon={value.icon} />
              <span>{value.label}</span>
            </button>
          ))}
        </div>

        {/* Movie Grid/List */}
        <div className={`movie-container ${viewMode}`}>
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="movie-item-wrapper"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <MovieCard movie={movie} viewMode={viewMode} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn prev"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              Previous
            </button>
            
            <div className="pagination-pages">
              {page > 3 && (
                <>
                  <button className="page-btn" onClick={() => handlePageChange(1)}>1</button>
                  <span className="page-ellipsis">…</span>
                </>
              )}
              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  className={`page-btn ${num === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              ))}
              {page < totalPages - 2 && (
                <>
                  <span className="page-ellipsis">…</span>
                  <button className="page-btn" onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              className="pagination-btn next"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;