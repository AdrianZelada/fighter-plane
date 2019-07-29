import { FighterPlane} from './fighter-plane.js';
import { Player} from './player.js';
export class Game{
    constructor() {
        this.players = {};
        this.canvas = document.createElement("canvas");
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    start() {

        // requestAnimationFrame(() => {
        //     console.log(Date.now())
        //     this.render();
        //     this.start();
        // });
        setInterval(() => {
            this.render();
        }, 20);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addPlayer(name, habilities) {
        if (!this.players[name]) {
            const fighterPlane = new FighterPlane(name, habilities.damage, habilities.health);
            this.players[name] = new Player(fighterPlane);
        }
    }

    hurtPlayer(name, hurtLevel) {
        this.players[name].spoilt(hurtLevel);
    }

    habilityToPlayer(name, habilities){
        this.players[name].addHability(habilities.power, habilities.health);
    }

    isLivePlayer(name) {
        console.log(this.players[name].getLive());
        return this.players[name].isLive();
    }

    actionPlayer(name, action) {
        this.players[name].action(action);
    }

    render() {
        this.clear();
        const players = Object.keys(this.players);
        players.forEach(( key ) => {
            const player = this.players[key];
            player.move();
            this.context.fillRect(player.x, player.y, 20, 20);
        });
    }
}
