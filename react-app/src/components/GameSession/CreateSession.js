import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startSessionThunk } from '../../store/gameSession';

function CreateSession() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [location, setLocation] = useState('')
  const [game, setGame] = useState('')
  const [description, setDescription] = useState('')
  const [pic, setPic] = useState('https://i2.wp.com/s802022855.onlinehome.us/wp-content/uploads/2014/12/settlers_startgame.jpg')
  const [players, setPlayers] = useState(0)
  const [errors, setErrors] = useState([])

  const updateLocation = (e) => setLocation(e.target.value)
  const updateGame = (e) => setGame(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePic = (e) => setPic(e.target.value)
  const updatePlayers = (e) => setPlayers(e.target.value)

  useEffect(() => {
    let errors = []
    if (location.length < 3) errors.push("Location name is too short!")
    if (location.length > 50) errors.push("Location name is too long!")
    if (game.length < 1) errors.push("Please give the name of your game!")
    if (game.length > 50) errors.push("Please shorten the name of your game!")
    if (description.length > 2000) errors.push("Please leave a shorter description!")
    if (!pic.endsWith(".jpg") || !pic.endsWith(".png")) errors.push("Please submit a picture that is a PNG or JPG file!")
    if (players < 2) errors.push("Number of players must be 2 or higher!")

    setErrors(errors)
  }, [location, game, description, pic, players])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      location,
      game,
      description,
      pic,
      players
    }

    console.log(payload)

    await dispatch(startSessionThunk(payload))
    history.push("/sessions")

    // try {
    //   await dispatch(startSessionThunk(payload))
    //   history.push("/sessions")
    // } catch {
    //   return dispatch(startSessionThunk(payload)).catch(async (res) => {
    //     const data = await res.json()
    //     if (data && data.errors) setErrors(data.errors)
    //   })
    // }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Where is your game session located?</p>
        <input
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={updateLocation}
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
          value={pic}
          onChange={updatePic}
        />
        <p>How many players are needed?</p>
        <input
          type="number"
          placeholder="Number of players"
          required
          value={players}
          onChange={updatePlayers}
        />
        <button type="submit">Create your session!</button>
      </form>
    </>
  )
}

export default CreateSession
