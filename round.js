import Player from './player.js';
import {player1, player2} from './player.js';
import {formFightHtml} from './formElement.js';
import generateLog from './logger.js';
import counterRandomValueForDamage from './randomCounterDamage.js';

export const hitValue = {
    head: 30,
    body: 25,
    foot: 20,
};

export const attackArray = ['head', 'body', 'foot'];

function enemyAttack() {
    const enemyAction = {};

    function randomPartOfTheBody(part) {
        return (Math.ceil(Math.random() * part));
    }

    const hitArea = attackArray[randomPartOfTheBody(attackArray.length - 1)];
    const defenceArea = attackArray[randomPartOfTheBody(attackArray.length - 1)];

    enemyAction.valueDamage = counterRandomValueForDamage(hitValue[hitArea]);
    enemyAction.hitArea = hitArea;
    enemyAction.defenceArea = defenceArea;

    return enemyAction;
}

function playerAttack() {
    const playerAction = {};

    for(let formElement of formFightHtml){
        if(formElement.checked && formElement.name === 'hit'){
            playerAction.valueDamage = counterRandomValueForDamage(hitValue[formElement.value]);
            playerAction.hitArea = formElement.value;
        }

        if(formElement.checked && formElement.name === 'defence'){
            playerAction.defenceArea = formElement.value;
        }

        formElement.checked = false;
    }

    return playerAction;
}

function moveRound() {
    const playerAction = playerAttack();
    console.log('Игрок Действия: ', playerAction);

    const enemyAction = enemyAttack();
    console.log('Соперник Действия: ',  enemyAction);


    if(playerAction.defenceArea !== enemyAction.hitArea) {
        player1.changeHP(enemyAction.valueDamage);
        player1.renderHP();
        generateLog('hit', player2, player1);

    } else {
        enemyAction.valueDamage = 0;
        console.log('Защита сработала - соперник не попал');
        generateLog("defence", player2, player1);
    }

    if(enemyAction.defenceArea !== playerAction.hitArea) {
        player2.changeHP(playerAction.valueDamage);
        player2.renderHP();
        generateLog('hit', player1, player2);

    } else {
        playerAction.valueDamage = 0;
        console.log('Игрок промах - бейте точнее');
        generateLog('defence', player1, player2);
    }
}


export default moveRound;