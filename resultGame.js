import {arenasHtmlBlock} from "./main.js";
import createElement from "./createElement.js";
import generateLog from "./logger.js";
import disabledFormElement from "./formElement.js";

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


function displayingTheResultOfTheGames(player1, player2, restart) {
    let playersArray = [player1, player2];


    function createMessageWins(name) {
        console.log(name);
        const winsTitleHtml = createElement('div', 'title-result');
        winsTitleHtml.innerText = name + ' wins';
        return winsTitleHtml;
    }

    function createMessageDraw(message) {
        const drawTitleHtml = createElement('div', 'title-result');
        drawTitleHtml.innerText = message;
        return drawTitleHtml;
    }


    function handleDraw() {
        arenasHtmlBlock.appendChild(createMessageDraw('draw'));
        generateLog('draw');
    }

    function handleWinner(players) {
        let winner = getWinner(players);
        let looser = getLoser(players);

        arenasHtmlBlock.appendChild(createMessageWins(winner.name));
        generateLog('end', looser, winner);
    }


    function determineTheWinners(players) {

        let losers = getLosers(players);

        if(losers.length === 2){
            handleDraw();
            return 'draw';
        } else if(losers.length === 1){
            handleWinner(players);
            return 'wins';

        }
    }


    let resultGame = determineTheWinners(playersArray);
    console.log(resultGame);


    if(resultGame === 'draw' || resultGame === 'wins') {
        console.log('Game over!');
        restart();
        disabledFormElement();
    }

    return resultGame;
}

export default displayingTheResultOfTheGames;