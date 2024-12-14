// this file is for debug purpose only
// utilisation of this module should only be from chess.ts

import { Chess } from "./src/chess";

let pos = { x: 3, y: 7 };
let targetPos = { x: 4, y: 6 };
let game = new Chess();

let piece = game.getBoardCell(pos).currentPiece;
// console.log(piece);
// game.printBoard();
game.movePiece(piece, targetPos);
// game.printBoard();
console.log(game.getState());

// game.movePiece(piece, { x: 4, y: 6 });
// console.log(game.getState());
