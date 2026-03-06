//ТЗ: Todos (GET + POST) с React Query + React Paginate
//
//API: https://jsonplaceholder.typicode.com/todos
//
//Что должно быть в UI
//1. Кнопка Create Todo
//2. Список todos (показывайте title и completed)
//3. Пагинация через React Paginate: по 10 задач на страницу
//
//Логика GET
//• Получайте todos через useQuery с ключом ['todos']
//• В UI отображайте текущую страницу (10 штук), остальное через пагинацию
//
//Логика POST
//• Создавайте todo через useMutation (POST на /todos) по клику на кнопку
//• Новый todo: { title: 'My new todo', completed: false }
//
//После POST (обязательно)
//• Новый todo должен сразу появляться первым в списке (позиция №1)
//• Затем список должен обновляться корректно вместе с пагинацией
//
//Состояния
//• Показать Loading... при загрузке списка
//• Показать Adding... во время POST
//• Показать Error при ошибке
import axios from 'axios';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';

interface Todo {
    id?: number
    title: string
    completed: boolean
}


export function Todos() {

    const {data, isError, isLoading, error} = useQuery({
        queryKey: ["todos"],
        queryFn: async() => {
            const res = await axios.get<Todo[] | undefined>('https://jsonplaceholder.typicode.com/todos')
            return res.data
        }
    })

    const queryClient = useQueryClient();

    const newTodo: Todo = { title: 'My new todo', completed: false }

    const createTodo = useMutation({
        mutationFn: async(newTodo: Todo) => {
            const res = await axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
            return res.data
        },
        onSuccess: (data, variables) => {
        console.log('Todo created successfully!');
        console.log(data);
        console.log(variables);
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: () => {
            console.log('Error creating todo!');
        }
     })

    const handleCreateTodo = () => {
        createTodo.mutate(newTodo)
    }

    console.log(data)
    return (
    <div>
      <h2>Todos</h2>
      <button onClick={() => handleCreateTodo()}>Create todo</button>    
      <ul>
        TODO LIST
        {data?.map((todo) => 
        <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}
