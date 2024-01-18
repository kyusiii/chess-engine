import { Piece } from "./types/piece"

export enum CampColors {
    WHITE, BLACK
}

export const BoardDimensions = {
    x: 8,
    y: 8
}

export const DefaultPieces = {
    ROOK: {name: "rook", chessNotation: "R", hasMoved: false, availableMovements: ["lines"], position: {x: 0, y: 0}},
    KNIGHT: {name: "knight", chessNotation: "N", hasMoved: false, availableMovements: ["x-1,y+2", "x+1,y+2", "x-1,y-2", "x+1,y-2"], position: {x: 0, y: 0}},
    BISHOP: {name: "bishop", chessNotation: "B", hasMoved: false, availableMovements: ["diags"], position: {x: 0, y: 0}},
    QUEEN: {name: "queen", chessNotation: "Q", hasMoved: false, availableMovements: ["lines", "diags"], position: {x: 0, y: 0}},
    KING: {name: "king", chessNotation: "K", hasMoved: false, availableMovements: ["x+1", "x-1", "y+1", "y-1", "x+1,y+1", "x-1,y+1", "x-1,y-1", "x+1,y-1"], position: {x: 0, y: 0}},
    PAWN: {name: "pawn", chessNotation: "P", hasMoved: false, availableMovements: ["y+1"], position: {x: 0, y: 0}},
    NONE: {name: "none", chessNotation: "-", hasMoved: false, availableMovements: [], position: {x: 0, y: 0}}
}

export const DefaultBoard: Piece[][] = [ //from A1
    [
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.KNIGHT, color: CampColors.WHITE},
        {...DefaultPieces.BISHOP, color: CampColors.WHITE},
        {...DefaultPieces.QUEEN, color: CampColors.WHITE},
        {...DefaultPieces.KING, color: CampColors.WHITE},
        {...DefaultPieces.BISHOP, color: CampColors.WHITE},
        {...DefaultPieces.KNIGHT, color: CampColors.WHITE},
        {...DefaultPieces.ROOK, color: CampColors.WHITE}
    ],
    [
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.PAWN, color: CampColors.WHITE},
        {...DefaultPieces.PAWN, color: CampColors.WHITE},
        {...DefaultPieces.PAWN, color: CampColors.WHITE},
        {...DefaultPieces.PAWN, color: CampColors.WHITE},
        {...DefaultPieces.PAWN, color: CampColors.WHITE},
        {...DefaultPieces.PAWN, color: CampColors.WHITE},
        {...DefaultPieces.PAWN, color: CampColors.WHITE}
    ],
    [
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null}
    ],
    [
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.QUEEN, color: CampColors.WHITE},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null}
    ],
    [
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.PAWN, color: CampColors.WHITE, hasMoved: true},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null}
    ],
    [
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null},
        {...DefaultPieces.NONE, color: null}
    ],
    [
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK},
        {...DefaultPieces.PAWN, color: CampColors.BLACK}
    ],
    [
        {...DefaultPieces.ROOK, color: CampColors.BLACK},
        {...DefaultPieces.KNIGHT, color: CampColors.BLACK},
        {...DefaultPieces.BISHOP, color: CampColors.BLACK},
        {...DefaultPieces.QUEEN, color: CampColors.BLACK},
        {...DefaultPieces.KING, color: CampColors.BLACK},
        {...DefaultPieces.BISHOP, color: CampColors.BLACK},
        {...DefaultPieces.KNIGHT, color: CampColors.BLACK},
        {...DefaultPieces.ROOK, color: CampColors.BLACK}
    ]
]