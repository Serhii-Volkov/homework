/*Упражнение 1. CommentsApp

Цель:
Создать приложение, которое загружает комментарии с API, показывает статистику, таймер и поиск по ID.

⸻

🔹 Что нужно сделать:
1. Создайте тип Comment с полями postId, id, name, email, body.
2. Добавьте состояния:
• comments — список комментариев
• timer — счётчик времени работы
• loadedCount — количество загружаемых комментариев
• searchId и foundComment — для поиска комментария по ID
3. Сделайте загрузку комментариев через fetch при изменении loadedCount.
4. Добавьте таймер через setInterval, увеличивающий timer каждую секунду,
и очистку с clearInterval в cleanup.
5. Сделайте кнопку “Загрузить ещё 5 комментариев”, которая увеличивает loadedCount.
Если найден — показывайте email и body, если нет — сообщение об отсутствии.
7. Добавьте статистику:
• всего комментариев (length)

6. Реализуйте поиск комментария по ID с помощью find.
• длинных комментариев (по длине body > 80)
• процент длинных (Math.round).*/

import { useEffect,  useState } from "react"

export const CommentsApp = () => {

    type Comment = {
        postId: number,
        id: number,
        name: string,
        email: string,
        body: string
    }

   
    const [comments, setComments] = useState<Comment []>([])
    const [timer, setTimer] = useState(0)
    const [loadedCount, setLoadedCount] = useState(20)

    const [searchId, setSearchId] = useState()
    const [foundComment, setFoundComment] = useState()
    const URL = `https://jsonplaceholder.typicode.com/todos?_limit=${loadedCount}`
     

    useEffect( () => {
        fetch(URL).then(res => res.json()).then(data => {
        console.log('данные получены успешно');
        setComments(data)
         })

        const interval = setInterval(() => {
            setTimer(prev => prev + 1)
        },  1000)

        

        return () => clearInterval(interval)

    }, [loadedCount])

    function loadingComments() {
        setLoadedCount(prev => prev + 5)
    }

    const totalComments = comments.length
   
    
  return (
    
    <div>
        <h2>Timer: {timer}</h2>
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    Id: {comment.id} --- PostId: {comment.postId} --- Name: {comment.name}
                </li>
            ))}
        </ul>
        <button onClick={loadingComments}>Add 5 comments</button>
        
        <h3>Statistic</h3>
        <div>
            <p>Total comments: {totalComments}</p>
            
        </div>
        
    </div>
    
  )
}
