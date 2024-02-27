import { cn } from "@/lib/utils";
import React from "react";

interface MovieAlbumProps extends React.HTMLAttributes<HTMLDivElement> {
  character_name: string;
  imdb_code: string;
  name: string;
  url_small_image: string;
}

export function Actor({
  character_name,
  imdb_code,
  name,
  url_small_image,
  ...props
}: MovieAlbumProps) {
  const [errorImage, setErrorImage] = React.useState(false);
  const errorImageUrl = "/public/placeholder-image-person-jpg.jpeg";

  const url = errorImage ? errorImageUrl : url_small_image;
  return (
    <div className={cn("space-y-3 cursor-pointer")} {...props}>
      <div className="overflow-hidden rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url_small_image}
          onError={(e) => {
            if (!errorImage) {
              setErrorImage(true);
            }
          }}
          alt={name}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{name}</h3>
        <p className="text-xs text-muted-foreground">{character_name}</p>
      </div>
    </div>
  );
}
