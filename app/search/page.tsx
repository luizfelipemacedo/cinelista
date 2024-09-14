import { movie } from "@/models/movie";
import MovieCard from "@/components/movie-card";

type Props = {
  searchParams: {
    query: string;
  };
};

export default async function Search({ searchParams }: Props) {
  const { query } = searchParams;
  const { getMoviesByQuery } = movie;

  const foundMovies = await getMoviesByQuery(query);

  return (
    <>
      <h1 className="text-3xl font-semibold text-foreground">
        {`Resultados para "${query}"`}
      </h1>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        {foundMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  );
}
