

import './App.css'
import { LikesButton } from './components/LikesButton/LikesButton'

import ProfileCard from './components/ProfileCard/ProfileCard'

function App() {
   

  

  return (
    <>

        <ProfileCard name="Serhii" desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, illo veritatis." />
        <LikesButton postName="Будь первым, кто поставит лайк"/> 
      
    </>
  )
}

export default App
