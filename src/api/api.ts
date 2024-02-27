import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

// Configure axios-retry
axiosRetry(axios, { retries: 3 }); // Replace 3 with the number of retries you want

interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface Movie {
  id: string;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: Torrent[];
  date_uploaded: string;
  date_uploaded_unix: number;
}

interface Data {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: Movie[];
}

interface Meta {
  server_time: number;
  server_timezone: string;
  api_version: number;
  execution_time: string;
}

interface MoviesResponse {
  "@meta": Meta;
  data: Data;
  status: string;
  statusText: string;
}

export const getMovies = (
  params?: string
): Promise<AxiosResponse<MoviesResponse>> => {
  const url = `${process.env.NEXT_PUBLIC_LIST_MOVIES_TRT_URL}${
    params ? "?" + params : ""
  }`;
  return axios.get(url);
};

export const getMovie = (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_MOVIE_DETAILS_TRT_URL}?movie_id=${id}&with_images=true&with_cast=true`;
  return axios.get(url);
};

export const getSuggestedMovies = (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_SUGGESTED_MOVIE_DETAILS_TRT_URL}?movie_id=${id}`;
  return axios.get(url);
};
