//please note the functions(*) for the deck creation and shuffle are not my own
//credit for these parts goes to Dev Dojo all other parts are my own creation

//snap code starts at line 270
//clock code starts at line 545
//pairs code starts at 884

//pontoon game code
//pontoon buttons
const butt = document.getElementById("ace", "stick", "twist", "game");
const button = document.getElementById("play");
butt.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);
button.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);

const cards = [];

//pontoon
//(*)
function card(name, value, suit) {
  this.name = name;
  this.value = value;
  this.suit = suit;
}
//(*)
function deck() {
  this.names = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  this.suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  var cards = [];

  for (var s = 0; s < this.suits.length; s++) {
    for (var n = 0; n < this.names.length; n++) {
      cards.push(new card(n + 1, this.names[n], this.suits[s]));
    }
  }
  return cards;
}

//random cards drawn
//cards adds up
//try to get 21 without going over 21
//comp opponent

//outer scope vars to use throughout program

var myPack = new deck();

var total1 = 0; //used to sum  values of all cards in hand
var user1StartHand = []; //to be used for 1st 2 cards drawn
var user1Hand = []; //to be used through rest of game
var z = []; //used to get single card value
var dealtCard = []; //to be used to identify drawn card

//design of the deck
//(*)changed slightly as only need few cards to show not full deck

function design(x) {
  var col = [];
  let gridIte = document.getElementsByClassName("gridItem");

  for (var i = 0; i < x.length; i++) {
    gridIte = document.createElement("div");

    if (x[i].suit == "Diamonds") {
      var ascii_char = "&diams;";
    } else {
      var ascii_char = "&" + x[i].suit.toLowerCase() + ";";
    }
    if (x[i].suit === "Diamonds" || x[i].suit === "Hearts") {
      col.push("red");
    } else {
      col.push("black");
    }

    gridIte.innerHTML =
      '<span class="number">' +
      x[i].value +
      '</span><span  class="suit" >' +
      ascii_char +
      "</span>";

    gridIte.setAttribute("id", "card");
    gridItem.parentNode.insertAdjacentElement("afterend", gridIte);
    //document.append(div);
  }
}

//get random total for computer score/opponent
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const getRandom = getRandomInt(15, 23);
const comp = getRandom;

//need new deck and 2 cards in hand
//shuffle deck-new deck

//(*)
//shuffle so all cards not in suit order
function shuff(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}
myPack = shuff(myPack);

//to create user1Hand with 2 start cards
function start(e) {
  user1StartHand = myPack.slice(0, 2);
  if (button.innerText === "Play") {
    button.innerText = "Click Twist or Stick";
  }
  return design(user1StartHand);
}

//add cards total method
//swap j,q,k, for 10 ech
// then add cards in hand to get total
let sum = 0; //used for total of stat 2 cards

//to total up start to cards
function handTotal(y) {
  let z = y.slice(1);
  let w = y.slice(0, 1);
  let a = z[0].value;
  let b = w[0].value;
  let c = 0;
  let d = 0;
  let num = 0;

  if (a === "J" || a === "Q" || a === "K") {
    c = c + 10;
  } else if (a === "A") {
    c = c + 0;
  } else c = a;
  {
  }

  if (b === "J" || b === "Q" || b === "K") {
    d = d + 10;
  } else if (b === "A") {
    d = d + 0;
  } else {
    d = b;
  }
  sum = +c + +d;

  return sum;
}

//to be able twist need to draw/deal 1 card from pack and add to user hand
var sum1 = 0; //used to total dealtcards value

function twist(e) {
  let d = []; //as you cant use dealtcard array have to use new array
  if (totalHandValue() === 21) {
    alert("you have 21 click STICK to see who wins");
  } else if (totalHandValue() < 21) {
    dealtCard = myPack.pop();
    d.push(dealtCard);
    user1Hand.push(dealtCard);

    design(d);
    sum1 = sum1 + cardValue(d);

    return dealtCard;
  } else {
    alert("bust");
  }
}

