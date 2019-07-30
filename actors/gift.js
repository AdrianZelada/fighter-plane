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

export function DefineMove(gift) {
    switch (gift.level) {
        case 1:
            gift = Object.assign(gift,{
                move: function() {
                    this.x -= this.velocity;
                }
            });
            break;
        case 2:
            gift = Object.assign(gift, {
                limit: 0,
                calculate: false,
                buildSides: function() {
                    this.limit = this.y;
                    this.calculate = true;
                },
                move: function() {
                    this.x--;
                    if(!this.calculate) {
                        this.buildSides();
                    }
                    let n = Math.trunc(Math.cos((this.x * Math.PI)/360)*100);
                    this.y = this.limit + n;
                }
            });
            break;
    }
}