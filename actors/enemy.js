import {Piece} from "./piece.js";

export class Enemy extends Piece{
    constructor(board, x, y, velocity, width, height, color, level) {
        super(board, x, y, velocity, width, height, 'none', color);
        this.type = 'enemy';
        this.level = level;
        this.damage = level;
    }
}
