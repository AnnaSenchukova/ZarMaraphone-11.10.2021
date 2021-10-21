const arenasHtmlBlock = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');
const formFightHtml = document.querySelector('.control');

const hitValue = {
    head: 30,
    body: 25,
    foot: 20,
};

const attackArray = ['head', 'body', 'foot'];



const player1 = {
    selector: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['stranglehold', 'guns', 'fan', 'knife','club'],
    attack: function(){
        console.log(player1.name + ' Fight...')
    },
    changeHP: changeHP,
    renderHP: renderHP,
    isLooser: function () {
        return this.hp <= 0;
    }
};

const player2 = {
    selector: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['stranglehold', 'guns', 'fan', 'knife','club'],
    attack: function(){
        console.log(player2.name + ' Fight...')
    },
    changeHP: changeHP,
    renderHP: renderHP,
    isLooser: function () {
        return this.hp <= 0;
    }
};

function createElement(tag, className) {
    const tagHtml = document.createElement(tag);
    if(className) {
        tagHtml.classList.add(className);
    }

    return tagHtml;

}

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


function counterRandomValueForDamage(valueMaxDamage) {
    return (Math.ceil(Math.random() * valueMaxDamage));
}

function handlingNegativeValuesHP(hp) {
    if(hp <= 0){
        return 0;
    } else {
        return hp;
    }
}


function changeHP(damage) {
    let hp = this.hp;
    hp = hp - damage;
    hp = handlingNegativeValuesHP(hp);

    console.log('Life ' + this.name + ': ' + hp);
    return this.hp = hp;
}

function renderHP() {
    function elHP(playerSelector){
        const playerLifeHtml = document.querySelector('.player'+ playerSelector + ' .life');
        console.log(playerLifeHtml);
        return playerLifeHtml;
    }

    const element = elHP(this.selector);
    console.log(element);
    return element.style.width = this.hp + '%';
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
        console.log('Draw');
    }

    function handleWinner(players) {
        let winner = players.find(function (player) {
            return !player.isLooser();
        });

        arenasHtmlBlock.appendChild(createMessageWins(winner.name));
        console.log('Wins ' + winner.name);
    }


    function determineTheWinners(players) {

        let losers = players.filter(function (player) {
            return player.isLooser();
        });

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
    }
    return resultGame;
}



function renderReloadButton(){
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

}



function enemyAttack() {
    const enemyAction = {};

    function randomPartOfTheBody(part) {
        return (Math.ceil(Math.random() * part));
    }

    const hitArea = attackArray[randomPartOfTheBody(attackArray.length - 1)];
    const defenceArea = attackArray[randomPartOfTheBody(attackArray.length - 1)];

    console.log('Соперник Область удара: ' + hitArea);
    console.log('Соперник Область защиты: ' + defenceArea);

    enemyAction.value = counterRandomValueForDamage(hitValue[hitArea]);
    enemyAction.hitArea = hitArea;
    enemyAction.defenceArea = defenceArea;

    return enemyAction;
}

function playerAttack() {
    const playerAction = {};

    for(let formElement of formFightHtml){
        if(formElement.checked && formElement.name === 'hit'){
            playerAction.value = counterRandomValueForDamage(hitValue[formElement.value]);
            playerAction.hitArea = formElement.value;
        }

        if(formElement.checked && formElement.name === 'defence'){
            playerAction.defenceArea = formElement.value;
        }
    }

    return playerAction;
}



randomButton.addEventListener('click', function () {
    console.log('click RandomButton');
    player1.changeHP(counterRandomValueForDamage(20));
    player2.changeHP(counterRandomValueForDamage(20));
    player1.renderHP();
    player2.renderHP();

    if(player1.hp === 0 || player2.hp === 0) {
        randomButton.disabled = true;
    }

    displayingTheResultOfTheGames(player1, player2, renderReloadButton);
});


formFightHtml.addEventListener('submit', function (event) {
    event.preventDefault();
    //console.dir(formFightHtml);

    const enemyAction = enemyAttack();
    console.log('Соперник Действия: ',  enemyAction);

    const playerAction = playerAttack();
    console.log('Игрок Действия: ', playerAction);

});



player1.attack();
player2.attack();
arenasHtmlBlock.appendChild(createPlayer(player1));
arenasHtmlBlock.appendChild(createPlayer(player2));

