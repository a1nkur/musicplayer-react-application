// This component describes the currently playing song image, song name and artist name.

import React from "react";

const CurrentSong = ({ defaultSong }) => {
  return (
    <div className="currentsong-container">
      <img src={defaultSong.cover} alt="Cover Picture" />
      <h2>{defaultSong.name}</h2>
      <h3>{defaultSong.artist}</h3>
    </div>
  );
};
 
export default CurrentSong;