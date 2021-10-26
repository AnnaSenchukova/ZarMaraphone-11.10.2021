const arenasHtmlBlock = document.querySelector('.arenas');
const formFightHtml = document.querySelector('.control');

const hitValue = {
    head: 30,
    body: 25,
    foot: 20,
};

const attackArray = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};



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
        return playerLifeHtml;
    }

    const element = elHP(this.selector);
    return element.style.width = this.hp + '%';
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

function disabledFormElement() {
    for (let formElement of formFightHtml) {
        if(formElement.type === 'radio' || formElement.type === 'submit') {
            formElement.disabled = true;
        }
    }
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


function generateLog(type, player1, player2){
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
}

formFightHtml.addEventListener('submit', function (event) {
    event.preventDefault();

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


    displayingTheResultOfTheGames(player1, player2, renderReloadButton);

});

player1.attack();
player2.attack();
arenasHtmlBlock.appendChild(createPlayer(player1));

arenasHtmlBlock.appendChild(createPlayer(player2));

generateLog("start", player1, player2);

