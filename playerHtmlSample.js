import createElement from "./createElement.js";

function createPlayer(player) {
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
}

export default createPlayer;