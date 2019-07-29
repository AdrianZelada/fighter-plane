import { FighterPlane} from './fighter-plane.js';
import { Player} from './player.js';
import {Piece} from "./piece.js";
import {DefineMove, Enemy} from "./enemy.js";
import {ObservableData} from "./Observable.js";
import {Gift} from "./gift.js";
export class Game{
    constructor() {
        this.players = {};
        this.enemies = [];
        this.blocks = [];
        this.canvas = document.createElement("canvas");
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.timer = 0;
        this.intervalEnemy = 30;
        this.output = new ObservableData();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    start() {
        setInterval((i) => {
            this.timer++;
            if (this.timer % this.intervalEnemy ===0) {
                this.addBlock();
            }
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
        this.output.next({
            player: name,
            health: this.players[name].getLive(),
            score: this.players[name].score
        })
    }

    habilityToPlayer(name, habilities){
        this.players[name].addHability(habilities.power, habilities.health);
        this.players[name].score++;
        this.output.next({
            player: name,
            health: this.players[name].getLive(),
            score: this.players[name].score
        })
    }

    isLivePlayer(name) {
        console.log(this.players[name].getLive());
        return this.players[name].isLive();
    }

    actionPlayer(name, action) {
        this.players[name].action(action);
    }

    addEnemy(){
        // const y = this.randomIntFromInterval(0, this.canvas.height)
        // let enemy = new Enemy(this.canvas.width, y, 1, 10, 10, 1, 'red');
        // DefineMove(enemy);
        // // console.log(enemy)
        // this.enemies.push(enemy);
    }

    addBlock(){
        const y = this.randomIntFromInterval(0, this.canvas.height);
        const n = this.randomIntFromInterval(0,9);
        const v = this.getLevel();
        let block;
        if( n > 6){
            block = new Gift(this.canvas.width, y, v, 10, 10, 'green', 1);
        } else {
            block = new Enemy(this.canvas.width, y, v, 10, 10, 'red', 1);
        }
        DefineMove(block);
        this.blocks.push(block);

    }

    render() {
        this.clear();
        const players = Object.keys(this.players);
        players.forEach(( key ) => {
            const player = this.players[key];
            player.move();
            this.context.fillStyle = player.color;
            this.context.fillRect(player.x, player.y, player.width, player.height);
            this.context.fill();
            this.context.closePath();
        });

        const user = this.players[players[0]];
        this.blocks = this.blocks.filter((block) => {
            const withImpact = block.crashWith(user);
            if(withImpact) {
                if (block.type == 'gift') {
                    this.habilityToPlayer(user.name, {
                        power: block.power,
                        health: block.health
                    })
                } else {
                    if(user.isLive()) {
                        this.hurtPlayer(user.name, block.level)
                    }
                }
            }
           return !(block.isEndTravel() || withImpact);
        });

        this.blocks.forEach((block) => {
            block.move();
            this.context.beginPath();
            this.context.fillStyle = block.color;
            this.context.fillRect(block.x, block.y, block.width, block.height);
            this.context.fill();
            this.context.closePath();
        });
    }

    randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    getLevel() {
        const players = Object.keys(this.players);
        let score= 0;
        players.forEach(( key ) => {
            const player = this.players[key];
            score += player.score;
        });
        if (score < 10) {
            return 1;
        } else {
            return Math.trunc(score/10);
        }
    }


}
