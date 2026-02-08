/* Get an array of x random unrepeated numbers*/

function getRandomIndexNumber(x) {
  let r = Math.trunc(Math.random() * x);

  return r;
}

export { getRandomIndexNumber };
