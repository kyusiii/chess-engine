import { CampColors } from "../constants";
import { Piece } from "./piece"

export type Cell = {
    currentPiece: Piece;
    chessNotation: string;
    xBoardPos: number;
    yBoardPos: number;
    color: CampColors;
}   