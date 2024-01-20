import { Cell } from "./types/cell";
import {
  BoardDimensions,
  CampColors,
  DefaultBoard,
  DefaultPieces,
} from "./constants";
import { Piece } from "./types/piece";
import { Position } from "./types/position";
import { Movement, MovementType } from "./types/movement";

export class Chess {
  private board: Cell[][];
  private turn: boolean; //true = white

  constructor() {
    this.board = this.generateNewBoard();
    this.turn = true;
  }

  generateNewBoard(): Cell[][] {
    let newBoard: Cell[][] = [];
    let tempCellCounter: number = 0;

    for (let x = 0; x < BoardDimensions.x; x++) {
      newBoard[x] = [];
      for (let y = 0; y < BoardDimensions.y; y++) {
        const defaultPiece = DefaultBoard[x][y];
        defaultPiece.position = { x: y, y: x };

        let newCell: Cell = {
          id: y + x,
          chessNotation: this.numberToLetter(y) + (BoardDimensions.x - 1 - x),
          color: (tempCellCounter + x) % 2,
          currentPiece: defaultPiece,
          position: { x: y, y: x },
          isAvailable: false,
        };

        newBoard[x][y] = newCell;

        tempCellCounter++;
      }
    }

    return newBoard;
  }

  getTurn(): boolean {
    return this.turn;
  }

  getBoard(): Cell[][] {
    return this.board;
  }

  printBoard(): void {
    let toPrint = "";

    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        toPrint +=
          " (" +
          this.board[x][y].chessNotation +
          ", " +
          this.board[x][y].currentPiece.chessNotation +
          ", " +
          y +
          " " +
          x +
          ") ";
      }

