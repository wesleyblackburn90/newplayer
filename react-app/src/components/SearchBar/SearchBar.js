import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SearchBar.css"

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder)

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

  const closeSearch = () => {
    const newPlaceholder = placeholder
    setFilteredData([])
    return setInputPlaceholder(newPlaceholder)
  }


  return (
    <div className="search">
      <div className="searchInputs">
        <input className="searchInputField" type="text" placeholder={inputPlaceholder} onChange={handleFilter} />
        <img className="searchIcon" src="/static/search.png"></img>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <NavLink className="searchItem" to={`/sessions/${value.id}`}>
                <p onClick={closeSearch}> {value.game} at {value.location_name}</p>
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
