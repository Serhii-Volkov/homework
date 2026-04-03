import { CourseItem } from "./CourseItem"
import { Link } from "react-router-dom"

type Course = {
  id: number
  title: string
}

const course: Course[] = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "JavaScript Pro" },
  { id: 3, title: "TypeScript Intro" }
]

export const CourseList = () => {
  return (
    <div>
      <h2>CourseList</h2>

      {course.map((c: Course) => (
        <Link key={c.id} to={`${c.id}`}>
          <CourseItem id={c.id} title={c.title} />
        </Link>
      ))}
    </div>
  )
}