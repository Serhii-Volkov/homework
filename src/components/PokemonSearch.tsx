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

import { useState } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export function PokemonSearch() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => fechPokemon(name)
    })

    const fechPokemon = async (name: string) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        console.log(res.data)
        return res.data
    }

    function getPokemonName(formData: FormData) {
        const name = formData.get("name")
        console.log(name)
    }
    


    return (
        <>
        <form action={getPokemonName}>
            <label>
                Введите имя покемона (например: pikachu, ditto, bulbasaur).
                <input type="search" name="name"/>
            </label>
            <button type="submit">Search</button>
            </form>
            {data && <div>{data.name}</div>}
        </>
    )
}