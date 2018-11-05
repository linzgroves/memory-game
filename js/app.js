// Create an array that holds the icon classes that will need to be shuffled
const deckArray = ['fa-diamond', 'fa-paper-plane', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane',
    'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
  ],
  // Iterate over array items and return a single value with 'reduce'
  listItems = deckArray.reduce((result, icon) => {
    // Use template literals to add the returned value from the array to the html template for li items
    result += `<li class="card"><i class="fa ${icon}"></i></li>`;
    return result;
  }, '');
resultElement = document.getElementById('resultDeck');

resultElement.innerHTML = listItems;
/*
 * Create a list that holds all of your cards
 * This also targets the parent element of .card li items so addEventListener can be used
 */
const deck = document.querySelector('.deck');

// Turn nodeList of all li elements into an array that can be used by shuffle function
function shuffleCards() {
  const cardsToShuffle = [].slice.call(document.querySelectorAll("li.card"));
  const shuffledDeck = shuffle(cardsToShuffle);
  for (card of shuffledDeck) {
    deck.appendChild(card);
  }
}
shuffleCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Reset function to turn cards back over
function resetDeck() {
  const cards = document.querySelectorAll('.deck li');
  for (card of cards) {
    card.className = "card";
  }
}

// Create a timer value that will initially be set to false until user begins game
let timerOff = true;
let timeLength = 0;
let timerId;


// Function to start the timer when initial valid click happens
function startTimer() {
  timerId = setInterval(() => {
    timeLength++;
    showTimer();
  }, 1000);
}

// Function to stop the timer, which will be used when user wins game
function stopTimer() {
  clearInterval(timerId);
}

// Function to display the timer
function showTimer() {
  const timer = document.querySelector('.timer');
  let minutes = parseInt(timeLength / 60);
  let seconds = timeLength % 60;
  if (seconds < 10) {
    timer.innerHTML = `Time: ${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `Time: ${minutes}:${seconds}`;
  }
}

// Restart function to reload the page/game
function resetGame() {
  resetTimer();
  resetStars();
  resetMoves();
  resetDeck();
}

function resetTimer() {
  stopTimer();
  timerOff = true;
  timeLength = 0;
  showTimer();
}

function resetStars() {
  starCount = 0;
  const allStars = document.querySelectorAll('.stars li i');
  for (star of allStars) {
    if (star.classList.contains('fa-star-o')) {
      star.classList.toggle('fa-star-o');
      star.classList.toggle('fa-star');
    }
  }
}

function resetMoves() {
  counts = 0;
  document.querySelector('.moves').innerHTML = `Moves: ${counts}`;
}

// Function to take game stats and display them in modal
function displayStats() {
  const timeStat = document.querySelector('.modal-time');
  const timerStopped = document.querySelector('.timer').innerHTML;
  const starStat = document.querySelector('.modal-stars');
  const moveStat = document.querySelector('.modal-moves');

  timeStat.innerHTML = `${timerStopped}`;
  moveStat.innerHTML = `Moves: ${counts}`;
  starStat.innerHTML = `Stars: ${starCount}`;
}

// Function to show modal
function showModal() {
  const modal = document.querySelector('.modal-container');
  modal.classList.toggle('hide');
}

// Event listener for closing the modal
document.querySelector('.modal-close').addEventListener('click', event => {
  showModal();
  resetGame();
});

// Event listener for replaying the game
document.querySelector('.playAgain').addEventListener('click', event => {
  showModal();
  resetGame();
});

document.querySelector('.restart').addEventListener('click', event => {
  resetGame();
});

// Create an empty array for the two toggled cards to pushed to so they can be compared
let toggledCards = [];

// Use addEventListener to listen for the cards being clicked and then call the toggle function
deck.addEventListener('click', event => {
  const cardTarget = event.target;
  if (isValidClick(cardTarget)) {
    if (timerOff) {
      startTimer();
      timerOff = false;
    }
    toggleCard(cardTarget);
    toggledCardsList(cardTarget);
    if (toggledCards.length === 2) {
      checkIfMatch(cardTarget);
      addCount();
    }
  }
});

// Check if click meets all the conditions
function isValidClick(cardTarget) {
  return (
    cardTarget.classList.contains('card') &&
    !cardTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(cardTarget)
  );
}

// This toggles the open and show classes
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

// Function to push any toggled cards into the toggledCards array
function toggledCardsList(cardTarget) {
  toggledCards.push(cardTarget);
}

// Check if the cards clicked and added to the toggledCards array match and add timeout so toggles isn't immediate
let matched = 0;
const TOTAL_PAIRS = 8;

function checkIfMatch() {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++;
    if (matched === TOTAL_PAIRS) {
      setTimeout(() => {
        gameWon();
      }, 1000);
    }
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
}

// Handle determining if user has won
function gameWon() {
  stopTimer();
  displayStats();
  showModal();
  resetDeck();
}

// Handle the counts for the number to turns the user takes where a turn includes flipping over 2 cards
//TODO: If under 2 counts, only display 'count', otherwise display 'counts'
let counts = 0;

function addCount() {
  counts++;
  const countTotal = document.getElementById('movesCounter');
  countTotal.innerHTML = `Moves: ${counts}`;
  starRating();
}

// Have star rating based on the above counts. If at 10 or below, it's 3 stars; above 10 but below 15 is 2 stars; 16 or above is 1 star.
const allStars = document.querySelectorAll('.stars li i');
let starCount = 3;

function starRating() {
  if (counts === 0) {
    for (star of allStars) {
      star.classList.toggle('fa-star-o');
    }
  }
  if (counts === 11 || counts === 16) {
    starCount--;
    hideStar();
  }
}

function hideStar() {
  //when hideStar is run because of above counts, I want to toggle the next star class to change to fa-star-o
  for (star of allStars) {
    if (star.classList.contains('fa-star')) {
      star.classList.toggle('fa-star');
      star.classList.toggle('fa-star-o');
      break;
    }
  }
}