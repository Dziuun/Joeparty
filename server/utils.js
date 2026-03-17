/* Get an array of x random unrepeated numbers*/
// TODO https://www.seanmcp.com/articles/replace-math-random-with-crypto-in-javascript/
// TODO https://security.stackexchange.com/questions/181580/why-is-math-random-not-designed-to-be-cryptographically-secure
function getRandomIndexNumber(x) {
  let r = Math.trunc(Math.random() * x);

  return r;
}

export { getRandomIndexNumber };
