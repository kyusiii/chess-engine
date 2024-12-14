This project is a typescript class chess engine.

## To use the module :

npm install chess-engine-class

# or

yarn add chess-engine-class

The engine will be installed in your project.

# Utilisation : 

import { Chess } from "chess-engine-class/src/chess";

let game = new Chess();

# Index of cells are mades as this :

 1 2 3 4 5 6 7 8
A 1            
B
C
D
E
F
G
H 7

# Move piece like this :

let pos = { x: 3, y: 7 };
let piece = game.getBoardCell(pos).currentPiece;
game.movePiece(piece, targetPos);