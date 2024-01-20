import { CampColors } from "../constants";
import { Piece } from "./piece";
import { Position } from "./position";

export type Cell = {
  id: number;
  currentPiece: Piece;
  chessNotation: string;
  position: Position;
  color: CampColors;
  isAvailable: boolean;
};
