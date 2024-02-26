"use client";
import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Movie, getMovies } from "@/api/api";
import { MovieAlbum } from "@/components/movie/movieablum";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { toQueryString } from "@/lib/utils";

const Home = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    const getMoviesData = async () => {
      setLoading(true);
      const params = toQueryString({ page: currentPage });
      const data = await getMovies(params);
      setMovies(data.data.data.movies);
      setTotalCount(data.data.data.movie_count);
      setLoading(false);
    };

    getMoviesData();
  }, [currentPage]);

  const handleMovieClick = (slug: string) => {
    router.push(`/movie/${slug}`);
  };

  // Pagination

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <ScrollArea className="h-[100vh] w-100">
        {loading ? (
          <div className="flex items-start justify-center text-sm text-muted-foreground h-[100vh]">
            <div className="flex items-center mt-10">
              <Loader2 className="mr-2 h-10 w-10 animate-spin" />
              Searching...
            </div>
          </div>
        ) : (
          <>
            {movies?.length > 0 && (
              <>
                <div className="flex flex-row flex-wrap justify-center gap-5 py-4">
                  {movies?.map((movie) => {
                    return (
                      <MovieAlbum
                        key={movie.id}
                        album={{
                          cover: movie.large_cover_image,
                          title: movie.title,
                          artist: movie.title_long,
                          id: movie.id,
                        }}
                        className="w-[250px]"
                        aspectRatio="portrait"
                        width={200}
                        height={200}
                        handleMovieClick={handleMovieClick}
                      />
                    );
                  })}
                </div>
              </>
            )}

            <Pagination className="pb-4">
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
            </Pagination>
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Home;
