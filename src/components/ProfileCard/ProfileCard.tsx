

import { useState } from "react"

interface ProfileCardProps {
    name: string
    desc: string
}

function ProfileCard({name, desc}: ProfileCardProps) {
const [status, setStatus] = useState<boolean>(false)

const openProfile: string = 'Показать профиль'
const closeProfile: string = 'Закрыть профиль'

  return (
    <>
      {status === true ? <button onClick={() => setStatus(!status)}>{closeProfile}</button>: <button onClick={() => setStatus(!status)}>{openProfile}</button> }
      {status === true ? <div> <h1>{name}</h1> <p>{desc}</p> </div> : null}
    </>
  )
}

export default ProfileCard
