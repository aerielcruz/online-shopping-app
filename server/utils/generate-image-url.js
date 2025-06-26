const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateImageUrl = (seed) => {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundType=gradientLinear&backgroundColor=${getRandomColor()},${getRandomColor()}`;
}
