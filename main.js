import Player from './player.js';
import {player1, player2} from  './player.js';
import {formFightHtml} from './formElement.js';
import createPlayer from './playerHtmlSample.js';
import renderReloadButton from './reloadButtonHtml.js';
import generateLog from './logger.js';
import moveRound from './round.js';
import displayingTheResultOfTheGames from './resultGame.js';


export const arenasHtmlBlock = document.querySelector('.arenas');


formFightHtml.addEventListener('submit', function (event) {
    event.preventDefault();

    moveRound();

    displayingTheResultOfTheGames(player1, player2, renderReloadButton);

});


arenasHtmlBlock.appendChild(createPlayer(player1));
arenasHtmlBlock.appendChild(createPlayer(player2));
generateLog("start", player1, player2);

