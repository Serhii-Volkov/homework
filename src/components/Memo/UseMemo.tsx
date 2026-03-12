//Создайте React компонент со следующим поведением:
//
//Что должно быть в UI
//1. input для поиска пользователя по имени
//2. кнопка Toggle Theme для смены темы light/dark
//3. список пользователей
//4. текст Found: N users
//
//Данные
//Используйте массив из пользователей. (10-15 пользователей)
//
//У каждого пользователя должны быть:
//• id
//• name
//• age
//
//⸻
//
//Логика
//1. При вводе текста в input должен происходить поиск пользователей по имени
//2. Кнопка Toggle Theme должна только менять тему
//3. Фильтрация пользователей не должна выполняться заново при смене темы
import { cn } from "../../lib/utils";
import { useState, useMemo } from "react";

interface IUser {
  id: number;
  name: string;
  age: number;
}

function generateUsers() {
  const users = [];

  for (let i = 1; i <= 15; i++) {
    users.push({
      id: i,
      name: `name${i}`,
      age: 18 + (i % 40),
    });
  }
  return users;
}

const users = generateUsers();

export function UseMemo() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [name, setName] = useState("");

  const lightTheme = "bg-white text-black";
  const blackTheme = "bg-black text-white";

  const filteredUsers = useMemo<IUser[]>(() => {
    console.log("Фильтрацтя выполнилась");
    return users.filter((user) => user.name.includes(name));
  }, [name]);

  console.log("Страница перерисовалась");

  return (
    <div className={cn(isLightTheme ? blackTheme : lightTheme, "min-h-[90vh]")}>
      <div className="flex flex-col items-center mb-10">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" border rounded-sm mb-2" 
        />
        <button type="submit" className=" border rounded-sm" onClick={() => setIsLightTheme(!isLightTheme)}>
          Toggle
        </button>
      </div>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="flex gap-8">
            <div>id: {user.id}</div>
            <h4>name: {user.name}</h4>
            <p>age: {user.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
