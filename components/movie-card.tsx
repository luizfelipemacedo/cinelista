import Image from "next/image";
import Link from "next/link";

type Movie = {
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
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [releaseYear] = movie.release_date.split("-");
  const rating = movie.vote_average.toFixed(1);
  const { id } = movie;

  return (
    <Link href={`/movie/${id}`}>
      <section className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform "
        />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{`${movie.title} (${releaseYear})`}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{`${rating}`}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-3">
            {movie.overview ?? "Sem descrição disponível."}
          </p>
        </div>
      </section>
    </Link>
  );
}
