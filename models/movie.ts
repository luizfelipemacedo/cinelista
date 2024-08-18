import { MovieDetails, MoviesResponse, VideosResponse } from "@/types/movie";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_API_KEY;

export const movie = Object.freeze({
  getPopularMovies,
  getMoviesByQuery,
  getMovieDetailsById,
  getSimilarMoviesById,
  getTopRatedMovies,
  getMovieTrailerById,
});

async function getPopularMovies() {
  const url = `${apiBaseUrl}/movie/popular?language=pt-BR`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Acept: "application/json",
  };

  const response = await fetch(url, { headers });
  const popularMovies = await response.json() as MoviesResponse;

  return popularMovies.results.map((movie) => {
    const release_year = getMovieRealeaseYear(movie.release_date);
    const rating = getMovieRating(movie.vote_average);

    return {
      ...movie,
      release_year,
      rating,
    };
  });
}

async function getMovieTrailerById(movieId: string) {
  const url = `${apiBaseUrl}/movie/${movieId}/videos?language=pt-BR`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Acept: "application/json",
  };

  const response = await fetch(url, { headers });
  const movieVideos = await response.json() as VideosResponse;

  const videosFromYoutube = movieVideos.results.filter((video) => video.site === "YouTube");
  const [firstVideo] = videosFromYoutube;

  if (!firstVideo) return null;

  const youTubeBaseUrl = "https://www.youtube.com/embed/";
  return `${youTubeBaseUrl}${firstVideo.key}`;
}

async function getMovieDetailsById(movieId: string) {
  const url = `${apiBaseUrl}/movie/${movieId}?language=pt-BR`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Acept: "application/json",
  };

  const response = await fetch(url, { headers });
  const movieDetails = await response.json() as MovieDetails;

  const release_year = getMovieRealeaseYear(movieDetails.release_date);
  const runtime = runtimeToHoursAndMinutes(movieDetails.runtime);
  const rating = getMovieRating(movieDetails.vote_average);

  return {
    ...movieDetails,
    runtime,
    release_year,
    rating,
  };
}

async function getSimilarMoviesById(movieId: string) {
  const url = `${apiBaseUrl}/movie/${movieId}/similar?language=pt-BR`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Acept: "application/json",
  };

  const response = await fetch(url, { headers });
  const similarMovies = await response.json() as MoviesResponse;

  return similarMovies.results.map((movie) => {
    const release_year = getMovieRealeaseYear(movie.release_date);
    const rating = getMovieRating(movie.vote_average);

    return {
      ...movie,
      release_year,
      rating,
    };
  });
}

async function getMoviesByQuery(query: string) {
  const url = `${apiBaseUrl}/search/movie?language=pt-BR&query=${query}`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Acept: "application/json",
  };

  const response = await fetch(url, { headers });
  const foundMovies = await response.json() as MoviesResponse;

  return foundMovies.results.map((movie) => {
    const release_year = getMovieRealeaseYear(movie.release_date);
    const rating = getMovieRating(movie.vote_average);

    return {
      ...movie,
      release_year,
      rating,
    };
  });
}

async function getTopRatedMovies() {
  const url = `${apiBaseUrl}/movie/top_rated?language=pt-BR`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Acept: "application/json",
  };

  const response = await fetch(url, { headers });
  const topRatedMovies = await response.json() as MoviesResponse;

  return topRatedMovies.results.map((movie) => {
    const release_year = getMovieRealeaseYear(movie.release_date);
    const rating = getMovieRating(movie.vote_average);

    return {
      ...movie,
      release_year,
      rating,
    };
  });
}

function getMovieRealeaseYear(releaseDate: string) {
  const [year] = releaseDate.split("-");
  return year;
}

function getMovieRating(rating: number) {
  return rating.toFixed(1);
}

function runtimeToHoursAndMinutes(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h${minutes}m`;
}