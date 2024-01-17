import { Piece } from "./types/piece"

export enum CampColors {
    WHITE, BLACK
}

export const BoardDimensions = {
    x: 8,
    y: 8
}

export const DefaultBoard: Piece[][] = [ //from A1
    [
        {name: "rook", chessNotation: "R", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "knight", chessNotation: "N", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "bishop", chessNotation: "B", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "queen", chessNotation: "Q", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "king", chessNotation: "R", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "bishop", chessNotation: "B", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "knight", chessNotation: "N", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "rook", chessNotation: "R", availableMovements: [], specialMovements: [], x: 0, y: 0}
    ],
    [
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
    ],
    [
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
    ],
    [
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
    ],
    [
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
    ],
    [
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "none", chessNotation: "-", availableMovements: [], specialMovements: [], x: 0, y: 0},
    ],
    [
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "pawn", chessNotation: "p", availableMovements: [], specialMovements: [], x: 0, y: 0},
    ],
    [
        {name: "rook", chessNotation: "R", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "knight", chessNotation: "N", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "bishop", chessNotation: "B", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "queen", chessNotation: "Q", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "king", chessNotation: "R", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "bishop", chessNotation: "B", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "knight", chessNotation: "N", availableMovements: [], specialMovements: [], x: 0, y: 0},
        {name: "rook", chessNotation: "R", availableMovements: [], specialMovements: [], x: 0, y: 0}
    ],
]