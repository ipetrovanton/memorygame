let suits = ['♣', '♠', '♥', '♦'];
let weight = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let openCards = 1;
let lastCard = "";
class Card {
    constructor(color,suits,weight, id) {
        this.color = color;
        this.weight = weight;
        this.suits = suits;
        this.id = id;
    };
    
}

let cardArray = [];
function cardToArray(a, b, c, arr, id) {
    let card = new Card(a, b, c, id);
    arr.push(card);
}

let id = 0;
    for(let k = 0; k < suits.length; k++){
        for(let n = 0; n < weight.length; n++){
            let element1;
            element1 = k < 2 ? 'black' : 'red';
            let element2 = suits[k];
            let element3 = weight[n];
            cardToArray(element1, element2, element3, cardArray, id);
            id++;
        }
    }


function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
    }
function get_array(number){
    let unique = number / 2;
    let arrElem = [];
    for(let i=0; i < unique; i++){
        let id = 0;
        while(arrElem.indexOf(id) != -1) {
            id = randomInteger(0, 51);
        }
        arrElem.push(id);
    }
    return arrElem;
}

function card_for_game(arr){
    let newArr = arr.concat(arr);
    let index, valueIndex; 
	  for (let i=0; i<newArr.length; i++) {
		index = Math.floor(Math.random()*i);
		valueIndex = newArr[index];
		newArr[index] = newArr[i];
		newArr[i] = valueIndex;
      }
      return newArr;
}

function get_cards(arr){
    let playArr = [];
    arr.forEach(element => {
        console.log(element);
        playArr.push(cardArray.find(card => card.id == element));
    });
    return playArr;
}

function create_field(arr){
        let m = 0;
    arr.forEach(element => {
        let i = arr.indexOf(element);
        let card = document.createElement('div');
        card.className = 'card  $element.color';
        //card.className = element.color;
        card.id = 'card' + m;
        ++m;
        card.innerHTML = "<h3>" + element.weight + element.suits + "<\h3>";
        card.style.color = element.color;
        let cardField = document.getElementById('game_field');
        cardField.appendChild(card);
    });
    let cards = document.querySelectorAll("div.card");
    cards.forEach(element => {
        element.addEventListener("click", function (event) {
            openCard(this.id);
        });
    });
}

function hider(){
    let el = document.querySelectorAll(".card");
    el.forEach(element => {
        element.style.cssText = "font-size: 0";
    });
}


function start_game(){
    create_field(get_cards(card_for_game(get_array(16))));
    let card = document.querySelectorAll("div.card");
    setTimeout(hider, 5000);
}

function openCard(id) {
    ++openCards;
    let cardId = id;
    let card = document.getElementById(cardId);
    if(card.innerHTML == lastCard.innerHTML){
        card.className = 'opened';
        lastCard.className = 'opened';
    }
    card.style.cssText = "font-size: medium";
    lastCard = card;
    if (openCards == 3) {
        openCards = 0;
        lastCard = "";
        hider();
    }
    console.log(openCards);
    
}



start_game();

console.log(card_for_game(get_array(16)));
console.log(get_array(16));
console.log(cardArray);
console.log(get_cards(card_for_game(get_array(16))));