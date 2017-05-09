function randomChar() {
  return String.fromCharCode(Math.floor(Math.random() * 256));
}

function randomString(length) {
  let str = [];
  for (let i = 0; i < length; i++) {
    str.push(randomChar());
  }
  return str.join("");
}

function randomInteger(low, high) {
  return Math.floor(Math.random() * (high - low)) + low;
}

function randomAngle() {
  return Math.random() * 2 * Math.PI;
}
