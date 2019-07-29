import {Piece} from "./piece.js";

export class Enemy extends Piece{
    constructor(x, y, velocity, width, height, color, level) {
        super(x, y, velocity, width, height, 'none', color);
        this.type = 'enemy';
        this.level = level;
        this.damage = level;
    }
}

export function DefineMove(enemy) {
    switch (enemy.level) {
        case 1:
            // enemy.prototype = {
            //     move: function() {
            //         this.x -= this.velocity;
            //     }
            // };
            enemy = Object.assign(enemy,{
                move: function() {
                    this.x -= this.velocity;
                }
            })

            // enemy.__proto__ = {
            //         move: function() {
            //             this.x -= this.velocity;
            //         }
            // }
            break;
    }
}