import { useState } from "react";
import "./Styles/App.scss";
import CurrentSong from "./Components/CurrentSong";
import Player from "./Components/Player";
import chillHop from "./Data/data";

function App() {
  const [songs, setSongs] = useState(chillHop());
  const [defaultSong, setDefaultSong] = useState(songs[2]);

  return (
    <div className="App">
      <CurrentSong defaultSong={defaultSong} />
      <Player />
    </div>
  );
}

export default App;
