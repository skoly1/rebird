import Image from "next/image";

import { cn } from "@/lib/utils";

interface MovieAlbumProps extends React.HTMLAttributes<HTMLDivElement> {
  album: any;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  handleMovieClick: (slug: string) => void;
}

export function MovieAlbum({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  handleMovieClick,
  ...props
}: MovieAlbumProps) {
  return (
    <div
      className={cn("space-y-3 cursor-pointer", className)}
      {...props}
      onClick={() => handleMovieClick(album.id)}
    >
      <div className="overflow-hidden rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={album.cover}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.title}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div>
    </div>
  );
}