//used to find value of each dealtCard
function cardValue(z) {
  let total = 0;
  let a = z[0].value;
  let c = 0;

  if (a === "J" || a === "Q" || a === "K") {
    c = c + 10;
  } else if (a === "A") {
    c = 0; // using 0 for aces till player decides value
  } else {
    c = a;
  }

  total = +c;

  return total;
}
//adding start hand dealt cards values and ace values
function totalHandValue() {
  let total2 = handTotal(user1StartHand);
  //if there aces in hand then add value of aces
  total1 = sum1 + total2 + aceValues;

  return total1;
}

//total up hands and see who wins and letting player know

function stick(e) {
  if ((totalHandValue() > 21) & (comp > 21)) {
    alert("Both you and computer bust , its a draw");
  } else if (totalHandValue() > 21) {
    alert("BUST");
  } else if (comp > 21) {
    alert(" The computer bust You win");
  } else if (totalHandValue() > comp) {
    alert(
      "You Win your score is  " + total1 + ". The computers score is " + comp
    );
  } else if (comp > total1) {
    alert(
      "The computer wins their score is  " + comp + ". your score is " + total1
    );
  } else {
    alert(
      "Its a draw your score is " + total1 + " the computers score is  " + comp
    );
  }
}
// to change value of ace and its button to show value
function aceValue(e) {
  if (butt.innerText === "click here to choose value of Ace") {
    butt.innerText = "Ace = 1";
    aceValues = 1;
  } else if (butt.innerText === "Ace = 1") {
    butt.innerText = "Ace = 11";
    aceValues = 11;
  } else {
    butt.innerText = "Ace = 1";
    aceValues = 1;
  }
  return aceValue;
}
var aceValues = 0; //use to determine ace values
// to clear board of cards and start new game
function newGame(e) {
  location.reload();
}

//SNAP code start
//snap buttons
const snapButto = document.getElementById("playGame");
snapButto.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);

const snapButton = document.getElementById("nextCard", "playGame", "Snaps");
snapButton.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);
const snapButt = document.getElementById("difficulty");
snapButt.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);

const CARDSUITS = ["♥", "♦", "♠", "♣"];
const CARDVALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Carddeck {
  constructor(cardsDeck = fullDeck()) {
    this.cardsDeck = cardsDeck;
  }

  get cardNumbers() {
    return this.cardsDeck.length;
  }

  shuffle() {
    for (let i = this.cardNumbers - 1; i > 0; i--) {
      const newPlace = Math.floor(Math.random() * (i + 1));
      const oldPlace = this.cardsDeck[newPlace];
      this.cardsDeck[newPlace] = this.cardsDeck[i];
      this.cardsDeck[i] = oldPlace;
    }
  }
}

class SoloCard {
  constructor(suit, value) {
    this.value = value;
    this.suit = suit;
  }

  cardsColor() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }
  //for snap game
  GetHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("newCard");
    cardDiv.classList.add(this.cardsColor());
    cardDiv.dataset.value = `${this.value} ${this.suit} `;
    return cardDiv;
  }

  //for clock game
  SortHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("newClockCard");
    cardDiv.classList.add(this.cardsColor());
    cardDiv.dataset.value = `${this.value} ${this.suit} `;
    return cardDiv;
  }
  designCardBack() {
    const cardDiv = document.createElement("button");
    cardDiv.type = "button";
    cardDiv.setAttribute("onClick", "pairTurn(this.id)");
    cardDiv.classList.add("cardBack");
    cardDiv.id = cardNumber;
    cardDiv.dataset.value = `${this.value} ${this.suit} `;
    return cardDiv;
  }

  /**for pairs */
  ShowHTML() {
    const cardDiv = document.createElement("button");
    cardDiv.type = "button";
    cardDiv.setAttribute("onClick", "turnBack(this.id)");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("newPairCard");
    cardDiv.classList.add(this.cardsColor());
    cardDiv.id = num;
    cardDiv.dataset.value = `${this.value} ${this.suit} `;

    return cardDiv;
  }
  HideCard() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("neverGoingToSeeThis");
    cardDiv.innerText = "";
    cardDiv.dataset.value = `${this.value} ${this.suit} `;
    return cardDiv;
  }
}
function fullDeck() {
  return CARDSUITS.flatMap((suit) => {
    return CARDVALUES.map((value) => {
      return new SoloCard(suit, value);
    });
  });
}

