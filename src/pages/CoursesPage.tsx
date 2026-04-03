import { Outlet, Link } from "react-router-dom"

export const CoursesPage = () => {
  return (
    <>
      <div>CoursesPage</div>
      <nav>
        <Link to="/course">Course List</Link>
        <br />
        <Link to='about'>About</Link>
      </nav>
      <Outlet />
    </>
    
  )
}
