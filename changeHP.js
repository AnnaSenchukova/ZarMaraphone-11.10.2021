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

export default changeHP;
export default renderHP;




