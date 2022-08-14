import { NavLink } from "react-router-dom";
import "./404page.css"

function PageNotFound() {
  return (
    <div id="page-not-found">
      <h1 style={{ "font-weight": "bold" }}>404 - Page not found</h1>
      <img id="not-found-img" src="https://media.istockphoto.com/photos/falling-king-picture-id169972492?k=6&m=169972492&s=612x612&w=0&h=L59owzb-LtgQhrs5rvCOyp5XcoeQokC4ohFe1-pzyqg="></img>
      <NavLink id="not-found-link" to="/">Head back to the home screen to find your session!</NavLink>
    </div>
  )
}

export default PageNotFound
