import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const imageSizes = {
  poster: {
    small: `${IMAGE_URL}/w185`,
    medium: `${IMAGE_URL}/w342`,
    large: `${IMAGE_URL}/w500`,
    original: `${IMAGE_URL}/original`,
  },
  backdrop: {
    small: `${IMAGE_URL}/w300`,
    medium: `${IMAGE_URL}/w780`,
    large: `${IMAGE_URL}/w1280`,
    original: `${IMAGE_URL}/original`,
  },
  profile: {
    small: `${IMAGE_URL}/w45`,
    medium: `${IMAGE_URL}/w185`,
    large: `${IMAGE_URL}/h632`,
  },
};

// API Endpoints
export const endpoints = {
  trending: (time = 'week') => `/trending/movie/${time}`,
  nowPlaying: '/movie/now_playing',
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  movieDetails: (id) => `/movie/${id}`,
  movieCredits: (id) => `/movie/${id}/credits`,
  movieVideos: (id) => `/movie/${id}/videos`,
  similarMovies: (id) => `/movie/${id}/similar`,
  search: '/search/movie',
  genres: '/genre/movie/list',
};

// Helper functions
export const getImageUrl = (path, size = 'medium', type = 'poster') => {
  if (!path) return null;
  const baseUrl = imageSizes[type]?.[size] || imageSizes.poster.medium;
  return `${baseUrl}${path}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const getRatingPercentage = (rating) => {
  return Math.round((rating / 10) * 100);
};