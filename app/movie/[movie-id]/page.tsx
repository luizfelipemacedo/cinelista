import Link from "next/link";
import Image from "next/image";
import { JSX, SVGProps } from "react";

import { movie } from "@/models/movie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

type Props = {
  params: {
    "movie-id": string;
  };
};

export default async function Page({ params }: Props) {
  const { "movie-id": movieId } = params;
  const {
    getMovieDetailsById,
    getSimilarMoviesById,
    getTopRatedMovies,
    getMovieTrailerById,
  } = movie;

  const [movieDetails, similarMovies, topRatedMovies, trailerUrl] =
    await Promise.all([
      getMovieDetailsById(movieId),
      getSimilarMoviesById(movieId),
      getTopRatedMovies(),
      getMovieTrailerById(movieId),
    ]);

  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-800 text-white border-gray-200 py-12 md:py-16 lg:py-24 rounded-lg mx-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div>
            <Image
              src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="text-black dark:text-white inline-block bg-primary-500 px-3 py-1 rounded-full text-sm font-medium border border-white">
              {`${movieDetails.status}`}
            </div>
            <h1 className="text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold">
              {`${movieDetails.title}`}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-5 h-5 text-primary-500" />
                <span className="text-gray-400 dark:text-white font-medium">{`${movieDetails.rating}`}</span>
              </div>
              <span className="text-gray-400">
                | {`${movieDetails.release_year}`}
              </span>
            </div>
            <p className="text-gray-400 line-clamp-5">
              {`${movieDetails.overview || "Sem descrição disponível."}`}
            </p>
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={!trailerUrl}>Assistir Trailer</Button>
                </DialogTrigger>
                <DialogContent className="bg-transparent border-none flex justify-center">
                  <iframe
                    className="rounded-lg"
                    width="800"
                    height="600"
                    allowFullScreen
                    src={trailerUrl!}
                  />
                </DialogContent>
              </Dialog>
              <Button variant="secondary">Read Review</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          <div className="col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Filmes Similares
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarMovies.slice(0, 4).map((movie) => (
                  <SimilarMovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </div>
            <div>
              <Button className="w-full md:w-auto">Ver Mais Similares</Button>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Gêneros</h2>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {movieDetails.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href="#"
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    prefetch={false}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{genre.name}</span>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Melhores Avaliados
              </h2>
              <div className="space-y-4">
                {topRatedMovies.slice(0, 5).map((movie) => (
                  <TopRatedMovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type SimilarMovie = Awaited<ReturnType<typeof movie.getSimilarMoviesById>>[0];
function SimilarMovieCard(movie: SimilarMovie) {
  return (
    <Link href={`/movie/${movie.id}`} key={movie.id}>
      <Card
        className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-none hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        key={movie.id}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          width={400}
          height={600}
          alt="Movie Poster"
          className="h-56 w-full object-cover"
          style={{ aspectRatio: "400/600", objectFit: "cover" }}
        />

        <CardContent className="p-4 space-y-2">
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <StarIcon className="w-5 h-5 text-primary-500" />
              <span className="font-medium"> {`${movie.rating}`}</span>
            </div>
            <span className="text-gray-400">| {`${movie.release_year}`}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
            {movie.overview || "Sem descrição disponível."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

type TopRatedMovie = Awaited<ReturnType<typeof movie.getTopRatedMovies>>[0];
function TopRatedMovieCard(movie: TopRatedMovie) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      key={movie.id}
      className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        width={100}
        height={150}
        alt="Movie Poster"
        className="h-24 w-16 object-cover mr-4"
        style={{ aspectRatio: "100/150", objectFit: "cover" }}
      />
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <StarIcon className="w-5 h-5 text-primary-500" />
            <span className="font-medium">{`${movie.rating}`}</span>
          </div>
          <span className="text-gray-400">| {`${movie.release_year}`}</span>
        </div>
      </div>
    </Link>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
