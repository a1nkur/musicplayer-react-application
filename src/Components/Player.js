// This component describes the music controller - play, skip-forward, skip-backward, slider.
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Gives Component for Icons
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = () => {
  return (
    <div className="player-container">
      <div className="time-controller">
        <p>start time</p>
        <input type="range" />
        <p>end time</p>
      </div>
      <div className="play-controller">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
        <FontAwesomeIcon className="play" icon={faPlay} size="2x" />
        <FontAwesomeIcon className="skip-right" icon={faAngleRight} size="2x" />
      </div>
    </div>
  );
};

export default Player;
