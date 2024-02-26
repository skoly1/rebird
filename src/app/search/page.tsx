"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Movie, getMovies } from "@/api/api";
import { MovieAlbum } from "@/components/movie/movieablum";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openMovie, setOpenMovie] = React.useState<boolean>(false);
  const [movies, setMovies] = React.useState<Movie[]>(
    localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies") ?? "")
      : []
  );

  const getMoviesData = async () => {
    setLoading(true);
    const data = await getMovies(searchText);
    setMovies(data.data.data.movies);
    localStorage.setItem("movies", JSON.stringify(data.data.data.movies));
    setLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getMoviesData();
    }
  };

  const handleMovieClick = () => {};
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
          />
          <Button
            onClick={() => getMoviesData()}
            className={cn("ml-2")}
            variant="secondary"
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
                <div className="flex flex-row flex-wrap justify-center gap-5 py-4">
                  {movies?.map((movie) => {
                    return (
                      <MovieAlbum
                        key={movie.id}
                        album={{
                          cover: movie.large_cover_image,
                          title: movie.title,
                          artist: movie.title_long,
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
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Page;
