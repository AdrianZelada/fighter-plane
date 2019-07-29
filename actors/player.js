import {Hability} from './hability.js';
export class Player{
    constructor(fighterPlane) {
        this.x = 0;
        this.y = 0;
        this.v = 1;
        this.direction = 1;
        this.fire = false;
        this.score = 0;
        this.fighterPlane = fighterPlane;
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
                this.x -= 1;
                break;
            case 'right':
                this.x += 1;
                break;
            case 'up':
                this.y -= 1;
                break;
            case 'down':
                this.y += 1;
                break;
        }
    }
}