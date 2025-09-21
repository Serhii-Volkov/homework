import  { useState } from 'react'

interface PostName {
  postName: string  
}

export const LikesButton = ({ postName}: PostName) => {
  const [like, setLike] = useState<number>(0)



  return (
    <div>
      {like === 0 ? <div>{postName}</div> : <div> {like}</div>}
      <button onClick={() => setLike(like +1)}>Plus</button>
    </div>
  )
}
