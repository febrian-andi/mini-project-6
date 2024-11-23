function formatTime(time) {
  const date = new Date(time);

  date.setHours(date.getHours() + 7);

  const hours = String(date.getHours()).padStart(2, '0'); 
  const minutes = String(date.getMinutes()).padStart(2, '0'); 

  return `${hours}.${minutes}`;
}

export default formatTime;