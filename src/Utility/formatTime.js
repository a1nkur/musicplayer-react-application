// Utility function to format time in minutes and secondss

const getFormattedTime = time => {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
};

export default getFormattedTime;
