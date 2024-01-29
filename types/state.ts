import { CampColors } from "../constants";
import { Cell } from "./cell"

export type State = {
    board: Cell[][];
    turn: CampColors;
}