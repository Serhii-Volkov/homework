//Task 2 (useEffect): “SWAPI Person Card”
//
//API: https://swapi.py4e.com/api/people/
//
//При загрузке компонента (только 1 раз) сделать запрос и отобразить первого человека из списка.
//
//Показать:
//• name
//• gender
//• birth_year
//
//Пока грузится — текст: Loading…
//Если ошибка — текст: Something went wrong
import axios from "axios";
import {useEffect, useState} from "react";



export function SwapiPerson() {
    const [person , setPerson] = useState();
    
    useEffect(() => {
        axios.get("https://swapi.py4e.com/api/people/1")
        .then((response) => {
            const firstPerson = response.data.results[0];
            console.log(firstPerson);
            setPerson(firstPerson);
        })
    }, [])
    
    return (
        <div>
            <h2>hello</h2>
            <p>{person.name }</p>
          
        </div>
    );
}