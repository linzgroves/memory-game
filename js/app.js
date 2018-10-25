// Create an array that holds the icon classes that will need to be shuffled
const deckArray = ['fa-diamond', 'fa-paper-plane', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane',
    'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
  ],
  // Iterate over array items and return a single value with 'reduce'
  listItems = deckArray.reduce((result, icon) => {
    // Use template literals to add the returnd value from the array to the html template for li items
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

// Create an empty array for the two toggled cards to pushed to so they can be compared
let toggledCards = [];

// Use addEventListener to listen for the cards being clicked and then call the toggle function
deck.addEventListener('click', event => {
  const cardTarget = event.target;
  if (isValidClick(cardTarget)) {
    toggleCard(cardTarget);
    toggledCardsList(cardTarget);
    if (toggledCards.length === 2) {
      checkIfMatch(cardTarget);
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