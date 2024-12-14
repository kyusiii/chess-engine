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
import { State } from "./types/state";

export class Chess {
  private board: Cell[][];
  private turn: CampColors;
  private isGameOver: boolean;

  constructor() {
    this.board = this.generateNewBoard();
    this.turn = CampColors.WHITE;
    this.isGameOver = false;
    this.calculeFirstAvailableMoves(true);
    this.updateAttackedCells();
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
          isUnderAttack: false,
        };

        newBoard[x][y] = newCell;

        tempCellCounter++;
      }
    }

    return newBoard;
  }

  calculeFirstAvailableMoves(isInit: boolean = false) {
    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let cell = this.getBoardCell({ x: x, y: y });
        if (cell.currentPiece.color != this.turn && !isInit) continue;
        this.calculateAvailablesMoves(cell.currentPiece);
      }
    }
  }

  updateAttackedCells() {
    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let cell = this.getBoardCell({ x: x, y: y });
        cell.isUnderAttack = false;
        cell.currentPiece.isChecked = false;
      }
    }

    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let cell = this.getBoardCell({ x: x, y: y });

        if (cell.chessNotation == "-" || cell.currentPiece.color != this.turn)
          continue;

        if (
          cell.currentPiece.calculatedAvailableMovements &&
          cell.currentPiece.calculatedAvailableMovements.length > 0
        ) {
          for (let move of cell.currentPiece.calculatedAvailableMovements) {
            let nextCell = this.getBoardCell(move.to);
            nextCell.isUnderAttack = true;

            if (nextCell.currentPiece.chessNotation == "K") {
              nextCell.currentPiece.isChecked = true;
            }
          }
        }
      }
    }
  }

  getTurn(): CampColors {
    return this.turn;
  }

  getState(): State {
    let winner;
    if (this.isGameOver) {
      winner = this.getOppositeColor(this.turn);
    }

    return {
      board: this.getBoard(),
      turn: this.turn,
      isGameOver: this.isGameOver,
      winner: winner,
    };
  }

  private getBoard(): Cell[][] {
    return this.board;
  }

  setOppositeTurn(): void {
    if (this.turn == CampColors.BLACK) this.turn = CampColors.WHITE;
    else this.turn = CampColors.BLACK;
  }

  getOppositeColor(color: CampColors): CampColors {
    if (color == CampColors.BLACK) return CampColors.WHITE;
    return CampColors.BLACK;
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

  isOppositeKingChecked(enemyColor: CampColors): boolean {
    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let piece = this.board[y][x].currentPiece;
        if (piece.chessNotation == "K" && piece.color == enemyColor) {
          if (piece.isChecked) return true;
        }
      }
    }

    return false;
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
          if (piece.chessNotation == "P") {
            let nextFrontCell: Cell;
            if (piece.color == CampColors.BLACK) {
              nextFrontCell = this.getBoardCell({
                x: piece.position.x,
                y: piece.position.y + 1,
              });
            } else {
              nextFrontCell = this.getBoardCell({
                x: piece.position.x,
                y: piece.position.y - 1,
              });
            }
            if (
              nextFrontCell.currentPiece.chessNotation != "-" &&
              nextFrontCell.currentPiece.color != piece.color
            ) {
              //if next front cell of pawn has enemy piece
              break;
            }
          }

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
              if (piece.color == CampColors.BLACK) {
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
              if (piece.color == CampColors.BLACK) {
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
        if (piece.color == CampColors.BLACK) {
          const move = {
            to: { x: piece.position.x, y: piece.position.y + 2 },
            type: MovementType.DEFAULT,
          };

          if (
            !this.isOutOfBoard(move) &&
            this.getBoardCell(move.to).currentPiece.chessNotation == "-"
          )
            moves.push(move);
        } else {
          const move = {
            to: { x: piece.position.x, y: piece.position.y - 2 },
            type: MovementType.DEFAULT,
          };

          if (
            !this.isOutOfBoard(move) &&
            this.getBoardCell(move.to).currentPiece.chessNotation == "-"
          )
            moves.push(move);
        }
      }

      let takablePieces = this.getTakablePiecesByPawn(piece);
      if (takablePieces && takablePieces.length > 0) {
        moves = moves.concat(takablePieces);
      }
    }

    piece.calculatedAvailableMovements = moves;

    return moves;
  }

  movePiece(piece: Piece, to: Position) {
    if (this.isGameOver) {
      console.log("Game is done");
      return;
    }

    if (
      piece.calculatedAvailableMovements &&
      piece.calculatedAvailableMovements.find((t) =>
        this.isEqualPositions(t.to, to)
      ) == undefined
    ) {
      console.log("Cant move ", piece.name, " to ", to, " : not allowed");
      return;
    }

    const unmutablePiece: Piece = {
      name: piece.name,
      chessNotation: piece.chessNotation,
      color: piece.color,
      availableMovements: piece.availableMovements,
      hasMoved: piece.hasMoved,
      isChecked: piece.isChecked,
      position: piece.position,
      calculatedAvailableMovements: piece.calculatedAvailableMovements,
    };

    let currentCell = this.getBoardCell(piece.position);
    let targetCell = this.getBoardCell(to);

    piece.position = { x: to.x, y: to.y };
    piece.hasMoved = true;

    targetCell.currentPiece = piece;
    currentCell.currentPiece = { ...DefaultPieces.NONE, color: null };

    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let cell = this.getBoardCell({ x: x, y: y });
        this.calculateAvailablesMoves(cell.currentPiece);
      }
    }

    this.updateAttackedCells();

    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        let cell = this.getBoardCell({ x: x, y: y });
        this.calculateAvailablesMoves(cell.currentPiece);
      }
    }

    let isOppositeKingChecked = this.isOppositeKingChecked(
      piece.color == CampColors.BLACK ? CampColors.WHITE : CampColors.BLACK
    );

    let breakCheckPositions: Position[] = [];
    if (isOppositeKingChecked) {
      // get positions that can break check
      let mov = unmutablePiece.calculatedAvailableMovements?.find((m) =>
        this.isEqualPositions(m.to, to)
      );
      if (unmutablePiece.color == null) return;

      let king = this.getPieceByNotation(
        "K",
        this.getOppositeColor(unmutablePiece.color)
      );
      if (!king) {
        console.error("King not found");
        return;
      }

      this.calculateAvailablesMoves(king);

      if (!mov) {
        console.error("Movement not found");
        return;
      }

      let movVector = {
        x: mov.to.x - king.position.x,
        y: mov.to.y - king.position.y,
      };

      if (movVector.x > 0 && movVector.y > 0) {
        //check diag right back of the king
        for (let i = king.position.x + 1; i <= movVector.x; i++) {
          let checkPos: Position = {
            x: king.position.x + i,
            y: king.position.y + i,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x > 0 && movVector.y < 0) {
        //check diag left back of the king
        for (let i = king.position.x + 1; i <= movVector.x; i++) {
          let checkPos: Position = {
            x: king.position.x + i,
            y: king.position.y - i,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x < 0 && movVector.y > 0) {
        //check diag right forward of the king
        for (let i = king.position.y + 1; i <= movVector.y; i++) {
          let checkPos: Position = {
            x: king.position.x - i,
            y: king.position.y + i,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x < 0 && movVector.y < 0) {
        //check diag left forward of the king
        for (let i = king.position.x + 1; i >= movVector.x; i--) {
          let checkPos: Position = {
            x: king.position.x - i,
            y: king.position.y - i,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x == 0 && movVector.y < 0) {
        //check left of the king
        for (let i = king.position.y + 1; i >= movVector.y; i--) {
          let checkPos: Position = {
            x: king.position.x,
            y: king.position.y - i,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x == 0 && movVector.y > 0) {
        //check right of the king
        for (let i = king.position.y + 1; i <= movVector.y; i++) {
          let checkPos: Position = {
            x: king.position.x,
            y: king.position.y + i,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x < 0 && movVector.y == 0) {
        //check top of the king
        for (let i = king.position.x + 1; i >= movVector.x; i--) {
          let checkPos: Position = {
            x: king.position.x - i,
            y: king.position.y,
          };
          breakCheckPositions.push(checkPos);
        }
      } else if (movVector.x > 0 && movVector.y == 0) {
        //check bottom of the king
        for (let i = king.position.x + 1; i <= movVector.x; i++) {
          let checkPos: Position = {
            x: king.position.x + i,
            y: king.position.y,
          };
          breakCheckPositions.push(checkPos);
        }
      }

      this.isGameOver = true;

      for (let x = 0; x < BoardDimensions.x; x++) {
        for (let y = 0; y < BoardDimensions.y; y++) {
          let cell = this.getBoardCell({ x: x, y: y });
          if (
            cell.currentPiece.chessNotation == "-" ||
            cell.currentPiece.chessNotation == "K" ||
            piece.color == null
          )
            continue;

          if (cell.currentPiece.color == this.getOppositeColor(piece.color)) {
            cell.currentPiece.calculatedAvailableMovements =
              cell.currentPiece.calculatedAvailableMovements?.filter((mov) =>
                breakCheckPositions.find((pos) =>
                  this.isEqualPositions(mov.to, pos)
                )
              );
            
            // If a movement can break the check, game is not over
            if (cell.currentPiece.calculatedAvailableMovements && cell.currentPiece.calculatedAvailableMovements.length > 0) {
              this.isGameOver = false;
            }
          }
        }
      }
    }

    this.setOppositeTurn();
  }

  private isAvailableMove(piece: Piece, move: Movement): boolean {
    if (this.isOutOfBoard(move)) return false;

    let cell = this.getBoardCell(move.to);

    if (this.isEqualPositions(move.to, piece.position)) return false;

    if (
      cell.currentPiece.chessNotation != "-" &&
      cell.currentPiece.color == piece.color
    )
      return false;

    if (cell.isUnderAttack && piece.chessNotation == "K") return false;

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

  getPieceByNotation(notation: string, color: CampColors): Piece | null {
    for (let x = 0; x < BoardDimensions.x; x++) {
      for (let y = 0; y < BoardDimensions.y; y++) {
        if (
          this.board[y][x].currentPiece.chessNotation == notation &&
          this.board[y][x].currentPiece.color == color
        )
          return this.board[y][x].currentPiece;
      }
    }

    return null;
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

    if (piece.color == CampColors.BLACK) {
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
