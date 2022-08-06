import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getSessionsThunk, startSessionThunk, updateSessionThunk } from '../../store/gameSession';

function EditSessionForm({ session, setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { sessionId } = useParams()
  const sessionUser = useSelector(state => state.session.user)

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
    if (state.length < 4 || state.length > 14) errors.push("Please enter a valid state!")
    if (zip_code.length !== 5) errors.push("Please enter a valid 5 digit zipcode!")
    if (game.length < 1) errors.push("Please give the name of your game!")
    if (game.length > 50) errors.push("Please shorten the name of your game!")
    if (description.length > 2000) errors.push("Please leave a shorter description!")
    if (!pic_url.endsWith(".jpg") || !pic_url.endsWith(".png")) errors.push("Please submit a picture that is a PNG or JPG file!")
    if (players_num < 2) errors.push("Number of players must be 2 or higher!")

    setErrors(errors)
  }, [location_name, address, city, state, zip_code, game, description, pic_url, players_num])

  useEffect(() => {
    dispatch(getSessionsThunk())
  }, [dispatch])

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
      await dispatch(updateSessionThunk(payload, sessionId)).then(history.push(`/sessions/${session.id}`))
      setShowModal(false)
    } catch {
      return dispatch(updateSessionThunk(payload)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })
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
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={updateState}
        />
        <p>Zip code?</p>
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
        <button type="submit">Update your session!</button>
        {/* <NavLink to={`/sessions/${sessionId}`}>Cancel</NavLink> */}
      </form>
    </>
  )
}

export default EditSessionForm
