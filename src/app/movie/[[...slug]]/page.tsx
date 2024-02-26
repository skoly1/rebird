"use client";

import React from "react";
import { getMovie } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";


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
            src={movie?.background_image}
            alt={movie?.title}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-110 cursor-pointer"
            )}
          />
          <div className="p-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {movie?.title_long || movie?.title}
            </h2>

            <Badge
              variant="outline"
              className="mr-2 bg-primary text-white mt-4"
            >
              IMDB Rating: {movie?.rating}
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
                  <Card
                    key={index}
                    onClick={() => handleClick(torrent.url)}
                    className="cursor-pointer hover:scale-105 transition-all"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0  p-4 pb-0">
                      <CardTitle className="text-sm font-medium">
                        {torrent.quality}
                      </CardTitle>
                      <Download />
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
