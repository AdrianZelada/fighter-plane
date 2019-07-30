import {Piece} from "./piece.js";

export class Enemy extends Piece{
    constructor(board, x, y, velocity, width, height, color, level) {
        super(board, x, y, velocity, width, height, 'none', color);
        this.type = 'enemy';
        this.level = level;
        this.damage = level;
    }
}

export function DefineMove(enemy) {
    switch (enemy.level) {
        case 1:
            enemy = Object.assign(enemy,{
                move: function() {
                    this.x -= this.velocity;
                }
            });
            break;
        case 2:
            enemy = Object.assign(enemy, {
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