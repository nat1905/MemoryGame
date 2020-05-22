var player = 1;
var numberOfPlayers;
var sel;
var val;
var numberOfCards = 16;
var PlayerNow = document.getElementById("PlayerNow");
var eltScore1 = document.getElementById("score1");
var score1 = 0;
var eltScore2 = document.getElementById("score2");
var score2 = 0;
var eltScore3 = document.getElementById("score3");
var score3 = 0;
var eltScore4 = document.getElementById("score4");
var score4 = 0;
var winner = document.getElementById("winner");
let cardElements = document.getElementsByClassName("game-card");
let cardElementsArray = [...cardElements];
let imgElements = document.getElementsByClassName("game-card-img");
let imgElementsArray = [...imgElements];
let counter = document.getElementById("moveCounter");
let modalElement = document.getElementById("gameOverModal");
let totalGameMovesElement = document.getElementById("totalGameMoves");
let closeModalIcon = document.getElementById("closeModal");
let openedCards = [];
let matchedCards = [];
let moves;
let interval;

//show modal on game start
modalElement.classList.add("show-modal");
closeModal();

//shuffle cards
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//start game
function startGame() {
  //shuffle cards
  let shuffledImages = shuffle(imgElementsArray);

  for (i = 0; i < shuffledImages.length; i++) {
    //remove all images from previous games from each card (if any)
    cardElements[i].innerHTML = "";

    //add the shuffled images to each card
    cardElements[i].appendChild(shuffledImages[i]);
    cardElements[i].type = `${shuffledImages[i].alt}`;

    //remove all extra classes for game play
    cardElements[i].classList.remove("show", "open", "match", "disabled");
    cardElements[i].children[0].classList.remove("show-img");

    //define number of players
    sel = document.getElementById("exampleFormControlSelect1");
    val = sel.options[sel.selectedIndex].value;
    if (val == "1") {
      numberOfPlayers = 1;
    } else if (val == "2") {
      numberOfPlayers = 2;
    } else if (val == "3") {
      numberOfPlayers = 3;
    } else if (val == "4") {
      numberOfPlayers = 4;
    }
  }

  //make event listener on the cards
  for (let i = 0; i < cardElementsArray.length; i++) {
    cardElementsArray[i].addEventListener("click", displayCard);
  }

  //reset moves
  moves = 0;
  counter.innerText = `${moves} move(s)`;
}

//function to change player
function changePlayer() {
  if (numberOfPlayers == 1) {
    player = 1;
    return player;
  } else if (numberOfPlayers == 2) {
    if (player == 1) {
      player = 2;
      return player;
    } else {
      player = 1;
      return player;
    }
  } else if (numberOfPlayers == 3) {
    if (player == 1) {
      player = 2;
      return player;
    } else if (player == 2) {
      player = 3;
      return player;
    } else if (player == 3) {
      player = 1;
      return player;
    }
  } else if (numberOfPlayers == 4) {
    if (player == 1) {
      player = 2;
      return player;
    } else if (player == 2) {
      player = 3;
      return player;
    } else if (player == 3) {
      player = 4;
      return player;
    } else if (player == 4) {
      player = 1;
      return player;
    }
  }
}

//show cards
function displayCard() {
  this.children[0].classList.toggle("show-img");
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
  cardOpen(this);
}

function cardOpen(card) {
  if (player == 2) {
    PlayerNow.textContent = "TWO";
  } else if (player == 3) {
    PlayerNow.textContent = "THREE";
  } else if (player == 4) {
    PlayerNow.textContent = "FOUR";
  } else if (player == 1) {
    PlayerNow.textContent = "ONE";
  }
  openedCards.push(card);
  let len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

//function to check matches
function matched() {
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  matchedCards.push(openedCards[0]);
  matchedCards.push(openedCards[1]);
  openedCards = [];

  //count a score of each player
  if (player == 1) {
    score1 += 50;
  } else if (player == 2) {
    score2 += 50;
  } else if (player == 3) {
    score3 += 50;
  } else if (player == 4) {
    score4 += 50;
  }
  numberOfCards -= 2;

  //change a player
  changePlayer();

  //scores of each players
  eltScore1.textContent = score1;
  eltScore2.textContent = score2;
  eltScore3.textContent = score3;
  eltScore4.textContent = score4;

  if (matchedCards.length == 16) {
    if (score1 > score2 && score1 > score3 && score1 > score4) {
      winner.textContent = "ONE";
    } else if (score2 > score1 && score2 > score3 && score2 > score4) {
      winner.textContent = "TWO";
    } else if (score3 > score1 && score3 > score2 && score3 > score4) {
      winner.textContent = "THREE";
    } else if (score4 > score1 && score4 > score3 && score4 > score2) {
      winner.textContent = "FOUR";
    } else if (score1 == score2 && score1 > score3 && score1 > score4) {
      winner.textContent = "ONE and TWO";
    } else if (score1 == score3 && score1 > score2 && score1 > score4) {
      winner.textContent = "ONE and THREE";
    } else if (score1 == score4 && score1 > score3 && score1 > score2) {
      winner.textContent = "ONE and FOUR";
    } else if (score2 == score3 && score2 > score1 && score2 > score4) {
      winner.textContent = "TWO and THREE";
    } else if (score2 == score4 && score2 > score1 && score2 > score3) {
      winner.textContent = "TWO and FOUR";
    } else if (score3 == score4 && score3 > score1 && score3 > score4) {
      winner.textContent = "THREE and FOUR";
    } else if (score1 == score2 && score1 == score3 && score1 > score4) {
      winner.textContent = "ONE, TWO and THREE";
    } else if (score1 == score3 && score1 == score4 && score1 > score2) {
      winner.textContent = "ONE, THREE and FOUR";
    } else if (score2 == score3 && score2 == score4 && score2 > score1) {
      winner.textContent = "TWO, THREE and FOUR";
    } else if (score1 == score2 && score1 == score3 && score1 == score4) {
      winner.textContent = "ONE, TWO, THREE and FOUR";
    }
    endGame();
  }
}

//function to check unmatches

function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("show", "open", "unmatched");
    openedCards[1].classList.remove("show", "open", "unmatched");
    openedCards[0].children[0].classList.remove("show-img");
    openedCards[1].children[0].classList.remove("show-img");
    enable();
    openedCards = [];
  }, 1100);
  //change a player
  changePlayer();
}

function disable() {
  cardElementsArray.filter((card, i, cardElementsArray) => {
    card.classList.add("disabled");
  });
}

function enable() {
  cardElementsArray.filter((card, i, cardElementsArray) => {
    card.classList.remove("disabled");
    for (let i = 0; i < matchedCards.length; i++) {
      matchedCards[i].classList.add("disabled");
    }
  });
}

function moveCounter() {
  moves++;
  counter.innerHTML = `${moves} move(s)`;
}

function endGame() {
  clearInterval(interval);

  //show moves in Modal

  totalGameMovesElement.innerHTML = moves;

  matchedCards = [];
}

function closeModal() {
  closeModalIcon.addEventListener("click", function () {
    modalElement.classList.remove("show-modal");
    startGame();
  });
}

function playAgain() {
  modalElement.classList.remove("show-modal");
  startGame();
}

// wait for some milliseconds before game starts
window.onload = function () {
  setTimeout(function () {
    startGame();
  }, 1200);
};

function Reset() {
  location.reload();
}
