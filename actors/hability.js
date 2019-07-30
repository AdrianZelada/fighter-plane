export class Hability{
    constructor(fighterPlane, power ,health) {
        this.fighterPlane = fighterPlane;
        this.damage = power;
        this.health = health;
    }

    rollback() {
        return this.fighterPlane;
    }

    attack() {
        return this.fighterPlane.attack() + this.damage;
    }

    spoilt(hurtLevel) {
        if (this.health - hurtLevel > 0) {
            this.health -= hurtLevel;
            return this
        } else {
            return this.fighterPlane.spoilt(hurtLevel - this.health)
        }
    }

    getLive() {
        return this.fighterPlane ? this.fighterPlane.getLive() + this.health : 0;
    }

}