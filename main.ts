import { Chess } from "./chess";

let pos = { x: 0, y: 1 };
let targetPos = { x: 0, y: 3 };
let game = new Chess();

let piece = game.getBoardCell(pos).currentPiece;

game.calculateAvailablesMoves(piece)

game.movePiece(piece, targetPos);
