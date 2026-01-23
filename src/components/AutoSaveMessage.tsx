//Сделайте компонент AutoSaveMessage:
//1. На странице есть:
//
//• input для текста
//• текст статуса: Status: typing... или Status: saved
//• кнопка Clear
//
//2. Поведение:
//
//• Когда пользователь печатает в input:
//• статус становится typing...
//• но “сохранение” должно происходить через 800мс после последнего ввода
//• после “сохранения” статус становится saved
//• Если пользователь продолжил печатать раньше 800мс:
//• предыдущий таймер должен отмениться (cleanup)
//• Кнопка Clear:
//• очищает input
//• статус становится typing... (или можешь сделать empty — но выбери один вариант и держись его)

import { useState, useEffect } from "react";

export function AutoSaveMessage(){
    const [status, setStatus] = useState('')
    const [text , setText] = useState('')
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setText(e.target.value)
        setStatus('typing...')
         
    }
    function handleClear(){
        setText('')
        setStatus('')

    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if(text){
                setStatus('saved')
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [text])

    return(
        <>
            <h2>AutoSaveMessage</h2>
            <input type="text" placeholder="Enter your text..." value={text} onChange={handleChange}/>
            <p>{status}</p>
            <button onClick={handleClear}>Clear</button>
        </>
    )

}