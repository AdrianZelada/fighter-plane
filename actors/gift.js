import {Piece} from "./piece.js";

export class Gift extends Piece{
    constructor(board, x, y, velocity, width, height, color, level) {
        super(board, x, y, velocity, width, height, 'none', color);
        this.type = 'gift';
        this.level = level;
        this.power = level;
        this.health = level * 2;
    }
}