const myCardDeck = new Carddeck();

myCardDeck.shuffle();

const playCards = myCardDeck.cardsDeck;

//need to split pack into 2 hands
//difficulty easy/med/hard set computer time for using snap?
//player who has all cards wins

//get the html aspects required
const userPlayerCards = document.querySelector(".userPlayerCards");
const compPlayerCards = document.querySelector(".compPlayerCards");
const userCards = document.querySelector(".usercards");
const cCard = document.querySelector(".cCard");

//global variables
const player1Cards = [];
const computerCards = [];
const usedCards = [];
let delay = 5000;

//setting difficulty
function level(e) {
  if (snapButt.innerText === "Click here to choose your difficulty level") {
    snapButt.innerText = "EASY";
    delay = 5000;
  } else if (snapButt.innerText === "EASY") {
    snapButt.innerText = "MEDIUM";
    delay = 4000;
  } else if (snapButt.innerText === "MEDIUM") {
    snapButt.innerText = "HARD";
    delay = 1000;
  } else if (snapButt.innerText === "HARD") {
    snapButt.innerText = "Click here to choose your difficulty level";
    delay = 5000;
  }
  return level;
}

//splitting deck into 2 hands
function playGame(e) {
  //initial split
  const split1 = playCards.slice(0, 26);
  const split2 = playCards.slice(26, 52);
  // separating 2 initial face up cards
  const playerStartCard = split1.shift();
  const computerStartCard = split2.shift();

  userPlayerCards.appendChild(playerStartCard.GetHTML());
  compPlayerCards.appendChild(computerStartCard.GetHTML());
  //change start button message
  if (snapButto.innerText === "Click to start your game") {
    snapButto.innerText = " Now click next card , snap or new game";
  }
  userCards.innerText = "  Your  card  count is   \n " + split1.length;
  cCard.innerText = " Computer's card count     \n" + split2.length;

  player1Cards.push(split1);
  computerCards.push(split2);

  usedCards.push(playerStartCard);
  usedCards.push(computerStartCard);

  card1s.push(playerStartCard);
  card2s.push(computerStartCard);
}

//turn 1 card over at a time for player hand and comp hand show card on playing board
const card1s = [];
const card2s = [];
let timeoutId;

/*function timerId() {
 timeoutId =   setTimeout(function() {checkForSnap()}, delay);
}*/

function nextCard(e) {
  if (player1Cards[0].length === 0 || computerCards[0].length === 0) {
    winner();
  } else {
    const card1 = player1Cards[0].shift();
    const card2 = computerCards[0].shift();

    userPlayerCards.replaceChildren(card1.GetHTML());
    compPlayerCards.replaceChildren(card2.GetHTML());

    userCards.innerText =
      "  Your  card  count is  \n  " + player1Cards[0].length;
    cCard.innerText =
      " Computer's card count is   \n " + computerCards[0].length;

    usedCards.push(card1);
    usedCards.push(card2);

    card1s.splice(0);
    card2s.splice(0);

    card1s.push(card1);
    card2s.push(card2);

    if (card1s[0].value === card2s[0].value) {
      timeoutId = setTimeout(function () {
        checkForSnap();
      }, delay);
    } else {
    }
  }
}

