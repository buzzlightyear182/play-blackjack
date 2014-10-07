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

var computer = {};
var player = {};

var start = document.getElementById('start');
var hit = document.getElementById('hit');
var end = document.getElementById('end');

start.addEventListener('click',function(event){
  event.target.classList.add('hide');
  event.target.nextElementSibling.classList.remove('hide');
  event.target.nextElementSibling.nextElementSibling.classList.remove('hide');

  initialize(player);
  initialize(computer);

  printComputerCards();
  printPlayerCards();

  // console.log("P " + player.hand, player.score);
  // console.log("C " + computer.hand, computer.score);
});

hit.addEventListener('click',function(event){
  hitMe(player);
  checkComputerHit();

  // console.log("new P " + player.hand, player.score);
  // console.log("new C " + computer.hand, computer.score);
});

end.addEventListener('click', function(event){
  //show scores;
});

function printComputerCards(){
  var cards = computer.hand;
  for (var i=0; i < cards.length; i++){
  // console.log(cards[i]);

  var listItem = document.createElement('li');
  listItem.classList.add("computer");
  listItem.textContent = " ";
  document.getElementById("computer").children[1].appendChild(listItem);
  }
};

function printPlayerCards(){
  var cards = player.hand;
  for (var i=0; i < cards.length; i++){
  // console.log(cards[i]);

  var listItem = document.createElement('li');
  listItem.classList.add("player");
  listItem.textContent = cards[i];
  document.getElementById("player").children[1].appendChild(listItem);
  }
};

function initialize(side) {
    side.hand = getCard();
    side.score = scoreHand(side.hand);
    side.name = side;
};

function hitMe(side){
  var card = randomize(completeNum);
  var current = side.hand;
  // console.log("current: " + side.hand);

  current.push(card);
  side.score = scoreHand(current);

  // console.log("new hand: " + current);
  // console.log("new score: " + side.score);
}

function checkComputerHit(){
  if (computer.score >= 17) {
    // console.log("NO HIT computerScore: " + computer.score);
  }
  else {
    hitMe(computer);
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
