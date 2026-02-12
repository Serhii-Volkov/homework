//ТЗ 2
//Сделайте компонент PokemonSearch
//
//Функционал:
//1. На экране есть input, куда пользователь вводит имя покемона (например: pikachu, ditto, bulbasaur).
//2. Есть кнопка Search.
//3. Запрос на сервер не должен выполняться, пока пользователь не нажал Search.
//4. После нажатия Search выполняется GET запрос на:
//https://pokeapi.co/api/v2/pokemon/{name}
//5. Во время загрузки показывай Loading...
//6. При ошибке показывай Pokemon not found (или текст ошибки).
//7. При успехе покажите:
//• имя покемона
//• рост и вес
//• список abilities (умений) в виде списка

//8. Добавьте кнопку Clear, которая очищает поле и результат (то есть сбрасывает состояние поиска).

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type TPokemon = {
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: { name: string };
  }[];
};

export function PokemonSearch() {

  const [currentName, setCurrentName] = useState("");

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["pokemon", currentName],
    queryFn: () => fetchPokemon(currentName),
    enabled: currentName !== "",
  });

  async function fetchPokemon(name: string): Promise<TPokemon> {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`
      );
      return res.data;
    } catch {
      throw new Error("Pokemon not found");
    }
  }

  function handleSearch(formData: FormData) {
    const name = formData.get("pokemonName") as string;
    if (name) {
        setCurrentName(name);
    } 
  }

  function handleClear() {
    setCurrentName("");
  }

  return (
    <>
      <form action={handleSearch}>
        <label>
          Введите имя покемона (например: pikachu, ditto, bulbasaur).
          <input type="search" name="pokemonName" />
        </label>
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>

      
      {isLoading  && <div>Loading...</div>}
      {!isLoading  && isFetching &&  <div>Updating...</div>}
      {isError && <div>{error.message}</div>}
      {data &&  (

        <div>
          <h2>{data.name}</h2>
          <p>Рост: {data.height}</p>
          <p>Вес: {data.weight}</p>
          <h3>Abilities:</h3>
          <ul>
            {data.abilities.map((item, index) => (
              <li key={index}>{item.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}