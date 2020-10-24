import React from "react";
import { InfoWindow } from "@react-google-maps/api";

function Infowindow() {
  const infoWindowPosition = { lat: 41.604468, lng: -88.080754 };
  return (
    <InfoWindow id="info-window-container" position={infoWindowPosition}>
      <div className="info-window">
        <h2 className="info-window-heading">Welcome to Map Mania!</h2>
        <p>
          1. You can use the <em>hints drop down</em> to the <em>left</em> to
          start!
          <br />
          2. <em>Inbounds</em> of the location will display the icon.
          <br />
          3. <em>Clicking </em>the icon will add 1 point to your score.
          <br />
          4. Finding <em>all</em> the locations will result in a win!
          <br />
          5.<em>Cheat button</em> will automatically display all locations/ win
          the game!
          <br />
          4. <em>Reset button</em> will reset the entire game.
        </p>
      </div>
    </InfoWindow>
  );
}

export default Infowindow;
