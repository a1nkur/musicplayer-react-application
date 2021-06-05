// This component describes the music controller - play, skip-forward, skip-backward, slider.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Gives React Component for icons
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import getFormattedTime from "../Utility/formatTime";

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  // State data for Time on player

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
    let currentIndex = songs.findIndex(item => item.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === 1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
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
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={onDragHandler}
        />
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
