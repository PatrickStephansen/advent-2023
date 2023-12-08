import { fileToString } from "./read-input-file.js";

const extractColourValue = colour => drawString => +drawString.match(new RegExp(`(\\d+) ${colour}`, 'i'))?.[1] || 0;

const parseInput = text => text.split('\n').map(g => ({
    gameId: +g.match(/(?<=Game )\d+(?=\:)/)[0],
    draws: g.slice('Game: '.length)
        .split(';')
        .map(d => ({ red: extractColourValue('red')(d), green: extractColourValue('green')(d), blue: extractColourValue('blue')(d) }))
}));

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const games = parseInput(fileToString('day-2.txt'));

const possibleGames = games.filter(g => g.draws.every(d => d.red <= maxRed && d.green <= maxGreen && d.blue <= maxBlue));
const possibleGamesIdSum = possibleGames.reduce((sum, game) => sum + game.gameId, 0);

console.log('part 1', possibleGamesIdSum);

const powerSum = games.reduce((sum, game) => sum + game.draws.reduce((minCubes, draw) => [Math.max(minCubes[0], draw.red), Math.max(minCubes[1], draw.green), Math.max(minCubes[2], draw.blue)], [0, 0, 0]).reduce((power, colourCubes) => power * colourCubes), 0)
console.log('part 2', powerSum);