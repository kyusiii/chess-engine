import { Cell } from "./cell";
import { BoardDimensions } from "./constants";
import { Piece } from "./piece";
export class Chess {
    board: Cell[][];

    constructor() {
        this.board = this.generateNewBoard();
    }

    generateNewBoard(): Cell[][] {
        let newBoard: Cell[][] = [];
        let tempCellCounter: number = 0;

        for (let x=0; x<BoardDimensions.x; x++) {
            newBoard[x] = [];
            for (let y=0; y<BoardDimensions.y; y++) {
                let newPiece: Piece = {
                    name: "rock",
                    chessNotation: "R",
                    availableMovements: [],
                    specialMovements: [],
                    x: x,
                    y: y
                };

                let newCell: Cell = {
                    chessNotation: this.numberToLetter(x) + y,
                    color: tempCellCounter%2,
                    currentPiece: newPiece,
                    xBoardPos: x,
                    yBoardPos: y
                };

                newBoard[x][y] = newCell;

                tempCellCounter++;
            }
        }

        return newBoard;
    }

    printBoard(): void {
        let toPrint = "";
        
        for (let x=0; x<BoardDimensions.x; x++) {
            for (let y=0; y<BoardDimensions.y; y++) {
                toPrint += (" (" + this.board[x][y].chessNotation + ", " + this.board[x][y].currentPiece.name + ") ");
            }

            toPrint += "\n";
        }

        console.log(toPrint);
    }

    private numberToLetter(number: number): string {
        switch(number) {
            case 0: return "A";
            case 1: return "B";
            case 2: return "C";
            case 3: return "D";
            case 4: return "E";
            case 5: return "F";
            case 6: return "G";
            case 7: return "H";
            default: return "#"
        }
    }
}