import MovieCard from "@/components/movie-card";

async function fetchPopularMovies() {
  const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR";
  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    Acept: "application/json",
  };

  type PopularMovies = {
    page: number;
    results: Array<{
      adult: boolean;
      backdrop_path: string;
      genre_ids: Array<number>;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }>;
    total_pages: number;
    total_results: number;
  };

  const response = await fetch(url, { headers });
  const data: PopularMovies = await response.json();

  return data.results;
}

export default async function Dashboard() {
  const popularMovies = await fetchPopularMovies();

  return (
    <>
      <h1 className="text-3xl font-semibold text-foreground" id="popular">
        Filmes Populares No Momento 🔥
      </h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  );
}
