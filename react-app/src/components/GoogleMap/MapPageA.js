import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode"
import { useDispatch, useSelector } from 'react-redux';
import { getKeyThunk } from '../../store/gameSession';


const MapPageA = (locationAddress) => {
  const dispatch = useDispatch()
  const apiKey = useSelector((state) => (state.gameSession.apiKey))

  const [currentPosition, setCurrentPosition] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
  })

  const containerStyle = {
    width: '350px',
    height: '350px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (apiKey) {
    Geocode.setApiKey(apiKey.key)

    Geocode.setLanguage("en")
  }

  const getAddress = async () => {
    try {
      let address = Object.values(locationAddress)[0]
      const res = await Geocode.fromAddress(address)
      const { lat, lng } = res.results[0].geometry.location
      setCurrentPosition({ lat: lat, lng: lng })
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAddress()
    dispatch(getKeyThunk())
  }, [setCurrentPosition])

  return (
    // Important! Always set the container height explicitly

    <div className="map_page__container">

      <div style={{ height: '350px', width: '350px' }}>
        {isLoaded && currentPosition ? <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          center={currentPosition}
          onUnmount={onUnmount}
        >
          <Marker
            position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
            icon={{
              path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
              fillOpacity: 1,
              scale: .2,
              strokeColor: 'gold',
              strokeWeight: 2
            }}
            streetView={false} >

            {/* <InfoWindow position={{ lat: currentPosition.lat, lng: currentPosition.lng }} >
              <div>
                <span style={{ color: `red` }}>{locationAddress.name}</span>
              </div>
            </InfoWindow> */}
          </Marker>

        </GoogleMap> : null}
      </div>

    </div>
  );

}

export default MapPageA
