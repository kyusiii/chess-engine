import { Position } from "./position";

export enum MovementType {
    XLINELEFT, XLINERIGHT, YLINEFORW, YLINEBACK, RDIAGFORW, RDIAGBACK, LDIAGFORW, LDIAGBACK, DEFAULT
}

export type Movement = {
    to: Position;
    type: MovementType;
}