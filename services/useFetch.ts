import { use, useEffect, useState } from "react";

//fetchMovieDetails
//fetchMovies

const useFetch = <T>(fetchFunction: () => Promise<T>,autoFetch=true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);

      setData(result);
    } catch (err) {
      //@ts-ignore
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(true);
  };    

useEffect(() => {
    if(autoFetch) {
    fetchData(); }
 }, []);

  return { data, error, loading, refetch:fetchData };
};

export default useFetch;