/*Задание 2. SimpleForm
⸻

🔹 Что нужно сделать:
1. Создайте компонент SimpleForm.
2. Добавьте форму, в которой есть:
• одно поле name (введите имя),
• одно поле email,
• кнопка “Отправить”.
3. Добавьте функцию handleSubmit, которая:
• получает данные из формы,
• достаёт значения через formData.get("name") и formData.get("email"),
• выводит их в консоль.
5. Добавьте defaultValue (любое),
чтобы показать, как работает начальное значение.*/

export const SimpleForm = () => {

  
  const handleSubmit = (formData: FormData) => {
    const name = formData.get('username');
    const email = formData.get('email');
    console.log(name, email)
  }

  const emailValue = 'volkoof6424@gmail.com'
  const nameValue = 'Serhii'

  return (

    <div>

        SimpleForm

         <form action={handleSubmit}>
            <input type="text" name="userName" defaultValue={nameValue}   />
            <input type="email" name="email" defaultValue={emailValue} />
            <button type="submit">Send</button>
          </form>
    </div>

  )
}
 