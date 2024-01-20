import { Chess } from "./chess";

let pos = { x: 1, y: 0 };
let targetPos = { x: 0, y: 6 };
let game = new Chess();

game.printBoard();
game.calculateAvailablesMoves(game.getBoardCell(targetPos).currentPiece);
