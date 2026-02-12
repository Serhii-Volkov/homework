//Сделайте компонент PlanetsSearch
//
//Требования
//1. UI
//• Input для ID планеты (1–60)
//• Кнопка Search
//• Блок с выводом:
//• isLoading
//• isFetching
//• isPlaceholderData
//
//2. Запрос
//• Используйте useQuery
//• queryKey
//• queryFn
//https://swapi.dev/api/planets/${planetId}
//• Запрос должен запускаться только если ID валиден: используйте enabled
//
//3. Настройки кеша
//• staleTime
//• gcTime
//• placeholderData
//
//4. Отображение
//• Если isLoading → показать Loading...
//• Если data есть и isFetching → показать Updating...
//• Если isError → показать текст ошибки
//• Если data есть → вывести:
//• name
//• climate
//• population
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function PlanetSearch() {
  const [planetId, setPlanetId] = useState("");
  const [message, setMessage] = useState('')

  async function fetchPlanet(id: string) {
    try {
      const res = await axios(`https://swapi.dev/api/planets/${id}/`);
      return res.data;
    } catch {
      throw new Error("Network response was not ok");
    }
  }

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isStale,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["planetId", planetId],
    queryFn: () => fetchPlanet(planetId),
    enabled: planetId !== "",
    staleTime: 30_000, // 30 seconds
    gcTime: 60_000, // 1 minute
    placeholderData: (prev) => prev, // Use previous data as placeholder
  });

  const handleSearch = (formData: FormData) => {
    const id = formData.get("id") as string
    if ( Number(id) < 1 || Number(id) > 60) {
    setMessage('Ошибка: ID должен быть от 1 до 60');
    return;
  }
    setPlanetId(id);
  };

  return (
    <>
      <form action={handleSearch}>
        <label >
            PlanetId
            <input type="text" name="id" />
            <div>{message}</div>
        </label>
        
        <button type="submit">Search</button>
      </form>
      <div>
        <div>isFetching: {String(isFetching)}</div>
        <div>isStale: {String(isStale)}</div>
        <div>isPlaceholderData: {String(isPlaceholderData)}</div>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isFetching && <div>Updating...</div>}
      {isError && <div>{error.message}</div>}
      {data && (
        <ul>
          <li>{data.name}</li>
          <li>{data.climate}</li>
          <li>{data.population}</li>
        </ul>
      )}
    </>
  );
}
