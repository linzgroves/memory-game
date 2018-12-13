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
//when restart clicked, remove all card classes of open/show/match
//clear the counts, the matches, and the array of matched cards (if needed)



// Create a timer value that will initially be set to false until user begins game
let timer = false;
let seconds = 0;
let showTime = document.querySelector('.timer');

// Function to start the timer when initial valid click happens
function startTimer(cardClicked) {
  if (timer == false) {
    timer == true;
    setInterval(function() {
      seconds++;

      showTime.innerHTML = seconds;
    }, 1000);
  }
}

// Function to stop the timer, which will be used when user wins game


// Function to display the timer


// Restart function to reload the page/game and reset everything back to 0


// Function to take game stats and display them in modal


// Function to show modal


// Event listener for closing the modal


// Event listener for replaying the game




// Create an empty array for the two toggled cards to pushed to so they can be compared
let toggledCards = [];

// Create a variable to keep track of matches
let matchedCards = 0;

// Use addEventListener to listen for the cards being clicked and then call the toggle function
deck.addEventListener("click", event => {
  const cardClicked = event.target;
  if (canClick(cardClicked)) {
    toggleClass(cardClicked);
    pushCards(cardClicked);
    startTimer(cardClicked);
    if (toggledCards.length == 2) {
      compareCards(cardClicked);
      counts++;
    }
  }
});

// Check if click meets all the conditions
function canClick(cardClicked) {
  return (
    toggledCards.length < 2
  );
}

// This toggles the open and show classes
function toggleClass(cardClicked) {
  cardClicked.classList.toggle("open");
  cardClicked.classList.toggle("show");
  cardClicked.classList.remove("shakeCard");
}

// Function to push any toggled cards into the toggledCards array
function pushCards(cardClicked) {
  toggledCards.push(cardClicked);
}

// Check if the cards clicked and added to the toggledCards array match and add timeout so toggles isn't immediate
function compareCards(cardClicked) {
  if (toggledCards[0].lastElementChild.className === toggledCards[1].lastElementChild.className) {
    toggledCards[0].classList.add("match");
    toggledCards[1].classList.add("match");
    toggledCards[0].classList.add("bounceCard");
    toggledCards[1].classList.add("bounceCard");
    toggledCards = [];
    matchedCards++;
    allMatched();
  } else {
    toggledCards[0].classList.add("shakeCard");
    toggledCards[1].classList.add("shakeCard");
    setTimeout(() => {
      toggleClass(toggledCards[0]);
      toggleClass(toggledCards[1]);
      toggledCards = [];
    }, 1000);

  }
}

// Handle determining if user has won
function allMatched() {
  if (matchedCards == 8) {
    //Todo: modal should open here with stats
    console.log("you won");
  }
}

// Handle the counts for the number to turns the user takes where a turn includes flipping over 2 cards
//TODO: If under 2 counts, only display 'count', otherwise display 'counts'
let counts = 0;
movesElement = document.getElementById('movesCounter');

movesElement.innerHTML = `<span class="moves">Moves: ${counts}</span>`;

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