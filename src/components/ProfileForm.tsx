/*Создайте компонент ProfileForm, который содержит:
1. Два input поля:
• name — контролируемый input с атрибутом value
• city — неконтролируемый input с атрибутом defaultValue
2. Кнопку “Change Name”, при нажатии на которую имя должно меняться на случайное из массива (например, ["Anna", "Mark", "Claudia", "Serhii"]). Тут используйте такой метод Math.random() для поиска рандомного элемента из массива.
3. Кнопку “Show Form Data”, которая выводит в консоль значения обоих полей через FormData (используя Object.fromEntries(data.entries()).
4. После изменения имени с помощью кнопки — только контролируемый input должен обновиться, а defaultValue остаться прежним (в этом и есть разница между value & defaultValue). */

import { useState } from "react"




export const ProfileForm = () => {

    
    const names: string[] = ["Anna", "Mark", "Claudia", "Serhii"]
    const [name, setName] = useState<string>('Anna')
    const city: string = 'Villnius'
    

    function changeName() {
        const next = names[Math.floor(Math.random() * names.length)] 
        setName(next)
    }

   function showFormData() {

    }

  return (

    <div>
        ProfileForm

        <form action="" onSubmit={(e) => e.preventDefault()}>
            <input type="text"  value={name}/> 
            <input type="text" defaultValue={city} />
            <button onClick={changeName}>Change Name</button>
            <button onClick={showFormData}>Show Form Data</button>
        </form>
    </div>

  )
}

