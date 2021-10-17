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

function changeHP(player) {
    function handlingNegativeValuesHP(hp) {
        if(hp <= 0){
            return 0;
        } else {
            return hp;
        }
    }

    function damageCounterHP(hp) {
        hp = hp - (Math.ceil(Math.random() * 20));
        hp = handlingNegativeValuesHP(hp);
        return hp;
    }

    const playerLifeHtml = document.querySelector('.player'+ player.selector+ ' .life');
    player.hp = damageCounterHP(player.hp);
    playerLifeHtml.style.width = player.hp + '%';

    console.log('Life ' + player.name + ': ' + player.hp);

    if(player.hp <= 0) {
        arenasHtmlBlock.appendChild(playerLose(player.name));
    }
}

function playerLose(name) {
    const loseTitleHtml = createElement('div', 'loseTitle');
    loseTitleHtml.innerText = name + ' lose';

    return loseTitleHtml;
}

randomButton.addEventListener('click', function () {
    console.log('click RandomButton');
    changeHP(player1);
    changeHP(player2);
});

player1.attack();
player2.attack();
arenasHtmlBlock.appendChild(createPlayer(player1));
arenasHtmlBlock.appendChild(createPlayer(player2));