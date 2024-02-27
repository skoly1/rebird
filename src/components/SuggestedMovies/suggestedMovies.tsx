"use client";

import React from "react";
import { getSuggestedMovies } from "@/api/api";
import { Movie } from "@/lib/types";
import { MovieAlbum } from "@/components/movie/movieablum";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface MoviePageProps {
  movieId: string;
}

export default function SuggestedMovies({ movieId }: MoviePageProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getSuggestedMovies(movieId);
      setMovies(data.data.data.movies);
      setLoading(false);
    };

    getData();
  }, [movieId]);

  const handleMovieClick = (id: string) => {
    router.push(`/movie/${id}`);
  };

  return (
    <>
      {movies?.length > 0 && (
        <>
          <div className="flex flex-row flex-wrap justify-center gap-5 py-4 px-2">
            {movies?.map((movie) => {
              return (
                <MovieAlbum
                  key={movie.id}
                  album={{
                    name: movie.title,
                    cover: movie.medium_cover_image,
                    title: movie.title,
                    artist: movie.title_long,
                    id: movie.id,
                  }}
                  className="w-[250px]"
                  aspectRatio="portrait"
                  width={200}
                  height={200}
                  handleMovieClick={() => handleMovieClick(movie.id)}
                />
              );
            })}
          </div>
          {/* <Pagination className="pb-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => {
                // Only render links for the current page, 2 pages on either side, the first page, and the last page
                if (
                  index + 1 === currentPage ||
                  index + 1 === currentPage - 1 ||
                  index + 1 === currentPage - 2 ||
                  index + 1 === currentPage + 1 ||
                  index + 1 === currentPage + 2 ||
                  index + 1 === 1 ||
                  index + 1 === totalPages
                ) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                // Render an ellipsis if the page is just outside the range of 2 pages on either side of the current page
                else if (
                  index + 1 === currentPage - 3 ||
                  index + 1 === currentPage + 3
                ) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
              })}
              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </>
      )}
      {/* {!movie && (
        <div className="flex items-start justify-center text-sm text-muted-foreground h-[100]">
          <div className="flex items-center mt-10">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
            Loading...
          </div>
        </div>
      )} */}
    </>
  );
}
