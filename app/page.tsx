import { movie } from "@/models/movie";
import MovieCard from "@/components/movie-card";

export default async function Dashboard() {
  const { getPopularMovies } = movie;
  const popularMovies = await getPopularMovies();

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
