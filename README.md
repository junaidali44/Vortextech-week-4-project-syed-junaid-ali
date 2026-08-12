# 🎬 SilverScreen - Movie Discovery App

> **VortexTech Web Development Internship - Week 4 Project**  
> *React App with Live API Integration*

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=flat&logo=vite)
![TMDB](https://img.shields.io/badge/TMDB-API-01D277?style=flat&logo=themoviedatabase)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)

---

## 📋 Project Overview

SilverScreen is a movie discovery web application built with React. It allows users to browse trending movies, search for their favorite films, and view detailed information about each movie. The app fetches live data from The Movie Database (TMDB) API.

This is the final project for Week 4 of the VortexTech Web Development Internship Program.

### 🎯 Project Requirements Met

- ✅ React with React Router (6+ pages/routes)
- ✅ Live data from TMDB API using Axios
- ✅ Loading indicators while fetching data
- ✅ Error messages for failed requests
- ✅ Clean, organized layout (cards/grid)
- ✅ Deployed live on Vercel

---

## 🌐 Live Demo

**🔗 View Live:** [https://SilverScreen.netlify.app/]

---

## ✨ Features

### Core Features
- **Browse Movies** - View trending, popular, top rated, and upcoming movies
- **Search Movies** - Search for any movie by title
- **Movie Details** - View complete information about any movie
- **Favorites** - Save your favorite movies (saved in your browser)
- **Watch Trailers** - Watch movie trailers directly in the app

### Pages/Routes
1. **Home Page** (`/`) - Trending movies with hero section
2. **Movies Page** (`/movies`) - Browse all movies with filters
3. **Movie Detail** (`/movie/:id`) - Complete movie information
4. **Search Page** (`/search`) - Search results
5. **Favorites Page** (`/favorites`) - Your saved movies
6. **About Page** (`/about`) - Project information

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React* | Frontend framework |
| **React Router** | Navigation between pages |
| **Vite** | Build tool |
| **Axios** | Fetch data from API |
| **Font Awesome** | Icons |
| **CSS Modules** | Styling |
| **Vercel** | Hosting/Deployment |

---

## 📁 Project Structure
SilverScreen/
├── src/
│ ├── api/
│ │ └── tmdb.js # API configuration
│ ├── components/
│ │ ├── common/
│ │ │ ├── Header.jsx # Navigation
│ │ │ ├── Footer.jsx # Footer
│ │ │ └── LoadingSpinner.jsx # Loading indicator
│ │ └── movies/
│ │ └── MovieCard.jsx # Movie card component
│ ├── hooks/
│ │ ├── useFetch.js # Custom fetch hook
│ │ └── useDebounce.js # Search debounce
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Movies.jsx
│ │ ├── MovieDetail.jsx
│ │ ├── Search.jsx
│ │ ├── Favorites.jsx
│ │ └── About.jsx
│ ├── styles/
│ │ ├── globals.css
│ │ └── variables.css
│ ├── App.jsx
│ └── main.jsx
├── .env # Environment variables
├── package.json
└── README.md

text

---

## 💻 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/vortextech-webdev-week4.git
cd vortextech-webdev-week4
Step 2: Install Dependencies
bash
npm install
Step 3: Get TMDB API Key
Go to TMDB and create an account

Go to Settings → API

Request an API key (takes 2 minutes)

Step 4: Create .env File
Create a .env file in the root directory:

env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
Step 5: Run the App
bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
🔌 API Information
This project uses The Movie Database (TMDB) API v3.

Endpoints Used
/trending/movie/week - Weekly trending movies

/movie/popular - Popular movies

/movie/now_playing - Currently playing

/movie/top_rated - Top rated movies

/movie/upcoming - Upcoming movies

/movie/{id} - Movie details

/movie/{id}/credits - Cast and crew

/movie/{id}/videos - Trailers

/movie/{id}/similar - Similar movies

/search/movie - Search movies

What I Learned
During this project, I learned:

React Router - Creating multi-page applications

API Integration - Fetching and displaying live data

State Management - Using useState and useEffect hooks

Custom Hooks - Creating reusable logic

Error Handling - Managing API errors gracefully

Loading States - Showing spinners while data loads

Responsive Design - Making apps work on all devices

Deployment - Hosting on Vercel/Netlify

⚠️ Challenges Faced
1. API Key Management
Issue: Keeping API key secure in production
Solution: Used environment variables with .env file

2. Loading States
Issue: Users seeing empty screen while data loads
Solution: Added loading spinner component

3. Search Debouncing
Issue: Too many API calls while typing
Solution: Implemented custom useDebounce hook

4. Responsive Design
Issue: Layout breaking on mobile devices
Solution: Used CSS Grid and media queries

🔮 Future Improvements
□ Add user authentication
□ Add movie reviews
□ Add dark/light theme toggle
□ Implement infinite scrolling
□ Add watchlist feature
□ Add movie recommendations
🙏 Acknowledgments
Vortex Technologies - For this internship opportunity

TMDB - For providing the free movie API

React Community - For excellent documentation

📧 Contact
Developer: Syed Junaid Ali
GitHub: @junaidali44

📄 License
This project is for educational purposes as part of the VortexTech Internship Program.

