// This component describes the music controller - play, skip-forward, skip-backward, slider.
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Gives React Component for icons
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import getFormattedTime from "../Utility/formatTime";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // Ref
  const audioRef = useRef(null); // Initiated useRef hook, null is passed because we dont want anything solid in here right now.

  // State data for Time on player
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
  });

  // Event Handlers
  const songPlayHandler = () => {
    console.log(audioRef); // > { current: audio }

    // Upon play icon click we invoke the play function
    if (isPlaying) {
      audioRef.current.pause(); // Play audio
      setIsPlaying(false);
    } else {
      audioRef.current.play(); // Pause audio
      setIsPlaying(true);
    }
  };

  const timeUpdateHandler = e => {
    let duration = e.target.duration;
    let currentTime = e.target.currentTime;

    setSongInfo({
      currentTime: currentTime,
      duration: duration,
    });
  };

  const onDragHandler = e => {
    // Change the actual audio playtime
    audioRef.current.currentTime = e.target.value;

    // Change state with the update current time upon onDragChange so that slider can work
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player-container">
      <div className="time-controller">
        <p>{getFormattedTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={onDragHandler}
        />
        <p>{getFormattedTime(songInfo.duration)}</p>
      </div>
      <div className="play-controller">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={songPlayHandler}
        />
        <FontAwesomeIcon className="skip-right" icon={faAngleRight} size="2x" />
      </div>
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
      />{" "}
    </div>
  );
};

export default Player;

// <audio></audio> => An audio HTML Element
// <audio> prop=onTimeUpdate is a special eventHandler for audio html element. It is fired everytime the Time changes for the played audio.

// to render the duration of track in UI during the first render on the component, we have a much efficient prop callled onLoadedMetadata which will fire an event containing the duration property when the audio element loads up in the browser.
// <audio> prop= onLoadedMetadata={timeUpdateHandler} -> When the audio file loads up, it automatically sets the data.
