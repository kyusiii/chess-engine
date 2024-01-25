import { Chess } from "./chess";

let pos = { x: 0, y: 1 };
let targetPos = { x: 4, y: 1 };
let game = new Chess();

game.calculateAvailablesMoves(game.getBoardCell(pos).currentPiece)
