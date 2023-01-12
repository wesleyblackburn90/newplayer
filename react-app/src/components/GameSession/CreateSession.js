import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startSessionThunk } from '../../store/gameSession';
import './CreateSession.css'
import DateTimePicker from 'react-datetime-picker'

function CreateSession() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [location_name, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('Alabama')
  const [zip_code, setZipCode] = useState('')
  const [game, setGame] = useState('')
  const [description, setDescription] = useState('')
  let [pic_url, setPic] = useState('')
  const [pic_url_loading, setPicLoading] = useState(false)
  const [players_num, setPlayers] = useState(2)
  const [errors, setErrors] = useState([])
  const [date_time, setDateTime] = useState(new Date())

  const updateLocation = (e) => setLocation(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateZipCode = (e) => setZipCode(e.target.value)
  const updateGame = (e) => setGame(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePic = (e) => {
    const file = e.target.files[0]
    if (file) setPic(file)
  }
  const updatePlayers = (e) => setPlayers(e.target.value)
  // console.log(date_time.toISOString().slice(0, 10) + " " + date_time.toISOString().slice(11, 19))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!pic_url) {
      pic_url = "/static/boardgame.jpg"
    }


    const payload = {
      organizer_id: sessionUser.id,
      location_name,
      address,
      city,
      state,
      zip_code,
      date_time: date_time.toISOString().slice(0, 10) + " " + date_time.toISOString().slice(11, 19),
      game,
      description,
      pic_url,
      players_num
    }

    try {
      console.log(payload)
      const newSession = await dispatch(startSessionThunk(payload))
      if (newSession) {
        console.log(newSession)
        history.push(`/sessions/${newSession.session.id}`)
      }
    } catch (err) {
      // let newErrors
      // let prettyErrors
      // if (err) {
      //   let errorArr = Object.values(err)
      //   newErrors = Object.values(errorArr[0]).map((error) => error.split(":"))
      //   if (newErrors) {
      //     prettyErrors = Object.values(newErrors).map((error) => error[1])
      //   }
      // }
      setErrors(err)
    }
  }

  return (
    <>
      <div id="create-session-page">
        <div id="create-session-wrapper">
          <div id="create-session-div">
            <form id="create-session-form" onSubmit={handleSubmit}>
              <p>Where is the name of the location of the game session? </p>
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
              <p>What game will you be playing, dingus?</p>
              <input
                type="text"
                placeholder="Game"
                required
                value={game}
                onChange={updateGame}
              />
              <p>When will you be playing?</p>
              <DateTimePicker onChange={setDateTime} value={date_time} />
              <p>Please describe the details of your game session!</p>
              <input
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={updateDescription}
              />
              <p>Please add an image of your event!</p>
              <input
                type="file"
                accept="image/*"
                onChange={updatePic}
              />
              <p>How many players are needed?</p>
              <input
                type="number"
                placeholder="2"
                required
                value={players_num}
                onChange={updatePlayers}
              />
              <p style={{ "font-style": "italic" }}>All fields are required</p>
              <button className="button" type="submit">Create your session!</button>
            </form>
          </div>
          {errors.length ?
            <div id='create-errors-div'>
              {errors.length > 0 &&
                <ul>
                  {errors?.map((error) => (
                    <p style={{ "color": "red" }}> * {error} </p>
                  ))}
                </ul>
              }
            </div>
            :
            <h1>Get your session started today!</h1>
          }
        </div>
      </div>
    </>
  )
}

export default CreateSession
