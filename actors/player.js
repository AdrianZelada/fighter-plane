import {Hability} from './hability.js';
import {Piece} from "./piece.js";
export class Player extends Piece{
    constructor(board, fighterPlane) {
        super(board, 0, 0, 1, 20, 20, 'none', 'black');
        this.fire = false;
        this.score = 0;
        this.fighterPlane = fighterPlane;
        this.name = fighterPlane.name;
        // this.render();
    }

    addHability(power, health) {
        this.fighterPlane = new Hability(this.fighterPlane, power, health);
    }

    spoilt(hurtLevel) {
        this.fighterPlane = this.fighterPlane.spoilt(hurtLevel);
    }

    attack(){
        console.log(this.fighterPlane.attack());
        return this.fighterPlane.attack();
    }

    isLive() {
        return !!this.fighterPlane;
    }

    getLive() {
        return this.isLive() ? this.fighterPlane.getLive() : 0;
    }

    action(data) {
        this.direction = data.direction;
        this.fire = data.fire;
    }

    move(){
        switch (this.direction) {
            case 'left':
                this.x -= this.velocity;
                break;
            case 'right':
                this.x += this.velocity;
                break;
            case 'up':
                this.y -= this.velocity;
                break;
            case 'down':
                this.y += this.velocity;
                break;
        }
    }

    draw() {
        this.move();
        this.render();
    }
}