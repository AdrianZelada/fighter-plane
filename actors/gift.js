import {Piece} from "./piece.js";

export class Gift extends Piece{
    constructor(x, y, velocity, width, height, color, level) {
        super(x, y, velocity, width, height, 'none', color);
        this.type = 'gift';
        this.level = level;
        this.power = level;
        this.health = level * 2;
    }
}

export function DefineMove(gift) {
    switch (gift.level) {
        case 1:
            // enemy.prototype = {
            //     move: function() {
            //         this.x -= this.velocity;
            //     }
            // };
            gift = Object.assign(gift,{
                move: function() {
                    this.x -= this.velocity;
                }
            });

            // enemy.__proto__ = {
            //         move: function() {
            //             this.x -= this.velocity;
            //         }
            // }
            break;
    }
}