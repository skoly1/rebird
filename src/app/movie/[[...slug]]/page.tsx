"use client";

import React from "react";
import { getMovie } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Movie } from "@/lib/types";
import { cn, openMagnet } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Magnet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieAlbum } from "@/components/movie/movieablum";
import { Actor } from "@/components/actor/actor";
import { Separator } from "@/components/ui/separator";
import SuggestedMovies from "@/components/SuggestedMovies/suggestedMovies";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MoviePageProps {
  params: {
    slug: string[];
  };
}

export default function DocPage({ params }: MoviePageProps) {
  const movieId = params.slug.join("/") ?? null;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [movie, setMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    const getMoviesData = async () => {
      setLoading(true);
      const data = await getMovie(movieId);
      setMovie(data.data.data.movie);
      setLoading(false);
    };

    getMoviesData();
  }, [movieId]);

  const handleClick = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${movie?.title_long}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ScrollArea className="h-[100vh] w-100">
      {movie && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={movie?.large_screenshot_image1 || movie.background_image}
            alt={movie?.title}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-110 cursor-pointer"
            )}
          />
          <div className="p-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {movie?.title_long || movie?.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {movie?.description_full}
            </p>
            <Badge
              variant="outline"
              className="mr-2 bg-primary text-white mt-4"
            >
              IMDB Rating: {movie?.rating}
            </Badge>
            <Badge
              variant="outline"
              className="mr-2 bg-[#facc15] text-[#422006] mt-4"
            >
              Runtime: {movie?.runtime === 0 ? "NA" : movie.runtime + "Mins"}
            </Badge>
            {movie?.genres.map((genre, index) => {
              return (
                <Badge key={index} variant="outline" className="mr-2">
                  {genre}
                </Badge>
              );
            })}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              {movie?.torrents.map((torrent, index) => {
                return (
                  <Card key={index} className="cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0  p-4 pb-0">
                      <CardTitle className="text-sm font-medium">
                        {torrent.quality}
                      </CardTitle>
                      <div className="flex">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Magnet
                                className="hover:scale-150 transition-all"
                                onClick={() =>
                                  openMagnet(torrent.hash, movie.title)
                                }
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Open Magnet Link</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Download
                                className="ml-8 hover:scale-150 transition-all"
                                onClick={() => handleClick(torrent.url)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download Torrent</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pb-1">
                      <div className="text-2xl font-bold">{torrent.size}</div>
                      <div className="flex gap-4">
                        <p className="text-xs text-muted-foreground">
                          {torrent.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {torrent.audio_channels}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {torrent.video_codec}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {movie.cast && (
              <>
                <Separator className="my-4" />
                <h2 className="text-3xl font-bold tracking-tight mb-4">Cast</h2>
              </>
            )}

            <div className="flex items-start justify-between">
              {movie.cast?.map((actor, index) => {
                return (
                  <Actor
                    key={index}
                    character_name={actor.character_name}
                    imdb_code={actor.imdb_code}
                    name={actor.name}
                    url_small_image={actor.url_small_image}
                  />
                );
              })}
            </div>
            <Separator className="mt-8 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight">
              Suggested Movies
            </h2>
            <SuggestedMovies movieId={movieId} />
          </div>
        </>
      )}

      {!movie && (
        <div className="flex items-start justify-center text-sm text-muted-foreground h-[100vh]">
          <div className="flex items-center mt-10">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
            Loading...
          </div>
        </div>
      )}
    </ScrollArea>
  );
}
