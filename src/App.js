import { useState } from "react";
import "./Styles/App.scss";
import Song from "./Components/Song";
import Player from "./Components/Player";
import chillHop from "./Utility/data";
import Library from "./Components/Library";

function App() {
  const [songs, setSongs] = useState(chillHop()); // array of all the songs
  const [currentSong, setCurrentSong] = useState(songs[0]); // default song
  const [isPlaying, setIsPlaying] = useState(false); // state to toggle between Play() and Pause()

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
