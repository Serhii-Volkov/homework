import { PostsServerPagination } from "../PostsServerPlagination"
import { Todos } from "../Todos"
import TodosDeleteAndUpdate from "../TodosDeleteAndUpdate"
//2. При клике на покемона открывайте модалку
//3. В модалке показывайте детальную информацию о выбранном покемоне:
//• имя
//• id
//• спрайт (фото покемона)
//• рост и вес
function App() {


  return (
    <>
      <TodosDeleteAndUpdate/>
    </>
  )
}

export default App
