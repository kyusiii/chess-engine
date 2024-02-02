import { Chess } from "./chess";

let pos = { x: 3, y: 7 };
let targetPos = { x: 0, y: 4 };
let game = new Chess();

let piece = game.getBoardCell(pos).currentPiece;
game.printBoard();
game.movePiece(piece, targetPos);
game.printBoard();
console.log(
  game.getBoardCell({ x: 3, y: 0 }).currentPiece.calculateAvailableMovements
);
