import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startSessionThunk } from '../../store/gameSession';

function CreateSession() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  console.log(sessionUser.id, "<==== session user id")

  const [location_name, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip_code, setZipCode] = useState(0)
  const [game, setGame] = useState('')
  const [description, setDescription] = useState('')
  const [pic_url, setPic] = useState('https://i2.wp.com/s802022855.onlinehome.us/wp-content/uploads/2014/12/settlers_startgame.jpg')
  const [players_num, setPlayers] = useState(0)
  const [errors, setErrors] = useState([])

  const updateLocation = (e) => setLocation(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateZipCode = (e) => setZipCode(e.target.value)
  const updateGame = (e) => setGame(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePic = (e) => setPic(e.target.value)
  const updatePlayers = (e) => setPlayers(e.target.value)

  useEffect(() => {
    let errors = []
    if (location_name.length < 3) errors.push("Location name is too short!")
    if (location_name.length > 50) errors.push("Location name is too long!")
    if (address.length < 0) errors.push("Please enter an address!")
    if (address.length > 75) errors.push("Address is too long! Please enter a valid address!")
    if (city.length < 0) errors.push("Please enter a city name!")
    if (city.length > 30) errors.push("Name is too long! Please enter a valid city name")
    // if (state.length < 4 || state.length > 14) errors.push("Please enter a valid state!")
    if (zip_code.length !== 5) errors.push("Please enter a valid 5 digit zipcode!")
    if (game.length < 1) errors.push("Please give the name of your game!")
    if (game.length > 50) errors.push("Please shorten the name of your game!")
    if (description.length > 2000) errors.push("Please leave a shorter description!")
    if (!pic_url.endsWith(".jpg") || !pic_url.endsWith(".png")) errors.push("Please submit a picture that is a PNG or JPG file!")
    if (players_num < 2) errors.push("Number of players must be 2 or higher!")

    setErrors(errors)
  }, [location_name, address, city, state, zip_code, game, description, pic_url, players_num])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      organizer_id: sessionUser.id,
      location_name,
      address,
      city,
      state,
      zip_code,
      game,
      description,
      pic_url,
      players_num
    }

    try {
      await dispatch(startSessionThunk(payload))
      history.push("/sessions")
    } catch (error) {
      setErrors(error.errors)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Where is the name of the location of the game session?</p>
        <input
          type="text"
          placeholder="Location"
          required
          value={location_name}
          onChange={updateLocation}
        />
        <p>What is the address of the session?</p>
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={updateAddress}
        />
        <p>What is the name of the city?</p>
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={updateCity}
        />
        <p>What is the name of the state?</p>
        {/* <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={updateState}
        /> */}
        <select value={state} onChange={updateState}>
          <option value={"Alabama"}> Alabama </option>
          <option value={"Alaska"}> Alaska </option>
          <option value={"Arizona"}> Arizona </option>
          <option value={"Arkansas"}> Arkansas </option>
          <option value={"California"}> California </option>
          <option value={"Colorado"}> Colorado </option>
          <option value={"Connecticut"}> Connecticut </option>
          <option value={"Delaware"}> Delaware </option>
          <option value={"Florida"}> Florida </option>
          <option value={"Georgia"}> Georgia </option>
          <option value={"Hawaii"}> Hawaii </option>
          <option value={"Idaho"}> Idaho </option>
          <option value={"Illinois"}> Illinois </option>
          <option value={"Indiana"}> Indiana </option>
          <option value={"Iowa"}> Iowa </option>
          <option value={"Kansas"}> Kansas </option>
          <option value={"Kentucky"}> Kentucky </option>
          <option value={"Louisiana"}> Louisiana </option>
          <option value={"Maine"}> Maine </option>
          <option value={"Maine"}> Maine </option>
          <option value={"Maryland"}> Maryland </option>
          <option value={"Massachusetts"}> Massachusetts </option>
          <option value={"Michigan"}> Michigan </option>
          <option value={"Minnesota"}> Minnesota </option>
          <option value={"Mississippi"}> Mississippi </option>
          <option value={"Missouri"}> Missouri </option>
          <option value={"Montana"}> Montana </option>
          <option value={"Nebraska"}> Nebraska </option>
          <option value={"Nevada"}> Nevada </option>
          <option value={"New Hampshire"}> New Hampshire </option>
          <option value={"New Jersey"}> New Jersey </option>
          <option value={"New Mexico"}> New Mexico </option>
          <option value={"New York"}> New York </option>
          <option value={"North Carolina"}> North Carolina </option>
          <option value={"North Dakota"}> North Dakota </option>
          <option value={"Ohio"}> Ohio </option>
          <option value={"Oklahoma"}> Oklahoma </option>
          <option value={"Oregon"}> Oregon </option>
          <option value={"Pennsylvania"}> Pennsylvania </option>
          <option value={"Rhode Island"}> Rhode Island </option>
          <option value={"South Carolina"}> South Carolina </option>
          <option value={"South Dakota"}> South Dakota </option>
          <option value={"Tennessee"}> Tennessee </option>
          <option value={"Texas"}> Texas </option>
          <option value={"Utah"}> Utah </option>
          <option value={"Vermont"}> Vermont </option>
          <option value={"Virginia"}> Virginia </option>
          <option value={"Washington"}> Washington </option>
          <option value={"West Virginia"}> West Virginia </option>
          <option value={"Wisconsin"}> Wisconsin </option>
          <option value={"Wyoming"}> Wyoming </option>
        </select>
        <p>Zip code? </p>
        <input
          type="text"
          placeholder="Zip code (i.e. 54321)"
          required
          value={zip_code}
          onChange={updateZipCode}
        />
        <p>What game will you be playing?</p>
        <input
          type="text"
          placeholder="Game"
          required
          value={game}
          onChange={updateGame}
        />
        <p>Please describe the details of your game session!</p>
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription}
        />
        <p>Please add a link to a pic of your event!</p>
        <input
          type="text"
          placeholder="Event pic"
          value={pic_url}
          onChange={updatePic}
        />
        <p>How many players are needed?</p>
        <input
          type="number"
          placeholder="Number of players"
          required
          value={players_num}
          onChange={updatePlayers}
        />
        <button type="submit">Create your session!</button>
      </form>
    </>
  )
}

export default CreateSession
