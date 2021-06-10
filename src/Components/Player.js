// This component describes the music controller - play, skip-forward, skip-backward, slider.

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Gives React Component for icons
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import getFormattedTime from "../Utility/formatTime";
import playAudio from "../Utility/playAudio";

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongs,
}) => {
  // useEffect
  useEffect(() => {
    // Show selected song in UI
    const newSongArr = songs.map(eachItem => {
      if (eachItem.id === currentSong.id) {
        return {
          ...eachItem,
          active: true,
        };
      } else {
        return {
          ...eachItem,
          active: false,
        };
      }
    });

    setSongs(newSongArr);
  }, [currentSong]);

  // Event Handlers
  const songPlayHandler = () => {
    //console.log(audioRef); > { current: audio }

    // Upon play icon click we invoke the play function
    if (isPlaying) {
      audioRef.current.pause(); // Play audio
      setIsPlaying(false);
    } else {
      // audioRef.current.play(); // Pause audio
      // setIsPlaying(true);
      const audioPromise = audioRef.current.play();
      if (audioPromise !== undefined) {
        audioPromise.then(audio => audioRef.current.play());
      }
      setIsPlaying(true);
    }
  };

  const onSkipHandler = direction => {
    // Finding the index of current song
    let currentIndex = songs.findIndex(item => item.id === currentSong.id);

    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]); // variable x % constant y = x; it is 0 only when x = y
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }

    playAudio(isPlaying, audioRef);
  };

  const onDragHandler = e => {
    // Change the actual audio playtime
    audioRef.current.currentTime = e.target.value;

    // Change state with the update current time upon onDragChange so that slider can work
    // setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player-container">
      <div className="time-controller">
        <p>{getFormattedTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={onDragHandler}
          />
          <div className="animate-track"></div>
        </div>

        <p>
          {getFormattedTime(songInfo.duration) === "NaN:aN"
            ? "0:00"
            : getFormattedTime(songInfo.duration)}
        </p>
      </div>
      <div className="play-controller">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => onSkipHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play-or-pause"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={songPlayHandler}
        />
        <FontAwesomeIcon
          className="skip-right"
          icon={faAngleRight}
          size="2x"
          onClick={() => onSkipHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;

// <audio></audio> => An audio HTML Element
// <audio> prop=onTimeUpdate is a special eventHandler for audio html element. It is fired everytime the Time changes for the played audio.

// to render the duration of track in UI during the first render on the component, we have a much efficient prop callled onLoadedMetadata which will fire an event containing the duration property when the audio element loads up in the browser.
// <audio> prop= onLoadedMetadata={timeUpdateHandler} -> When the audio file loads up, it automatically sets the data.
