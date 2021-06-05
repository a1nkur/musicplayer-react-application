import { useState, useRef } from "react";
import "./Styles/App.scss";
import Song from "./Components/Song";
import Player from "./Components/Player";
import chillHop from "./Utility/data";
import Library from "./Components/Library";
import Nav from "./Components/Nav";

function App() {
  // States
  const [songs, setSongs] = useState(chillHop()); // array of all the songs
  const [currentSong, setCurrentSong] = useState(songs[0]); // default song
  const [isPlaying, setIsPlaying] = useState(false); // state to toggle between Play() and Pause()
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Ref
  const audioRef = useRef(null); // Initiated useRef hook, null is passed because we dont want anything solid in here right now.

  // Event Handlers
  const timeUpdateHandler = e => {
    let duration = e.target.duration;
    let currentTime = e.target.currentTime;

    setSongInfo({
      currentTime: currentTime,
      duration: duration,
    });
  };

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
      />
    </div>
  );
}

export default App;
