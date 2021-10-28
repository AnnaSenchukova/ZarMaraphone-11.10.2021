class Player {
    constructor({selector, name, hp, img}){
        this.selector = selector;
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = ['stranglehold', 'guns', 'fan', 'knife','club'];
    }


    attack = () => console.log(`${this.name} Fight...`);
    changeHP = (damage) => {
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
    };
    renderHP = () => {
        function elHP(playerSelector){
            const playerLifeHtml = document.querySelector('.player'+ playerSelector + ' .life');
            return playerLifeHtml;
        }

        const element = elHP(this.selector);
        return element.style.width = this.hp + '%';
    };

    isLooser = function(){
        const statusLooser = () => this.hp <= 0;
        return statusLooser();
    }

}


export const player1 = new Player({
    selector: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
});


console.log(player1);

export const player2 = new Player({
    selector: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
});

console.log(player2);


player1.attack();
player2.attack();

export default Player;