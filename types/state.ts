import { CampColors } from "../src/constants";
import { Cell } from "./cell";

export type State = {
  board: Cell[][];
  turn: CampColors;
  isGameOver: boolean;
  winner?: CampColors;
};
