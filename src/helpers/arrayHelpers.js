export const helperShuffleArray = (array) => {
  let shuffledArr = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let aux = shuffledArr[i];
    shuffledArr[i] = shuffledArr[j];
    shuffledArr[j] = aux;
  }
  return shuffledArr;
}
