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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

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

// Function to display the timer
function showTimer() {
  const timer = document.querySelector('.timer');
  let minutes = parseInt(timeLength / 60);
  let seconds = timeLength % 60;
  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }
}

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
function checkIfMatch() {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
}

// Handle the counts for the number to turns the user takes where a turn includes flipping over 2 cards
//TODO: If under 2 counts, only display 'count', otherwise display 'counts'
let counts = 0;

function addCount() {
  counts++;
  const countTotal = document.getElementById('movesCounter');
  countTotal.innerHTML = counts;
  starRating();
}

// Have star rating based on the above counts. If at 12 or below, it's 3 stars; 16 is 2 stars; 24 or above is 1 star.
const allStars = document.querySelectorAll('.stars li i');

function starRating() {
  if (counts === 0) {
    for (star of allStars) {
      star.classList.toggle('fa-star-o');
    }
  }
  if (counts === 16 || counts === 24) {
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