function checkForSnap() {
  clearTimeout(timeoutId);
  if (card1s[0].value === card2s[0].value) {
    const hold1 = usedCards.slice();
    for (let i = 0; i < hold1.length; i++) {
      computerCards[0].push(hold1[i]);
    }
    usedCards.splice(0);
    hold1.splice(0);

    //cCard.innerText= " you missed a snap computer card count is \n  " + (computerCards[0].length )

    userPlayerCards.replaceChildren();
    compPlayerCards.replaceChildren();

    // alert( 'You missed a snap computer got the cards')

    clearTimeout(timeoutId);
  } else {
    clearTimeout(timeoutId);
  }
}

//button click to call snap if true snap cards go to player/comps hand

function snaps(e) {
  if (card1s[0].value === card2s[0].value) {
    const hold = usedCards.slice();
    for (let i = 0; i < hold.length; i++) {
      player1Cards[0].push(hold[i]);
    }

    usedCards.splice(0);
    hold.splice(0);

    userCards.innerText =
      "  your  card  count is  \n  " + player1Cards[0].length;

    userPlayerCards.replaceChildren();
    compPlayerCards.replaceChildren();
  } else {
    alert(
      " Sorry  those  numbers dont match click Next Card to continue your game"
    );
  }
}

//check if each player still has cards in hand if 1 has no cards declare other winner

function winner() {
  if ((player1Cards[0].length === 0) & (computerCards[0].length > 0)) {
    alert("The computer has won \n click New game to play again");
  } else if ((computerCards[0].length === 0) & (player1Cards[0].length > 0)) {
    alert("You win \n click New game to play again");
  } else {
    if ((player1Cards[0].length === 0) & (computerCards[0].length === 0)) {
      alert("It is a draw \n click New game to play again");
    }
  }
}
function newGame(e) {
  location.reload();
}

/** start of CLOCK code */

const clockBegin = document.getElementById("begin");
clockBegin.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);

var turnValue = "";

var x = document.getElementById("turn");

x.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);

/**get html elements required */

const midOClock = document.querySelector(".mid");
const hand2 = document.querySelector(".hand2");

var oneOClockCard = document.querySelector(".oneOClockCard");
const twoOClockCard = document.querySelector(".twoOClockCard");
const threeOClockCard = document.querySelector(".threeOClockCard");
const fourOClockCard = document.querySelector(".fourOClockCard");
const fiveOClockCard = document.querySelector(".fiveOClockCard");
const sixOClockCard = document.querySelector(".sixOClockCard");
const sevenOClockCard = document.querySelector(".sevenOClockCard");
const eightOClockCard = document.querySelector(".eightOClockCard");
const nineOClockCard = document.querySelector(".nineOClockCard");
const tenOClockCard = document.querySelector(".tenOClockCard");
const elevenOClockCard = document.querySelector(".elevenOClockCard");
const twelveOClockCard = document.querySelector(".twelveOClockCard");
const midOClockCard = document.querySelector(".midCard");

const clockDeck = new Carddeck();

clockDeck.shuffle();

var clockArrays = [
  ["a[]"],
  ["2[]"],
  ["3["],
  ["4[]"],
  ["5[]"],
  ["6[]"],
  ["7[]"],
  ["8[]"],
  ["9[]"],
  ["10[]"],
  ["j[]"],
  ["q[]"],
  ["k[]"],
];

const clockCards = clockDeck.cardsDeck;

