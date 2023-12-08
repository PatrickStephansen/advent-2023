import { fileToString } from "./read-input-file.js";

const parseInput = (text) =>
  text
    .split("\n")
    .flatMap((line, lineNumber) =>
      [...line].reduce(
        (lineInfo, character, characterIndex, row) => {
          if (/\d/.test(character)) {
            if (lineInfo.partialPartNumber?.partNumber == null) {
              lineInfo.partialPartNumber = {
                partNumber: character,
                startIndex: characterIndex,
              };
            } else {
              lineInfo.partialPartNumber.partNumber += character;
            }
          }
          if (!/\d/.test(character) || characterIndex === row.length - 1) {
            if (lineInfo.partialPartNumber?.partNumber != null) {
              lineInfo.partNumbers = [
                ...lineInfo.partNumbers,
                {
                  partNumber: lineInfo.partialPartNumber.partNumber,
                  row: lineNumber,
                  column: lineInfo.partialPartNumber.startIndex,
                },
              ];
              lineInfo.partialPartNumber = {};
            }
          }
          if (/[^\d.]/.test(character)) {
            lineInfo.symbols = [
              ...lineInfo.symbols,
              { symbol: character, row: lineNumber, column: characterIndex },
            ];
          }

          return lineInfo;
        },
        { partNumbers: [], symbols: [], partialPartNumber: {} }
      )
    )
    .reduce(
      (schematic, lineInfo) => ({
        partNumbers: schematic.partNumbers.concat(lineInfo.partNumbers),
        symbols: schematic.symbols.concat(lineInfo.symbols),
      }),
      { partNumbers: [], symbols: [] }
    );

const getMatchingSymbols = (symbols) => (row, column, length) =>
  symbols.filter(
    (symbol) =>
      Math.abs(symbol.row - row) <= 1 &&
      column + length - 1 - symbol.column >= -1 &&
      symbol.column - column >= -1
  );

const { partNumbers, symbols } = parseInput(fileToString("./day-3.txt"));

const matchSymbols = getMatchingSymbols(symbols);

const partNumbersMatchingSymbols = partNumbers.map((p) => ({
  part: p,
  symbols: matchSymbols(p.row, p.column, p.partNumber.length),
}));

const partsWithSymbols = partNumbersMatchingSymbols.filter(
  (p) => p.symbols.length
);

console.log(
  "parts sum",
  partsWithSymbols.reduce((sum, part) => sum + +part.part.partNumber, 0)
);
const gears = symbols.filter((s) => s.symbol === "*");
const getMatchingParts = (symbols) => (parts) =>
  symbols.map((s) => ({
    symbol: s,
    parts: parts.filter(
      (p) =>
        Math.abs(s.row - p.row) <= 1 &&
        p.column + p.partNumber.length - 1 - s.column >= -1 &&
        s.column - p.column >= -1
    ),
  }));
const gearRatios = getMatchingParts(gears)(partNumbers)
    .filter(m => m.parts.length === 2)
    .map(m => m.parts[0].partNumber * m.parts[1].partNumber);
console.log("gear ratio sum", gearRatios.reduce((sum, gearRatio) => sum + gearRatio, 0));
