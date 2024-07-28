import MovieCard from "@/components/movie-card";

type Props = {
  searchParams: {
    query: string;
  };
};

export default async function Search({ searchParams }: Props) {
  const { query } = searchParams;

  async function getMoviesByQuery(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?language=pt-BR&query=${query}`;
    const headers = {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      Acept: "application/json",
    };

    const response = await fetch(url, { headers });
    const data = await response.json();

    return data.results;
  }

  const movies = await getMoviesByQuery(query);

  return (
    <>
      <h1 className="text-3xl font-semibold text-foreground">
        {`Resultados para "${query}"`}
      </h1>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  );
}
