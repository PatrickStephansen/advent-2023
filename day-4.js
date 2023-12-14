import { fileToString } from "./read-input-file.js";

const input = fileToString("./day-4-example.txt")
  .split("\n")
  .filter((x) => x)
  .map((row) => ({
    cardNumber: +row.match(/^Card\s+(\d+)/)[1],
    winningNumbers: row
      .split(":")[1]
      .split("|")[0]
      .split(" ")
      .filter((x) => x)
      .map((n) => +n),
    pickedNumbers: row
      .split(":")[1]
      .split("|")[1]
      .split(" ")
      .filter((x) => x)
      .map((n) => +n),
  }));

const scoreCard = (card) =>
  Math.floor(
    2 **
      (card.winningNumbers.filter((w) =>
        card.pickedNumbers.some((p) => p === w)
      ).length -
        1)
  );

console.log(
  "part 1",
  input.reduce((sum, card) => sum + scoreCard(card), 0)
);

const countWinningNumbers = (card) =>
  card.winningNumbers.filter((w) => card.pickedNumbers.some((p) => p === w))
    .length;

// the copies are cascading wrong
const addCopies = (n, cardIndex, cardCopies) =>
  cardCopies.map((c, i) => c + ((i > cardIndex && i <= cardIndex + n)*c));

const numberOfCopiesByIndex = input.reduce(
  (copies, card, cardIndex) =>
    addCopies(countWinningNumbers(card), cardIndex, copies),
  Array.from(input, () => 1)
);

console.log(
  "part 2",
  numberOfCopiesByIndex.reduce((sum, copies) => sum + copies)
);
