function randomArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  randomArray: randomArray
};
