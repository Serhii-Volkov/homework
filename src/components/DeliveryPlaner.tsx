// Task 1 (FormData + <select>): “Delivery Planner”
//
//ТЗ
//Сделайте форму с такими полями:
//1. Name
//2. City — <select name="city" required>
//• options: Toronto, New York, Chicago
//3. Delivery Time — <select name="deliveryTime" required>
//• options: morning, afternoon, evening
//4. Notes — <textarea name="notes"></textarea> (необязательно)
//
//Логика
//• При сабмите не используйте useState для инпутов
//• Считайте данные через FormData.
//• Сформируйте строку-результат и покажите под формой:
//
//Пример:
//Delivery for Olena → Toronto, afternoon. Notes: leave at door
//• Если notes пустые — выводите: Notes: -

export function  DeliveryPlaner() {
      const handleOrder = (formData: FormData): void => {
    // Получаем данные по атрибутам 'name'
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const deliveryTime = formData.get("deliveryTime") as string;
    const notes = formData.get("notes") as string;
    const notesText = notes ? notes : "-";

    const result = `Delivery for ${name} → ${city}, ${deliveryTime}. Notes: ${notesText}`;
    console.log(result);
  }
   
    
    

    return (
        <>
            <form action={handleOrder}>
                <input type="text" name='name'/>
                <select name="city" >
                    <option value="Toronto">Toronto</option>
                    <option value="New York">New York</option>
                    <option value="Chicago">Chicago</option>
                </select>
                <select name="deliveryTime" >
                    <option value="morning">morning</option>
                    <option value="afternoon">afternoon</option>
                    <option value="evening">evening</option>
                </select>
                <textarea name="notes"></textarea>
                <button>btn</button>
            </form>

            

        </>
    )
}