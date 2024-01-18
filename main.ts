import { Chess } from "./chess";

let pos = {x: 1, y: 4};
let game = new Chess();

game.printBoard();

console.log(game.getBoardCell(pos).currentPiece);
console.log(game.calculateAvailablesMoves(game.getBoardCell(pos).currentPiece));