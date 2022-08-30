import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchBar.js"

function SearchBar({ placeholder, data }) {
  console.log(data)
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} />
        <div className="searchIcon"></div>
      </div>
      <div className="searchResult">
        {Object.values(data).map((value, key) => {
          return (
            <NavLink className="searchItem" to={`/sessions/${value.id}`}>
              <p> {value.game} </p>
              <p> {value.location_name} </p>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default SearchBar
