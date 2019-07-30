import { FighterPlane} from './fighter-plane.js';
import { Player} from './player.js';
import {Piece} from "./piece.js";
import {DefineMove, Enemy} from "./enemy.js";
import {ObservableData} from "./Observable.js";
import {Gift} from "./gift.js";
import {Render} from "./render.js";

export class Game{
    constructor() {
        this.players = {};
        this.enemies = [];
        this.blocks = [];
        this.width = 480;
        this.height = 270;
        this.timer = 0;
        this.intervalEnemy = 10;
        this.output = new ObservableData();
        this.board = new Render(this.width, this.height);
    }

    start() {
        setInterval(() => {
            this.timer++;
            if (this.timer % this.intervalEnemy ===0) {
                this.addBlock();
            }
            this.render();
        }, 20);
    }

    clear() {
        this.board.clear();
    }

    addPlayer(name, habilities) {
        if (!this.players[name]) {
            const fighterPlane = new FighterPlane(name, habilities.damage, habilities.health);
            this.players[name] = new Player(this.board, fighterPlane);
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

    addBlock(){
        const y = this.randomIntFromInterval(0, this.height);
        const n = this.randomIntFromInterval(0,9);
        const v = this.getLevel();
        let block;
        if( n > 6){
            block = new Gift(this.board, this.width, y, v, 10, 10, 'green', 2);
        } else {
            block = new Enemy(this.board, this.width, y, v, 10, 10, 'red', 2);
        }
        DefineMove(block);
        this.blocks.push(block);

    }

    render() {
        this.clear();
        const players = Object.keys(this.players);
        players.forEach(( key ) => {
            const player = this.players[key];
            player.draw();
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
            block.render();
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
            return 1 + Math.trunc(score/10);
        }
    }


}
