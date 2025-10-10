/*Задача 1: Todo-лист с таймером и статистикой
Описание:
Создайте интерактивный todo-лист, который загружает задачи с сервера и показывает статистику в реальном времени.

📍Требования:
При загрузке получите первые 15 todos с /todos.
Отобразите список задач с чекбоксами для отметки выполнения.
Над списком покажите статистику:

Всего задач
Выполнено задач
Осталось выполнить
Процент выполнения
Добавьте таймер, который показывает, сколько времени пользователь работает с приложением (в секундах)
Таймер должен обновляться каждую секунду
Добавьте кнопку "Загрузить еще 5 задач", которая подгружает следующие 5 todos.
При переключении статуса задачи (completed), статистика должна обновляться мгновенно

Технические детали:
Используйте useState для: списка todos, таймера, количества загруженных задач
Используйте useEffect для: начальной загрузки данных, запуска и очистки таймера

API endpoint: https://jsonplaceholder.typicode.com/todos?_start=0&_limit={limit}
Не забудьте очищать интервал таймера в cleanup функции useEffect. */


import { useEffect, useState } from "react"

interface ITodo{
  userId: number,
  id: number,
  title: string,
  completed: boolean
}
    
  


export default function TodoList  ()  {
  const [seconds, setSeconds] = useState<number>(0)
  const [todos, setTodos] = useState<ITodo []>([])
  const [limit, setLimit] = useState<number>(15)

  
  const URL = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`

    useEffect (() => {
      const interval =setInterval(() => {
            setSeconds((s) => s + 1)
        }, 1000)

      fetch(URL)
      .then(res => res.json())
      .then(data => {
      console.log('данные получены успешно');
      setTodos(data)
      })

      return () => {
      clearInterval(interval);
      console.log(`Cleanup done `);
    }
      
    }, [limit])

    function loadingTasks() {
      setLimit(prev => prev + 5)
      console.log(limit)
    }

  return (

    <div>
        TodoList
        <h2>Timer: {seconds}</h2>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div>UserID: {todo.userId} - ID: {todo.id}</div>
              <div>Task: {todo.title} <input type="checkbox"/>{todo.completed}</div> 
            </li>
          ))}
        </ul>

       <button onClick={loadingTasks}>Загрузить еще 5 задач</button>
    </div>

  )
}
