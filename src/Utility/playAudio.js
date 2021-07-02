export default function playAudio(isPlaying, audioRef) {
  if (isPlaying) {
    const audioPromise = audioRef.current.play();

    if (audioPromise !== undefined) {
      audioPromise.then(audio => audioRef.current.play());
    }
  }
}
