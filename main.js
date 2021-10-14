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

function createPlayer(player, namePlayer, imagePlayer, hpPlayer) {
    const arenasHtmlBlock = document.querySelector('.arenas');

    const playerHtmlBlock = document.createElement('div');
    playerHtmlBlock.classList.add(player);

    const playerProgressbarHtmlBlock = document.createElement('div');
    playerProgressbarHtmlBlock.classList.add('progressbar');

    const playerLifeHtml = document.createElement('p');
    playerLifeHtml.classList.add('life');
    playerLifeHtml.innerText = hpPlayer;
    playerLifeHtml.style.width = '100%';
    playerLifeHtml.style.color = 'white';
    playerLifeHtml.style.fontSize = '20px';
    playerLifeHtml.style.paddingLeft = '10px';

    const playerNameHtml = document.createElement('p');
    playerNameHtml.classList.add('name');
    playerNameHtml.innerText = namePlayer;
    playerNameHtml.style.margin = '0';


    const playerCharacterHtmlBlock = document.createElement('div');
    playerCharacterHtmlBlock.classList.add('character');

    const playerImageHtml = document.createElement('img');
    playerImageHtml.src = imagePlayer;

    arenasHtmlBlock.appendChild(playerHtmlBlock);

    playerHtmlBlock.appendChild(playerProgressbarHtmlBlock);
    playerHtmlBlock.appendChild(playerCharacterHtmlBlock);

    playerProgressbarHtmlBlock.appendChild(playerNameHtml);
    playerProgressbarHtmlBlock.appendChild(playerLifeHtml);

    playerCharacterHtmlBlock.appendChild(playerImageHtml)
}

player1.attack();
player2.attack();
createPlayer('player1', player1.name, player1.img, player1.hp);
createPlayer('player2', player2.name, player2.img, player2.hp);