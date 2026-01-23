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
import { useEffect, useState } from "react";

type Person = {
  name: string;
  gender: string;
  birth_year: string;
};

export function SwapiPerson() {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://swapi.py4e.com/api/people/1")
      .then((res) => {
        setPerson(res.data);
      })
      .catch((e) => {
        console.log("Something went wrong:", e);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  
  if (!loading) return <p>Загрузка...</p>;
  if (!person) return <p>Данные не найдены</p>;

  return (
    <div>
      <h2>Персонаж SWAPI</h2>
      <p>Имя: {person.name}</p>
      <p>Пол: {person.gender}</p>
      <p>Год рождения: {person.birth_year}</p>
    </div>
  );
}