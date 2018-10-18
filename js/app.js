const symbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
  'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

/*
 * Create a list that holds all of your cards
 */
let toggledCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/* Target parent element of .cards so addEventListener can be used */
const deck = document.querySelector('.deck');

/* Use addEventListener to listen for the cards being clicked and then call the toggle function */
deck.addEventListener('click', event => {
  const cardTarget = event.target;
  if (cardTarget.classList.contains('card') && toggledCards.length < 2) {
    toggleCard(cardTarget);
    toggledCardsList(cardTarget);
    if (toggledCards.length === 2) {
      console.log("2 cards are toggled");
    }
  }
});

/* This toggles the open and show classes */
function toggleCard(cardTarget) {
  cardTarget.classList.toggle('open');
  cardTarget.classList.toggle('show');
}

/* Function to push any toggled cards into the toggledCards array */
function toggledCardsList(cardTarget) {
  toggledCards.push(cardTarget);
  console.log(toggledCards);
}