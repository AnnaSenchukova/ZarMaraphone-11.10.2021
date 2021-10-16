const player1 = {
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['stranglehold', 'guns', 'fan', 'knife','club'],
    attack: function(){
        console.log(player1.name + ' Fight...')
    }
};

const player2 = {
    name: 'Kitana',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['stranglehold', 'guns', 'fan', 'knife','club'],
    attack: function(){
        console.log(player2.name + ' Fight...')
    }
};

function createPlayer(playerKey, player) {
    const arenasHtmlBlock = document.querySelector('.arenas');

    const playerHtmlBlock = document.createElement('div');
    playerHtmlBlock.classList.add(playerKey);

    const playerProgressbarHtmlBlock = document.createElement('div');
    playerProgressbarHtmlBlock.classList.add('progressbar');

    const playerLifeHtml = document.createElement('p');
    playerLifeHtml.classList.add('life');
    playerLifeHtml.innerText = player.hp;
    playerLifeHtml.style.width = player.hp + '%';
    playerLifeHtml.style.fontSize = '0';

    const playerNameHtml = document.createElement('p');
    playerNameHtml.classList.add('name');
    playerNameHtml.innerText = player.name;
    playerNameHtml.style.margin = '0';


    const playerCharacterHtmlBlock = document.createElement('div');
    playerCharacterHtmlBlock.classList.add('character');

    const playerImageHtml = document.createElement('img');
    playerImageHtml.src = player.img;

    arenasHtmlBlock.appendChild(playerHtmlBlock);

    playerHtmlBlock.appendChild(playerProgressbarHtmlBlock);
    playerHtmlBlock.appendChild(playerCharacterHtmlBlock);

    playerProgressbarHtmlBlock.appendChild(playerNameHtml);
    playerProgressbarHtmlBlock.appendChild(playerLifeHtml);

    playerCharacterHtmlBlock.appendChild(playerImageHtml)
}

player1.attack();
player2.attack();
createPlayer('player1', player1);
createPlayer('player2', player2);