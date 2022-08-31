import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SearchBar.css"

function SearchBar({ placeholder, data }) {
  console.log(data)
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = (e) => {
    const word = e.target.value
    const filter = Object.values(data).filter(value => {
      return value.game.toLowerCase().includes(word.toLowerCase())
    })

    if (word === "") {
      setFilteredData([])
    } else {
      setFilteredData(filter)
    }
  }


  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleFilter} />
        <div className="searchIcon"></div>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <NavLink className="searchItem" to={`/sessions/${value.id}`}>
                <p> {value.game} at {value.location_name}</p>
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
