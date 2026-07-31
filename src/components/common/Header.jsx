import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilm, 
  faSearch, 
  faHome, 
  faList, 
  faStar, 
  faInfoCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons'; // ✅ All from solid
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <FontAwesomeIcon icon={faFilm} className="logo-icon" />
          <span className="logo-text">Cine<span>Vault</span></span>
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
          <Link to="/movies" className="nav-link">
            <FontAwesomeIcon icon={faList} />
            <span>Movies</span>
          </Link>
          <Link to="/favorites" className="nav-link">
            <FontAwesomeIcon icon={faStar} />
            <span>Favorites</span>
          </Link>
          <Link to="/about" className="nav-link">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>About</span>
          </Link>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="search-clear"
              onClick={() => setSearchQuery('')}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;