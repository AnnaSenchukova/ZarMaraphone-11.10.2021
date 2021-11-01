import {player1, player2} from  './player.js';
import {formFightHtml, arenasHtmlBlock, logs, attackArray, hitValue} from './variables.js';
import createElement from "./createElement.js";
import counterRandomValueForDamage from './randomCounterDamage.js';
import disabledFormElement from "./formElement.js";




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


function getWinner(players) {
    return players.find(function (player) {
        return !player.isLooser();
    });
}

function getLosers(players) {
    return players.filter(function (player) {
        return player.isLooser();
    });
}

function getLoser(players) {
    return players.find(function (player) {
        return player.isLooser();
    });
}


class Game {
    player1;
    player2;

    start(){
        formFightHtml.addEventListener('submit', (event) => {
            event.preventDefault();

            this.moveRound();

            this.resultGame = this.displayingTheResultOfTheGames(player1, player2);

        });

        this.player1 = arenasHtmlBlock.appendChild(this.createPlayer(player1));
        this.player2 = arenasHtmlBlock.appendChild(this.createPlayer(player2));

        this.generateLog("start", player1, player2);
    }

    renderReloadButton(){
        function createReloadButton() {
            const reloadButtonWrapperHtml = createElement('div', 'reload-wrap');
            const reloadButtonHtml = createElement('button', 'button');

            reloadButtonHtml.innerText = 'Restart';

            reloadButtonWrapperHtml.appendChild(reloadButtonHtml);

            return reloadButtonWrapperHtml;
        }

        arenasHtmlBlock.appendChild(createReloadButton());
        const reloadButton = document.querySelector('.reload-wrap .button');
        console.log(reloadButton);

        reloadButton.addEventListener('click', function () {
            console.log('click ReloadButton');
            window.location.reload();
        });
    };

    createPlayer(player){
        const playerHtmlBlock = createElement('div', 'player'+ player.selector);

        const playerProgressbarHtmlBlock = createElement('div', 'progressbar');

        const playerLifeHtml = createElement('p', 'life');
        playerLifeHtml.innerText = player.hp;
        playerLifeHtml.style.width = player.hp + '%';
        playerLifeHtml.style.fontSize = '0';

        const playerNameHtml = createElement('p', 'name');
        playerNameHtml.innerText = player.name;
        playerNameHtml.style.margin = '0';


        const playerCharacterHtmlBlock = createElement('div' ,'character');

        const playerImageHtml = createElement('img');
        playerImageHtml.src = player.img;


        playerHtmlBlock.appendChild(playerProgressbarHtmlBlock);
        playerHtmlBlock.appendChild(playerCharacterHtmlBlock);

        playerProgressbarHtmlBlock.appendChild(playerNameHtml);
        playerProgressbarHtmlBlock.appendChild(playerLifeHtml);

        playerCharacterHtmlBlock.appendChild(playerImageHtml);

        return playerHtmlBlock;
    };

    generateLog(type, player1, player2){
        let text;
        let random = Math.ceil(Math.random() * logs[type].length - 1);

        function renderLog(){
            const chatHtml = document.querySelector('.chat');

            const elementLog = `<p>${text}</p>`;
            chatHtml.insertAdjacentHTML('afterbegin', elementLog);
        }

        switch (type) {
            case "start" : {
                const time = new Date();
                text = logs.start.replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);

                break;
            }
            case "hit" : {
                text = logs.hit[random].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);

                break;
            }
            case "defence" : {
                text = logs.defence[random].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);

                break
            }
            case "end" : {
                text = logs.end[random].replace('[playerLose]', player1.name).replace('[playerWins]', player2.name);

                break;
            }
            case "draw" : {
                text = logs.draw;

                break;
            }
        }

        return renderLog();
    };


    moveRound(){
        const playerAction = playerAttack();
        console.log('Игрок Действия: ', playerAction);

        const enemyAction = enemyAttack();
        console.log('Соперник Действия: ',  enemyAction);


        if(playerAction.defenceArea !== enemyAction.hitArea) {
            player1.changeHP(enemyAction.valueDamage);
            player1.renderHP();
            this.generateLog('hit', player2, player1);

        } else {
            enemyAction.valueDamage = 0;
            console.log('Защита сработала - соперник не попал');
            this.generateLog("defence", player2, player1);
        }

        if(enemyAction.defenceArea !== playerAction.hitArea) {
            player2.changeHP(playerAction.valueDamage);
            player2.renderHP();
            this.generateLog('hit', player1, player2);

        } else {
            playerAction.valueDamage = 0;
            console.log('Игрок промах - бейте точнее');
            this.generateLog('defence', player1, player2);
        }
    };


    displayingTheResultOfTheGames(player1, player2) {
        let playersArray = [player1, player2];


        const createMessageWins = (name) => {
            console.log(name);
            const winsTitleHtml = createElement('div', 'title-result');
            winsTitleHtml.innerText = name + ' wins';
            return winsTitleHtml;
        };

        const createMessageDraw = (message) => {
            const drawTitleHtml = createElement('div', 'title-result');
            drawTitleHtml.innerText = message;
            return drawTitleHtml;
        };


        const handleDraw = () => {
            arenasHtmlBlock.appendChild(createMessageDraw('draw'));
            this.generateLog('draw');
        };

        const handleWinner = (players) => {
            let winner = getWinner(players);
            let looser = getLoser(players);

            arenasHtmlBlock.appendChild(createMessageWins(winner.name));
            this.generateLog('end', looser, winner);
        };


        const determineTheWinners = (players) => {

            let losers = getLosers(players);

            if(losers.length === 2){
                handleDraw();
                return 'draw';
            } else if(losers.length === 1){
                handleWinner(players);
                return 'wins';

            }
        };


        let resultGame = determineTheWinners(playersArray);
        console.log(resultGame);


        if(resultGame === 'draw' || resultGame === 'wins') {
            console.log('Game over!');
            this.renderReloadButton();
            disabledFormElement();
        }

        return resultGame;
    };
}

export default Game;

