import { FighterPlane} from './fighter-plane.js';
import { Player} from './player.js';
import { Enemy} from "./enemy.js";
import {ObservableData} from "./Observable.js";
import {Gift} from "./gift.js";
import {Render} from "./render.js";
import {trajectory} from "./trajectory.js";

export class Game{
    constructor() {
        this.players = {};
        this.blocks = [];
        this.width = 480;
        this.height = 270;
        this.timer = 0;
        this.intervalEnemy = 10;
        this.output = new ObservableData();
        this.board = new Render(this.width, this.height);

        this.level = 1;

        this.interval = null;
    }

    start() {
        this.interval = setInterval(() => {
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
        });
        this.setLevel();
    }

    habilityToPlayer(name, habilities){
        this.players[name].addHability(habilities.power, habilities.health);
        this.players[name].score++;
        this.output.next({
            player: name,
            health: this.players[name].getLive(),
            score: this.players[name].score
        });
        this.setLevel();
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
        const v = this.level;
        const l = this.randomIntFromInterval(1,2);
        let block;
        if( n > 6){
            block = new Gift(this.board, this.width, y, v, 10, 10, 'green', l);
        } else {
            block = new Enemy(this.board, this.width, y, v, 10, 10, 'red', l);
        }
        trajectory(block);
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
            const enabledBlock = !(block.isEndTravel() || withImpact);
            if ( enabledBlock ){
                block.move();
                block.render();
            }
           return enabledBlock;
        });

    }

    randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    setLevel() {
        const players = Object.keys(this.players);
        let score= 0;
        players.forEach(( key ) => {
            const player = this.players[key];
            score += player.score;
            if (player.score > 10) {
                player.velocity = 1 + Math.trunc(player.score/10);
            }
            if (player.getLive() == 0) {
                if(this.interval){
                    clearInterval(this.interval)
                }
            }
        });
        if (score < 10) {
            this.level = 1;
        } else {
            this.level = 1 + Math.trunc(score/10);
        }
    }


}
