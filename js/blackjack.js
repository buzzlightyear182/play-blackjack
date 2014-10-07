/*
Write a function called scoreHand that determines the score of a hand in the card game Blackjack (aka 21).
This function takes one parameter which is an array of strings that represent each card in the hand. Each card will be one of the following strings: "2",..,"10", "J", "Q", "K", "A"
It returns a number which is the score of the hand. Return the highest score of the cards that is less than or equal to 21. If there is no score less than or euqal to 21 return the smallest score more than 21.
Scoring rules: In Blackjack number cards count as their face value (2 through 10). Jack, Queen and King count as 10. An Ace can be counted as either 1 or 11.
Examples:
scoreHand(["A"]); //=> 11
scoreHand(["A", "J"]); //=> 21
scoreHand(["A", "10", "A"]); //=> 12
scoreHand(["5", "3", "7"]); //=> 15
scoreHand(["5", "4", "3", "2", "A", "K"]); //=> 25
*/

// clover, heart, spade, diamond

var completeNum = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
var shapes = ["c","h","s","d"];

var dealer = {};
var player = {};

var start = document.getElementById('start');
var hit = document.getElementById('hit');
var end = document.getElementById('end');
var reset = document.getElementById('reset');

start.addEventListener('click',function(event){
  var playerName = prompt("What is your name?");
  document.getElementById('player').children[0].textContent = playerName;

  var hiddenButtons = document.querySelectorAll('button.hide');
  for (i=0; i < hiddenButtons.length; i++){
    hiddenButtons[i].classList.remove('hide');
  }
  event.target.classList.add('hide');

  initialize(player, "player");
  initialize(dealer, "dealer");

  dealerCards("?");
  printCards(player);

  dealerScore();
  updateScore(player);
});

hit.addEventListener('click',function(event){
  hitMe(player);
  checkDealerHit();
  updateScore(player);
});

end.addEventListener('click', function(event){
  showCards(dealer);
  updateScore(player);
  updateScore(dealer);
});

reset.addEventListener('click', function(event){
  window.location.reload();
})

function initialize(side, text) {
  side.hand = getCard();
  side.score = scoreHand(side.hand);
  side.name = text;
};

function updateScore(side){
  document.getElementById(side.name).children[2].classList.remove('hide');
  document.getElementById(side.name).children[2].textContent = "Score = " + side.score;
};

function printCards(side){
  var cards = side.hand;
  for (var i=0; i < cards.length; i++){
    makeCard(cards[i], side.name)
  }
};

function dealerCards(content){
  makeCard(content, "dealer");
  makeCard(content, "dealer");
}

function dealerScore(){
  document.getElementById('dealer').children[2].classList.remove('hide');
  document.getElementById('dealer').children[2].textContent = "Score = ?";
}

function showCards(side){
   var cards = side.hand;
  for (var i=0; i < cards.length; i++){
    document.getElementById(side.name).children[1].children[i].textContent = cards[i];
  };
};

function makeCard(value, classname){
  var listItem = document.createElement('li');
  listItem.classList.add(classname);
  listItem.textContent = value;
  document.getElementById(classname).children[1].appendChild(listItem);
};

function hitMe(side){
  var card = randomize(completeNum);
  var current = side.hand;
  current.push(card);
  side.score = scoreHand(current);

  if (side.name === "dealer"){
    makeCard("?", "dealer");
  }
  else {
    makeCard(card, side.name);
  }
}

function checkDealerHit(){
  if (dealer.score >= 17) {
    // console.log("NO HIT dealerScore: " + dealer.score);
  }
  else {
    hitMe(dealer);
  }
};

function getCard(){
  hand = [];
  i = 0;
  while (i < 2) {
    var card = randomize(completeNum);
    hand.push(card);
    i+=1;
  }
  return hand
};

function randomize(array){
  return array[Math.ceil(Math.random()*(array.length))-1];
}

function scoreHand(cards){

  var aceOnly = [];

//Arrange cards
  for (i = 0; i < cards.length; i++) {
    while (cards[i] === "A") {
      cards.splice(i,1);
      aceOnly.push("A");
    }
  }

  var sorted = cards.concat.apply(cards, aceOnly);

//First loop
  var container = [];
  var total = 0;
  var alphabet = ["J","Q","K"];

  for (i=0; i < sorted.length; i++){
    if (sorted[i] <= 10) {
      container.push(parseInt(sorted[i]));
    }
    else if (alphabet.indexOf(sorted[i]) >= 0) {
      container.push(10);
    }
    else { //for Aces
      if (11 <= (21-total) && sorted.lastIndexOf("A") == i) {
        container.push(11);
      }
      else {
        container.push(1);
      } //close Ace else
    } //close Loop else
    getTotal(container);
  } //close For loop

  function getTotal(container){
    total = 0;
    for (x = 0; x < container.length; x++) {
      total = total + container[x];
    }
  }
  return total;
}

//Test data:
// scoreHand(["J","A"]); //=> 21
// scoreHand(["A"]); //=> 11
// scoreHand(["A","A"]); //=> 12
// scoreHand(["9","A","A"]); //=> 21
// scoreHand(["J","A","A"]); //=> 12
// scoreHand(["J","J","A"]); //=> 21
// scoreHand(["A","A","A"]); //=> 13
