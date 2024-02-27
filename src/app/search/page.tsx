"use client";
import React from "react";
import { cn, toQueryString } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Movie, getMovies } from "@/api/api";
import { MovieAlbum } from "@/components/movie/movieablum";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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

const Page = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openMovie, setOpenMovie] = React.useState<boolean>(false);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getMoviesData = async (page?: number) => {
    setLoading(true);
    const params = toQueryString({
      query_term: searchText,
      page: page || currentPage,
      limit: itemsPerPage,
    });
    const data = await getMovies(params);
    setMovies(data.data.data.movies);
    setTotalCount(data.data.data.movie_count);
    setLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText) {
      getMoviesData();
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleMovieClick = (slug: string) => {
    router.push(`/movie/${slug}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getMoviesData(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      getMoviesData(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getMoviesData(pageNumber);
  };
  return (
    <>
      <ScrollArea className="h-[100vh] w-100">
        <div className={cn("flex items-center p-4 relative")}>
          <Search
            className={cn(
              "mr-2 h-4 w-4 shrink-0 opacity-50 absolute left-6 top-1/2  -translate-y-1/2 transform"
            )}
          />
          <Input
            placeholder="Search movies..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className={cn("max-w-sm pl-10")}
            onKeyDown={handleKeyDown}
            // autoFocus
            ref={inputRef}
          />
          <Button
            onClick={() => getMoviesData()}
            className={cn("ml-2 bg-primary text-white hover:bg-primary-dark")}
            variant="secondary"
            disabled={!searchText}
          >
            Search
          </Button>
        </div>

        {loading ? (
          <div className="flex items-start justify-center text-sm text-muted-foreground h-[100vh]">
            <div className="flex items-center">
              <Loader2 className="mr-2 h-10 w-10 animate-spin" />
              Searching...
            </div>
          </div>
        ) : (
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
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Page;
