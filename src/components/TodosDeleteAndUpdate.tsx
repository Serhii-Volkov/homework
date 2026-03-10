//ТЗ: Todos with Update and Delete
//API: https://jsonplaceholder.typicode.com/todos
//
//Что нужно сделать
//Создать приложение, в котором:
//1. Через useQuery получить список todos с сервера
//2. Показать только первые 20 todo
//3. У каждого todo вывести:
//
//• title
//• completed
//• кнопку Delete
//• кнопку Update
//⸻
//
//Delete
//По клику на кнопку Delete:
//• отправить DELETE запрос по id
//• после успешного удаления обновить список todos
//
//⸻
//
//Update
//
//По клику на кнопку Update:
//• отправить PATCH или PUT запрос по id
//• обновить todo, например:
//• поменять title на "Updated todo"
//или
//• поменять completed на противоположное значение
//
//После успешного обновления список должен обновиться на экране.
//⸻
//
//Что показать в интерфейсе
//• Loading... во время загрузки списка
//• Deleting... во время удаления
//• Updating... во время обновления
//• Error если произошла ошибка
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useState, useEffect } from "react"

interface Todo {
  id: number
  title: string
  completed: boolean
}

const API_URL = "https://jsonplaceholder.typicode.com/todos"

const TodosDeleteAndUpdate = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  
  const limit = 20

  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get<Todo[]>(API_URL, {
        params: { _limit: limit }
      })
      return res.data
    }
  })

  
  useEffect(() => {
    if (data) {
      setTodos(data)
    }
  }, [data])

  
  const deleteTodo = useMutation({
    mutationFn: async (id: number) => {
      setDeletingId(id)
      await axios.delete(`${API_URL}/${id}`)
      return id
    },
    onSuccess: (id) => {
      setTodos(prev => prev.filter(todo => todo.id !== id))
      setDeletingId(null)
    },
    onError: () => {
      setDeletingId(null)
    }
  })

  
  const updateTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      setUpdatingId(todo.id)

      await axios.patch(`${API_URL}/${todo.id}`, {
        title: "Updated todo",
        completed: !todo.completed
      })

      return todo
    },
    onSuccess: (todo) => {
      setTodos(prev =>
        prev.map(t =>
          t.id === todo.id
            ? { ...t, title: "Updated todo", completed: !t.completed }
            : t
        )
      )
      setUpdatingId(null)
    },
    onError: () => {
      setUpdatingId(null)
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h4>{todo.title}</h4>
            <span>Completed: {String(todo.completed)}</span>

            <button
              onClick={() => deleteTodo.mutate(todo.id)}
              disabled={deletingId === todo.id}
            >
              {deletingId === todo.id ? "Deleting..." : "Delete"}
            </button>

            <button
              onClick={() => updateTodo.mutate(todo)}
              disabled={updatingId === todo.id}
            >
              {updatingId === todo.id ? "Updating..." : "Update"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodosDeleteAndUpdate