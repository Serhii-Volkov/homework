import { useState } from "react"

interface ProfileCardProps {
    name: string
    desc: string
}

function ProfileCard({name, desc}: ProfileCardProps) {
const [isOpen, setIsOpen] = useState<boolean>(false)

const openProfile: string = 'Показать профиль'
const closeProfile: string = 'Закрыть профиль'

  return (
    <>
      {isOpen === true ? <button onClick={() => setIsOpen(!isOpen)}>{closeProfile}</button>: <button onClick={() => setIsOpen(!isOpen)}>{openProfile}</button> }
      {isOpen === true ? <div> <h1>{name}</h1> <p>{desc}</p> </div> : null}
    </>
  )
}

export default ProfileCard
