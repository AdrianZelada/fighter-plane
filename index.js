console.log('asd');
import {Game}  from './actors/game.js';
import { Keyboard} from './actors/keyboard.js';

const game = new Game();

game.addPlayer('adrian',{
    damage: 10,
    health: 10
});

game.start();

// game.hurtPlayer('adrian', 3);
// console.log(game.isLivePlayer('adrian'));
// game.hurtPlayer('adrian', 3);
// console.log(game.isLivePlayer('adrian'));
// game.habilityToPlayer('adrian', {
//    damage: 0,
//    health: 2
// });
// console.log(game.isLivePlayer('adrian'));
// game.hurtPlayer('adrian', 5);
// console.log(game.isLivePlayer('adrian'));

// var direction = 'right';  // this is declared outside the function that alters it

const keyboard = new Keyboard();

keyboard.subscribe((data) => {
    game.actionPlayer('adrian', data);
});

game.output.subscribe((data) => {
    console.log('data player');
    console.log(data);
});

// const unsub = keyboard.subscribe((data) => {
//     console.log('sub 222222222');
//     console.log(data);
// });

// setTimeout(() => {
//     unsub.unsubscribe();
// }, 4000);
