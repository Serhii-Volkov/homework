
import { PokemonPlagination } from '../PokemonPlagination'
import { FormValidation } from '../FormValidation'
//2. При клике на покемона открывайте модалку
//3. В модалке показывайте детальную информацию о выбранном покемоне:
//• имя
//• id
//• спрайт (фото покемона)
//• рост и вес
function App() {


  return (
    <>
     <PokemonPlagination/>
     <FormValidation/>
    </>
  )
}

export default App
