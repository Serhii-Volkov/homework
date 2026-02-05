import { useState, useEffect } from "react"
//Сделайте React приложение с одним компонентом.
//
//В приложении должно быть:
//1. Заголовок “Note Draft”
//2. Поле input для темы заметки
//3. Поле textarea для текста заметки
//4. Счётчик символов для текста (сколько символов в textarea)
//5. Кнопка “Clear draft”, которая:
//• очищает input и textarea
//• удаляет ключ из localStorage
//
//Поведение:
//• Пользователь вводит тему и текст, данные сразу сохраняются в localStorage
//• После перезагрузки страницы тема и текст восстанавливаются
//• Если оба поля пустые, localStorage должен быть чистым (ключ удаляем)
interface NoteDraft{
  title: string;
  content: string;
}


export function NoteDraft(){

    const STORAGE_KEY = 'note-draft'

    const [noteDraft, setNoteDraft] = useState<NoteDraft>(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : {title: '', content: ''}
    })

    useEffect(() => {
    if (!noteDraft.title && !noteDraft.content) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(noteDraft));
    }
  }, [noteDraft]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setNoteDraft((prev) => ({
          ...prev,
          [name]: value,
        }));
    }

    function handleClear() {
        setNoteDraft({title: '', content: ''})
        localStorage.removeItem(STORAGE_KEY)
    }




    return (
        <>
            <label>
                Title:
                <input type="text" name="title" value={noteDraft.title} onChange={handleChange}/>
            </label>

            <label >
                Text:
                <textarea name="content" value={noteDraft.content} onChange={handleChange}/>
            </label>
            <p>Text count: {noteDraft.content.length}</p>
           

            <button onClick={handleClear}>Clear</button>
        </>
    )
}