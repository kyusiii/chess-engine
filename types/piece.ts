import { CampColors } from "../constants";
import { Movement } from "./movement";
import { Position } from "./position";

export type Piece = {
    name: string;
    chessNotation: string;
    position: Position;
    availableMovements: string[];
    calculateAvailableMovements?: Movement[];
    color: CampColors | null;
    hasMoved: boolean;
    isChecked: boolean;
}
