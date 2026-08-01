import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">
            About <span>CineVault</span>
          </h2>
          
          <div className="about-card">
            <div className="about-icon">🎬</div>
            <h3>Your Premium Movie Discovery Platform</h3>
            <p>
              CineVault is a modern movie discovery application built with React,
              powered by The Movie Database (TMDB) API. Find trending movies,
              explore genres, and build your personal watchlist.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-feature">
              <span className="feature-icon">🚀</span>
              <h4>Real-time Data</h4>
              <p>Live movie data from TMDB API with automatic updates</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">🎨</span>
              <h4>Premium Design</h4>
              <p>Dark coffee theme with boxy, modern aesthetics</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">⚡</span>
              <h4>Fast & Responsive</h4>
              <p>Optimized for all devices with smooth performance</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">⭐</span>
              <h4>Favorites System</h4>
              <p>Save your favorite movies locally</p>
            </div>
          </div>

          <div className="about-tech">
            <h4>Built With</h4>
            <div className="tech-tags">
              <span className="tech-tag">React</span>
              <span className="tech-tag">React Router</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">Axios</span>
              <span className="tech-tag">TMDB API</span>
              <span className="tech-tag">CSS Modules</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;