/**splitting the deck into 13 to place around clock position */
function begin(e) {
  hand2.style.display = "none";
  for (let i = 0; i < clockCards.length; i++) {
    for (const item of clockArrays) {
      item.push(clockCards.splice(0, 4));
    }
  }
}
var count = 0;
/** turn clicked pile card over moving card to correct position */
/** get card from correct clockArray transfer and show on  card slot */
function turn(e) {
  var clockCard = [];
  /**need to do if all clock arrays sub arrays =4 you win */
  /**add seperated cards to correct piles */

  if (count === 4) {
    newGame();
  } else {
    try {
      switch (e) {
        case "one":
          if (clockArrays[0][1].length < 1) {
            alert("No cards left in this stack use number 2 instead");
          } else {
            clockCard = clockArrays[0][1][0];
            clockArrays[0][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "two":
          if (clockArrays[1][1].length < 1) {
            alert("No cards left in this stack use number 3 instead");
          } else {
            clockCard = clockArrays[1][1][0];
            clockArrays[1][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "three":
          if (clockArrays[2][1].length < 1) {
            alert("No cards left in this stack use number 4 instead");
          } else {
            clockCard = clockArrays[2][1][0];
            clockArrays[2][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "four":
          if (clockArrays[3][1].length < 1) {
            alert("No cards left in this stack use number 5 instead");
          } else {
            clockCard = clockArrays[3][1][0];
            clockArrays[3][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "five":
          if (clockArrays[4][1].length < 1) {
            alert("No cards left in this stack use number 6 instead");
          } else {
            clockCard = clockArrays[4][1][0];
            clockArrays[4][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "six":
          if (clockArrays[5][1].length < 1) {
            alert("No cards left in this stack use number 7 instead");
          } else {
            clockCard = clockArrays[5][1][0];
            clockArrays[5][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "seven":
          if (clockArrays[6][1].length < 1) {
            alert("No cards left in this stack use number 8 instead");
          } else {
            clockCard = clockArrays[6][1][0];
            clockArrays[6][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "eight":
          if (clockArrays[7][1].length < 1) {
            alert("No cards left in this stack use number 9 instead");
          } else {
            clockCard = clockArrays[7][1][0];
            clockArrays[7][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "nine":
          if (clockArrays[8][1].length < 1) {
            alert("No cards left in this stack use number 10 instead");
          } else {
            clockCard = clockArrays[8][1][0];
            clockArrays[8][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "ten":
          if (clockArrays[9][1].length < 1) {
            alert("No cards left in this stack use number J instead");
          } else {
            clockCard = clockArrays[9][1][0];
            clockArrays[9][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "J":
          if (clockArrays[10][1].length < 1) {
            alert("No cards left in this stack use number Q instead");
          } else {
            clockCard = clockArrays[10][1][0];
            clockArrays[10][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "Q":
          if (clockArrays[11][1].length < 1) {
            alert("No cards left in this stack use number K instead");
          } else {
            clockCard = clockArrays[11][1][0];
            clockArrays[11][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
        case "K":
          if (clockArrays[12][1].length < 1) {
            alert("No cards left in this stack use number A instead");
          } else {
            clockCard = clockArrays[12][1][0];
            clockArrays[12][1].splice(0, 1);
            move();
            clockCard = [];
          }
          break;
      }
    } catch (error) {
      alert("Please click begin to start");
    }
  }
  /**move card to right position */

  function move() {
    if (
      clockArrays[0][1].length < 1 &&
      clockArrays[1][1].length < 1 &&
      clockArrays[2][1].length < 1 &&
      clockArrays[3][1].length < 1 &&
      clockArrays[4][1].length < 1 &&
      clockArrays[5][1].length < 1 &&
      clockArrays[6][1].length < 1 &&
      clockArrays[7][1].length < 1 &&
      clockArrays[8][1].length < 1 &&
      clockArrays[9][1].length < 1 &&
      clockArrays[10][1].length < 1 &&
      clockArrays[11][1].length < 1 &&
      clockArrays[12][1].length < 4
    ) {
      alert(
        "***Congratulations*** \n you beat the clock. click New Game and then Begin to play again"
      );
    } else {
      switch (clockCard.value) {
        case "A":
          oneOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(125deg)";
          clockCard = [];
          break;
        case "2":
          twoOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(160deg)";
          clockCard = [];
          break;
        case "3":
          threeOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(180deg)";
          clockCard = [];
          break;
        case "4":
          fourOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(205deg)";
          clockCard = [];
          break;
        case "5":
          fiveOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(240deg)";
          clockCard = [];
          break;
        case "6":
          sixOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(270deg)";
          clockCard = [];
          break;
        case "7":
          sevenOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(300deg)";
          clockCard = [];
          break;
        case "8":
          eightOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(330deg)";
          clockCard = [];
          break;
        case "9":
          nineOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(0deg)";
          clockCard = [];
          break;
        case "10":
          tenOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(25deg)";
          clockCard = [];
          break;
        case "J":
          elevenOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(55deg)";
          clockCard = [];
          break;
        case "Q":
          twelveOClockCard.replaceChildren(clockCard.SortHTML());
          hand2.style.display = "initial";
          hand2.style.transform = "rotate(90deg)";
          clockCard = [];
          break;
        case "K":
          midOClockCard.replaceChildren(clockCard.SortHTML());

          hand2.style.display = "none";
          count = count + 1;

          if (midOClock.lastChild.data === "K") {
            midOClock.lastChild.data = "k =" + count;
          } else if ((midOClock.lastChild.data = count)) {
            midOClock.lastChild.data = "k =" + count;
          }

          if (count === 4) {
            alert(
              "Sorry you loose, All the Kings are in the middle.click New Game to try Again"
            );
          }
          clockCard = [];
          break;
      }
    }
  }
}

/**Start of pairs  code */

const pairDeck = new Carddeck();

pairDeck.shuffle();

const pairCards = pairDeck.cardsDeck;
/**get pairs buttons */
const pairStart = document.getElementById("pairsStart");
pairStart.addEventListener(
  "click",
  function (e) {
    return false;
  },
  false
);

/**get solitaire html elements  */

const pairBoard = document.querySelector(".pairsBoard");
const cardBack = document.querySelector(".cardBack");
const tries = document.querySelector(".tryCount");

var cardNumber = 0;
var pCard = [];

function pairBegin(e) {
  pairCards.map((pCard) => {
    pCard.id = cardNumber + 1;
    cardNumber = cardNumber + 1;
    pairBoard.append(pCard.designCardBack());
  });
  pCard.push(pairCards);
  pairStart.innerText = "";
}

var turnCount = 0;
var triesCount = 0;
var num = 0;
var turnedCards = [];
var matchedPairs = 0;

function pairTurn(e) {
  if (turnCount < 2) {
    pCard[0].map((car) => {
      if (e == car.id) {
        num = e;
        car.id = num;
        pairBoard.children[num - 1].replaceWith(car.ShowHTML());
        turnCount = turnCount + 1;
        triesCount = triesCount + 1;
        tries.innerHTML = " number of tries " + triesCount;
        turnedCards.push(car);
        console.log(turnedCards);
      }
    });
  } else if (turnCount === 2) {
    alert("to many cards turned over");
  }
  match();
}

var numb = 0;

function turnBack(e) {
  pCard[0].map((car) => {
    if (e === car.id) {
      numb = e;
      cardNumber = e;
      pairBoard.children[numb - 1].replaceWith(car.designCardBack());
      turnCount = turnCount - 1;
      turnedCards.map((tCard) => {
        if (tCard.id == e) {
          var cardUnturn = turnedCards.indexOf(tCard);
          turnedCards.splice(cardUnturn, 1);
        }
      });
    }
  });
}

function match() {
  if (turnCount === 2) {
    if (turnedCards[0].value === turnedCards[1].value) {
      turnCount = turnCount - 2;
      pCard[0].map((car) => {
        if (turnedCards[0].id == car.id) {
          console.log(car.id);
          let val = car.id;
          pairBoard.children[val - 1].replaceWith(car.HideCard());
        }

        if (turnedCards[1].id == car.id) {
          console.log(car.id);
          let val2 = car.id;
          pairBoard.children[val2 - 1].replaceWith(car.HideCard());
        }
      });
      turnedCards = [];
      matchedPairs = matchedPairs + 1;

      if (matchedPairs === 26) {
        alert(
          " Congratulations you found all the pairs in " +
            triesCount +
            " tries.    Click new game to try and beat you score "
        );
      }
    } else {
      turnedCards = turnedCards;
    }
  }
}
