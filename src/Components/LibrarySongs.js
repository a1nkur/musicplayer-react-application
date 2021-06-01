const LibrarySongs = ({ eachSong, setCurrentSong, songs }) => {
  const handleCurrentSong = e => {
    const selectedSong = songs.filter(item => item.id === eachSong.id);
    setCurrentSong(selectedSong[0]);
  };

  return (
    <div className="library-song" onClick={handleCurrentSong}>
      <img src={eachSong.cover} alt={eachSong.name} />
      <div className="song-description">
        <h3>{eachSong.name}</h3>
        <h4>{eachSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySongs;
