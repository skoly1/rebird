import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toQueryString(params: { [key: string]: any }) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");
}

export const copyMagnet = async (TORRENT_HASH: string, movieName: string) => {
  const magnetLink = `magnet:?xt=urn:btih:${TORRENT_HASH}&dn=${movieName}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
  await navigator.clipboard.writeText(magnetLink);
};

export const openMagnet = (TORRENT_HASH: string, movieName: string) => {
  const magnetLink = `magnet:?xt=urn:btih:${TORRENT_HASH}&dn=${movieName}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
  window.open(magnetLink, '_blank');
};
