const arenasHtmlBlock = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
    selector: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['stranglehold', 'guns', 'fan', 'knife','club'],
    attack: function(){
        console.log(player1.name + ' Fight...')
    },
    changeHP: function (damage) {
        this.hp = changeHP(damage, this)
    },
    renderHP: function () {
        renderHP(this)
    },
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
    changeHP: function (damage) {
        this.hp = changeHP(damage, this)
    },
    renderHP: function () {
        renderHP(this)
    },
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
function changeHP(damage, player) {
    let hp = player.hp;
    hp = hp - damage;
    hp = handlingNegativeValuesHP(hp);

    console.log('Life ' + player.name + ': ' + hp);
    return hp;
}

function renderHP(player) {
    function elHP(player){
        const playerLifeHtml = document.querySelector('.player'+ player.selector + ' .life');
        console.log(playerLifeHtml);
        return playerLifeHtml;
    }

    const element = elHP(player);
    console.log(element);

    return element.style.width = player.hp + '%';
}


function displayingTheResultOfTheGames(player1, player2) {
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
        } else if(losers.length === 1){
            handleWinner(players);
        }
    }


    let resultGame = determineTheWinners(playersArray);
    console.log(resultGame);
    return resultGame;
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

    displayingTheResultOfTheGames(player1, player2);


});

player1.attack();
player2.attack();
arenasHtmlBlock.appendChild(createPlayer(player1));
arenasHtmlBlock.appendChild(createPlayer(player2));