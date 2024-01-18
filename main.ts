import { Chess } from "./chess";

let pos = {x: 1, y: 0};
let targetPos = {x: 1, y: 2};
let game = new Chess();

game.printBoard();

let piece = game.getBoardCell(pos).currentPiece
let availableMovements = game.calculateAvailablesMoves(piece);

console.log(availableMovements);
game.movePiece(piece, targetPos);

game.printBoard();