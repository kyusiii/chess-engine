
export type Piece = {
    name: string;
    chessNotation: string;
    x: number;
    y: number;
    availableMovements: number[] //exprimed in {+/-fromX, +/-fromY}
    specialMovements: number[] //exprimed in {+/-fromX, +/-fromY}
}