      toPrint += "\n";
    }

    console.log(toPrint);
  }

  resetGame(): void {
    this.board = this.generateNewBoard();
  }

  calculateAvailablesMoves(piece: Piece): Movement[] {
    let moves: Movement[] = [];

    piece.availableMovements.forEach((mov: string) => {
      switch (mov) {
        case "lines":
          for (let x = 1; x <= BoardDimensions.x + 1; x++) {
            let targetPos: Position = {
              x: piece.position.x + x,
              y: piece.position.y,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.XLINERIGHT,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }

          for (let x = 1; x <= BoardDimensions.x + 1; x++) {
            let targetPos: Position = {
              x: piece.position.x - x,
              y: piece.position.y,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.XLINELEFT,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }

          for (let y = 1; y <= BoardDimensions.y + 1; y++) {
            let targetPos: Position = {
              x: piece.position.x,
              y: piece.position.y + y,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.YLINEFORW,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }

          for (let y = 1; y <= BoardDimensions.y + 1; y++) {
            let targetPos: Position = {
              x: piece.position.x,
              y: piece.position.y - y,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.YLINEBACK,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }
          break;
        case "diags":
          for (let x = 1; x <= BoardDimensions.x + 1; x++) {
            let targetPos: Position = {
              x: piece.position.x + x,
              y: piece.position.y + x,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.RDIAGFORW,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }

          for (let x = 1; x <= BoardDimensions.x + 1; x++) {
            let targetPos: Position = {
              x: piece.position.x - x,
              y: piece.position.y - x,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.LDIAGBACK,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }

          for (let x = 1; x <= BoardDimensions.x + 1; x++) {
            let targetPos: Position = {
              x: piece.position.x + x,
              y: piece.position.y - x,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.LDIAGFORW,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }

          for (let x = 1; x <= BoardDimensions.x + 1; x++) {
            let targetPos: Position = {
              x: piece.position.x - x,
              y: piece.position.y + x,
            };
            let targetMov: Movement = {
              to: targetPos,
              type: MovementType.RDIAGBACK,
            };

            if (this.isAvailableMove(piece, targetMov)) {
              moves.push(targetMov);
            }

            if (this.isBlocked(piece, targetMov)) break;
          }
          break;
        default:
          let a = mov.split(",");
          let targetPos: Position = {
            x: piece.position.x,
            y: piece.position.y,
          };
          let targetMov: Movement = {
            to: targetPos,
            type: MovementType.DEFAULT,
          };

          a.forEach((element: string) => {
            let axis = element.charAt(0);
            let plusOrMin = element.charAt(1);
            let value = element.charAt(2);

            if (axis == "x") {
              if (piece.color == CampColors.WHITE) {
                if (plusOrMin == "+") {
                  targetPos.x = targetPos.x + Number.parseInt(value);
                } else {
                  targetPos.x = targetPos.x - Number.parseInt(value);
                }
              } else {
                if (plusOrMin == "+") {
                  targetPos.x = targetPos.x - Number.parseInt(value);
                } else {
                  targetPos.x = targetPos.x + Number.parseInt(value);
                }
              }
            } else {
              if (piece.color == CampColors.WHITE) {
                if (plusOrMin == "+") {
                  targetPos.y = targetPos.y + Number.parseInt(value);
                } else {
                  targetPos.y = targetPos.y - Number.parseInt(value);
                }
              } else {
                if (plusOrMin == "+") {
                  targetPos.y = targetPos.y - Number.parseInt(value);
                } else {
                  targetPos.y = targetPos.y + Number.parseInt(value);
                }
              }
            }
          });

          if (this.isAvailableMove(piece, targetMov)) moves.push(targetMov);
      }
    });

    if (piece.chessNotation == "P") {
      if (!piece.hasMoved) {
        if (piece.color == CampColors.WHITE) {
          moves.push({
            to: { x: piece.position.x, y: piece.position.y + 2 },
            type: MovementType.DEFAULT,
          });
        } else {
          moves.push({
            to: { x: piece.position.x, y: piece.position.y - 2 },
            type: MovementType.DEFAULT,
          });
        }
      }

      let takablePieces = this.getTakablePiecesByPawn(piece);
      if (takablePieces && takablePieces.length > 0) {
        moves = moves.concat(takablePieces);
      }
    }

    piece.calculateAvailableMovements = moves.map((m) => m.to);

    moves.forEach((move) => {
      let cell = this.getBoardCell(move.to);
      cell.isAvailable = true;
    });

    return moves;
  }

  cleanAvailableCells() {
    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let cell = this.getBoardCell({ x: x, y: y });
        if (cell.isAvailable) {
          cell.isAvailable = false;
        }
      }
    }
  }

  movePiece(piece: Piece, to: Position) {
    if (
      piece.calculateAvailableMovements &&
      piece.calculateAvailableMovements.find((t) =>
        this.isEqualPositions(t, to)
      ) == undefined
    ) {
      console.log("Cant move ", piece.name, " to ", to, " : not allowed");
      return;
    }

    let currentCell = this.getBoardCell(piece.position);
    let targetCell = this.getBoardCell(to);

    piece.position = { x: to.x, y: to.y };
    piece.hasMoved = true;
    targetCell.currentPiece = piece;
    currentCell.currentPiece = { ...DefaultPieces.NONE, color: null };
  }

  private isAvailableMove(piece: Piece, move: Movement): boolean {
    if (this.isOutOfBoard(move)) return false;
    if (this.isEqualPositions(move.to, piece.position)) return false;
    if (
      this.getBoardCell(move.to).currentPiece.chessNotation != "-" &&
      this.getBoardCell(move.to).currentPiece.color == piece.color
    )
      return false;

    return true;
  }

  private isOutOfBoard(move: Movement) {
    if (
      move.to.x >= BoardDimensions.x ||
      move.to.x < 0 ||
      move.to.y >= BoardDimensions.y ||
      move.to.y < 0
    ) {
      return true;
    }
  }

  private isEqualPositions(pos1: Position, pos2: Position) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
  }

  getBoardCell(position: Position) {
    return this.board[position.y][position.x];
  }

  private isBlocked(piece: Piece, move: Movement) {
    if (this.isOutOfBoard(move)) return true;

    let cell = this.getBoardCell({ x: move.to.x, y: move.to.y });
    return cell.currentPiece.chessNotation != "-";
  }

  private getTakablePiecesByPawn(piece: Piece): Movement[] {
    if (piece.chessNotation != "P") return [];

    let moves: Movement[] = [];
    let movesToTest: Movement[] = [];

    if (piece.color == CampColors.WHITE) {
      movesToTest = [
        {
          to: {
            x: piece.position.x + 1,
            y: piece.position.y + 1,
          },
          type: MovementType.RDIAGFORW,
        },
        {
          to: {
            x: piece.position.x - 1,
            y: piece.position.y + 1,
          },
          type: MovementType.RDIAGFORW,
        },
      ];
    } else {
      movesToTest = [
        {
          to: {
            x: piece.position.x - 1,
            y: piece.position.y - 1,
          },
          type: MovementType.RDIAGFORW,
        },
        {
          to: {
            x: piece.position.x + 1,
            y: piece.position.y - 1,
          },
          type: MovementType.RDIAGFORW,
        },
      ];
    }

    for (let move of movesToTest) {
      if (this.isOutOfBoard(move)) continue;

      let cell = this.getBoardCell(move.to);
      if (this.hasEnemyPiece(cell, piece)) {
        moves.push({
          to: move.to,
          type: MovementType.DEFAULT,
        });
      }
    }

    return moves;
  }

  private hasEnemyPiece(cell: Cell, piece: Piece): boolean {
    if (cell.currentPiece.color == null) return false;
    if (cell.currentPiece.color == piece.color) return false;

    return true;
  }

  private numberToLetter(number: number): string {
    switch (number) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "G";
      case 7:
        return "H";
      default:
        return "#";
    }
  }
}
