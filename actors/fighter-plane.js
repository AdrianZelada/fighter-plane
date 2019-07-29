export class FighterPlane{

    constructor ( name , damage, health) {
        this.name = name;
        this.health = health;
        this.damage = damage;
    }

    rollback() {
        return this;
    }

    attack(){
        return this.damage;
    }

    spoilt(hurtLevel) {
        this.health -= hurtLevel;
        return this.health > 0 ? this : null;
    }

    getLive() {
        return this.health;
    }
}