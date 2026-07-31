
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilm, 
  faGithub, 
  faTwitter, 
  faLinkedin, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faHome, 
  faList, 
  faStar, 
  faInfoCircle,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FontAwesomeIcon icon={faFilm} className="footer-logo-icon" />
              <span className="footer-logo-text">Cine<span>Vault</span></span>
            </Link>
            <p className="footer-description">
              Your premium movie discovery platform. 
              Explore, discover, and save your favorite films.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav">
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies">
                  <FontAwesomeIcon icon={faList} />
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/favorites">
                  <FontAwesomeIcon icon={faStar} />
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-nav">
              <li><Link to="/movies?category=popular">Popular</Link></li>
              <li><Link to="/movies?category=now_playing">Now Playing</Link></li>
              <li><Link to="/movies?category=top_rated">Top Rated</Link></li>
              <li><Link to="/movies?category=upcoming">Upcoming</Link></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
            <p className="footer-credit">
              Made with <FontAwesomeIcon icon={faHeart} className="footer-heart" /> & ☕
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} CineVault. All rights reserved.
          </p>
          <p className="footer-powered">
            Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
              TMDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;