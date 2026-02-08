/* Get an array of x random unrepeated numbers*/

function getRandomIndexArray(x = 6) {
  let arr = [];
  for (let i = 0; i < x; ) {
    let r = Math.trunc(Math.random() * (x - 1));

    if (!arr.includes(r)) {
      arr[i] = r;
      i++;
    }
  }
  console.log(arr);
  return arr;
}

function getRandomIndexNumber(x) {
  let r = Math.trunc(Math.random() * (x - 1));

  return r;
}

export { getRandomIndexArray, getRandomIndexNumber };
