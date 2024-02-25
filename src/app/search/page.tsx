"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { getMovies } from "@/api/api";

const Page = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [debouncedSearch] = useDebounce(searchText, 1000);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getMoviesData = async () => {
      const data = await getMovies(debouncedSearch);
      console.log(data);
      setLoading(false);
    };
    if (debouncedSearch) {
      setLoading(true);
      getMoviesData();
    }
  }, [debouncedSearch]);

  return (
    <>
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
          className={cn("max-w pl-10")}
        />
      </div>

      {loading && (
        <div className="flex items-start justify-center text-sm text-muted-foreground h-[100vh]">
          <div className="flex items-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
            Searching...
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
