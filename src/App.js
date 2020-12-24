import React, { useState, useCallback } from "react";
import "./App.css";
import { containerStyle } from "./style/style";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { center } from "./style/style";
import PersonalInfoWindow from "./components/personalinfo";
import * as M from "@material-ui/core";
import { cordinates } from "./components/favoriteplaces";
import Infowindow from "./components/infowindow";
import Hints from "./components/hintsdropdown";
import "dotenv"

const apiKey = process.env.GOOGLE_API_KEY 

function App() {
  const [score, setScore] = useState(0);
  const [inBounds, setInBounds] = useState(false);
  const [marker, setMarker] = useState([]);
  const [map, setMap] = useState(null);
  const [click, setClick] = useState(false);
  const [cordinate, setCordinate] = useState([]);
  const [gameIcon, setGameIcon] = useState(false);
  const [isWin, setWin] = useState(false);

  const onUnmount = useCallback(() => {
    // Clear the render if unmount
    setMap(null);
  }, []);

  const onLoad = (map) => {
    // get map props for global use
    setMap(map);
    // set the random cordinate
    setCordinate(cordinates);
  };

  // User clicks in map -> Set markers
  const markIcon = (e) => {
    setMarker((prev) => [
      ...prev,
      {
        lat_c: e.latLng.lat(),
        lng_c: e.latLng.lng(),
        id: Date.now(),
      },
    ]);
  };

  // Handles click --> filter markers by key value
  const handleMarkerClick = (id) => {
    setMarker(marker.filter((_, index) => index !== id));
  };

  // Handles the map bounds
  const handleBounds = () => {
    if (map.getZoom() === 7) {
      // display icon
      cordinate.forEach((item) => {
        if (map.getBounds().contains({ lat: item.lat, lng: item.lng })) {
          item.visible = true;
          setInBounds(!false);
          setGameIcon(!false);
        }
      });
    }
    if (map.getZoom() !== 7) {
      setInBounds(false);
    }
  };

  // handles click event for reset button
  const handleCheatClick = () => {
    cordinates.forEach((item) => {
      item.visible = true;
      setGameIcon(!false); // display all icons
    });
    setClick(!false);
    setScore((prev) => prev + 10); // Set score to 10
    map.panTo(center);
    map.setZoom(1);
  };

  // handles the click event for game icons
  const handleGameIconClick = () => {
    setGameIcon(!false);
    setScore((prev) => prev + 1);

    if (score === 10) {
      // reset game
      map.panTo(center);
      map.setZoom(7);
      setScore((prev) => (prev = 0));
      setGameIcon(false);
      setWin(!false);
    }
  };

  const handleMapDrag = () => setWin(false);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <M.Container maxWidth="x-lg" id="map-container">
        <Hints />
        <div className="map-inner-Container">
          <div className="header-container">
            {inBounds ? (
              <h1>You are close by!</h1>
            ) : (
              <h1>Try to find a location!</h1>
            )}

            {click ? <h2>You found all the locations!</h2> : null}
            {isWin ? <h2>You found all the locations!</h2> : null}
            <h2>Score:{score}</h2>
          </div>

          <GoogleMap
            id="google-map"
            onBoundsChanged={handleBounds}
            onUnmount={onUnmount}
            onLoad={onLoad}
            onDrag={handleMapDrag}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={7}
            onClick={markIcon}
          >
            {marker.map((m, id) => (
              <Marker
                key={id}
                position={{ lat: m.lat_c, lng: m.lng_c, id: m.id }}
                onClick={() => handleMarkerClick(id)}
              />
            ))}

            <div id="btn-container">
              <M.Button
                onClick={handleCheatClick}
                id="cheat-btn"
                variant="contained"
                color="default"
              >
                Cheat
              </M.Button>
              <M.Button
                id="reset-btn"
                variant="contained"
                color="default"
                href="/"
              >
                Reset
              </M.Button>
            </div>

            {gameIcon
              ? cordinates.map((index, id) => (
                  <Marker
                    onClick={handleGameIconClick}
                    key={id}
                    visible={index.visible}
                    position={{ lat: index.lat, lng: index.lng }}
                  />
                ))
              : null}

            <PersonalInfoWindow />
            <Infowindow />
          </GoogleMap>
        </div>
      </M.Container>
    </LoadScript>
  );
}

export default App;
