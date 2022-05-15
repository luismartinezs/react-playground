import useSWR from "swr";

function useSwapi(id: number) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const apiUrl = "https://swapi.dev/api";
  const { data, error } = useSWR(`${apiUrl}/people/${id}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

const SwApi = () => {
  const { data, isError, isLoading } = useSwapi(1);
  if (isError) {
    return <div>Failed to load data</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default SwApi;
