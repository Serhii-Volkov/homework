import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { CoursesPage } from '../../pages/CoursesPage'
import { CourseList } from '../../pages/CourseList'
import  CourseDetails  from '../../pages/CourseDetails'
import { AboutCourse } from '../../pages/AboutCourse'
import { NotFound } from '../../pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/course" element={<CoursesPage />}>
        <Route index element={<CourseList />} />
        <Route path=":id" element={<CourseDetails />} />
        <Route path="about" element={<AboutCourse/>} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App