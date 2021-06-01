import { v4 as uuidv4 } from "uuid";

import LibrarySongs from "./LibrarySongs";

const Library = ({ songs, setCurrentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(eachSong => (
          <LibrarySongs
            eachSong={eachSong}
            key={uuidv4()}
            songs={songs}
            setCurrentSong={setCurrentSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
