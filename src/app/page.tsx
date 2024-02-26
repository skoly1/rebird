"use client";
import React, { useEffect } from "react";
import { cn, toQueryString } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Movie, getMovies } from "@/api/api";
import { MovieAlbum } from "@/components/movie/movieablum";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const router = useRouter();

  const getMoviesData = async () => {
    setLoading(true);
    const data = await getMovies();
    setMovies(data.data.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  const handleMovieClick = (slug: string) => {
    router.push(`/movie/${slug}`);
  };
  return (
    <>
      <ScrollArea className="h-[100vh] w-100">
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
          </>
        )}
      </ScrollArea>
    </>
  );
};

export default Home;
