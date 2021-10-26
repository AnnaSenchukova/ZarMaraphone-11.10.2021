export const player1 = {
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

export const player2 = {
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



function changeHP(damage) {
    function handlingNegativeValuesHP(hp) {
        if(hp <= 0){
            return 0;
        } else {
            return hp;
        }
    }

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

player1.attack();
player2.attack();
