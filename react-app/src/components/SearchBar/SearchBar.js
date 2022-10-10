import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SearchBar.css"

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [value, setValue] = useState("")

  const handleFilter = (e) => {
    const word = e.target.value
    const filter = Object.values(data).filter(value => {
      return value.game?.toLowerCase().includes(word?.toLowerCase())
    })

    if (word === "") {
      setFilteredData([])
      setValue("")
    } else {
      setFilteredData(filter)
      setValue(word)
    }
  }

  const closeSearch = () => {
    setFilteredData([])
    return setValue("")
  }


  return (
    <div className="search">
      {/* <img className="searchIcon" src="/static/search.png"></img> */}
      <div className="searchInputs">
        <input className="searchInputField" type="text" placeholder={placeholder} onChange={handleFilter} value={value} />
        <button id="search-clear-button" onClick={closeSearch}>
          <img style={{ "height": "25px", "width": "25px", "color": "lightgray" }} src="/static/close.png"></img>
        </button>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <NavLink onClick={closeSearch} className="searchItem" to={`/sessions/${value.id}`}>
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
