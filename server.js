/**
 * Midterm API Project - COMP229 Summer 2025
 * 
 * Challenge: Implement the API logic for managing a collection of movies!
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

let movies = [
  { title: "Inception", genre: "Sci-Fi", year: 2010, director: "Christopher Nolan" },
  { title: "The Matrix", genre: "Action", year: 1999, director: "The Wachowskis" },
  { title: "Titanic", genre: "Romance", year: 1997, director: "James Cameron" },
  { title: "The Godfather", genre: "Crime", year: 1972, director: "Francis Ford Coppola" },
  { title: "The Dark Knight", genre: "Action", year: 2008, director: "Christopher Nolan" },

  // ✅ Your 2 personalized animated movies
  { title: "Spider-Man: Into the Spider-Verse", genre: "Animation", year: 2018, director: "Bob Persichetti, Peter Ramsey, Rodney Rothman" },
  { title: "Toy Story 3", genre: "Animation", year: 2010, director: "Lee Unkrich" }
];

// Set the port for the server
const PORT = 3000;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/movies - Get all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// GET /api/movies/filter?genre=[genre name] - Filter movies by genre
app.get('/api/movies/filter', (req, res) => {
  const genreQuery = req.query.genre;
  if (!genreQuery) {
    return res.status(400).json({ error: 'Genre query parameter is required' });
  }

  const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genreQuery.toLowerCase());
  res.json(filteredMovies);
});

// GET /api/movies/:id - Get a movie by its index (ID)
app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 0 || id >= movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movies[id]);
});

// POST /api/movies - Add a new movie
app.post('/api/movies', (req, res) => {
  const { title, genre, year, director } = req.body;

  if (!title || !genre || !year || !director) {
    return res.status(400).json({ error: 'Please provide title, genre, year, and director' });
  }

  const newMovie = { title, genre, year, director };
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

// PUT /api/movies/:id - Update a movie by its index
app.put('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 0 || id >= movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const { title, genre, year, director } = req.body;

  if (!title || !genre || !year || !director) {
    return res.status(400).json({ error: 'Please provide title, genre, year, and director' });
  }

  movies[id] = { title, genre, year, director };

  res.json(movies[id]);
});

// DELETE /api/movies/:id - Remove a movie by its index
app.delete('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 0 || id >= movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const removedMovie = movies.splice(id, 1)[0];

  res.json({ message: 'Movie deleted', movie: removedMovie });
});

// NEW: GET /api/mymovies - Return only your 2 personalized movies
app.get('/api/mymovies', (req, res) => {
  const myMovies = [
    {
      title: "Spider-Man: Into the Spider-Verse",
      genre: "Animation",
      year: 2018,
      director: "Bob Persichetti, Peter Ramsey, Rodney Rothman"
    },
    {
      title: "Toy Story 3",
      genre: "Animation",
      year: 2010,
      director: "Lee Unkrich"
    }
  ];
  res.json(myMovies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
