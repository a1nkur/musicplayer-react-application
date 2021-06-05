const LibrarySongs = ({
  eachSong,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const handleCurrentSong = e => {
    const selectedSong = songs.filter(item => item.id === eachSong.id);
    setCurrentSong(selectedSong[0]);

    if (isPlaying) {
      const audioPromise = audioRef.current.play();
      if (audioPromise !== undefined) {
        audioPromise.then(audio => audioRef.current.play());
      }
    }

    // Show selected song
    const newSongArr = songs.map(eachItem => {
      if (eachItem.id === eachSong.id) {
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
  };

  return (
    <div
      className={`library-song ${eachSong.active ? "selected" : ""}`}
      onClick={handleCurrentSong}
    >
      <img src={eachSong.cover} alt={eachSong.name} />
      <div className="song-description">
        <h3>{eachSong.name}</h3>
        <h4>{eachSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySongs;
