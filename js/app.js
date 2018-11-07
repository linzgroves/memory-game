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

// Create a timer value that will initially be set to false until user begins game



// Function to start the timer when initial valid click happens


// Function to stop the timer, which will be used when user wins game


// Function to display the timer


// Restart function to reload the page/game and reset everything back to 0


// Function to take game stats and display them in modal


// Function to show modal


// Event listener for closing the modal


// Event listener for replaying the game




// Create an empty array for the two toggled cards to pushed to so they can be compared
let toggledCards = [];

// Use addEventListener to listen for the cards being clicked and then call the toggle function


// Check if click meets all the conditions


// This toggles the open and show classes


// Function to push any toggled cards into the toggledCards array


// Check if the cards clicked and added to the toggledCards array match and add timeout so toggles isn't immediate




// Handle determining if user has won


// Handle the counts for the number to turns the user takes where a turn includes flipping over 2 cards
//TODO: If under 2 counts, only display 'count', otherwise display 'counts'
let counts = 0;



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