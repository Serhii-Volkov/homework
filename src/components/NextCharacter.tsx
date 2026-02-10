import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";



export function NextCharacter() {
  const [id, setId] = useState(1);

  const { data, error, isLoading, isFetching, isError } = useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchPerson(id),
  });

  const fetchPerson = async (id: number) => {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
};

  const handleNext = () => {
    setId((prev) => prev + 1);
  };

  return (
    <>
      {!isLoading && isFetching && <div>Updating...</div>}
      {isLoading && <div>Loading...</div>}
      
      {isError && (
        <div>
          Error: {(error as Error).message}
        </div>
      )}

      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Birth year: {data.birth_year}</p>
          <p>Eye color: {data.eye_color}</p>
        </div>
      )}

      <button onClick={handleNext}>Next</button>
    </>
  );
}