import { CampColors } from "../constants";
import { Position } from "./position";

export type Piece = {
    name: string;
    chessNotation: string;
    position: Position;
    availableMovements: string[];
    calculateAvailableMovements?: Position[];
    color: CampColors | null;
    hasMoved: boolean;
    isChecked: boolean;
}