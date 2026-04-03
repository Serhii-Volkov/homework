
type Props = {
    id: number;
    title: string;
    
}
export const CourseItem = ({id, title}: Props) => {
  return (
    <div className="flex gap-4 mt-1">
        <li>id: {id}</li>
        <h4>Title: {title}</h4>
        
    </div>

  )
}
