/* console logging */

// console.log('testing');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const TwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];
// get quotes from API- thru an asynchronous fetch method 

//show loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote
function newQuote() {
    loading();
    // to pick a rondom quote from the api quote array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

   //check if author ifield is blank and replace it with quote unknown

   if (!quote.author) {
    authorText.textContent = 'Unknown';
   } else {
    authorText.textContent = quote.author;
   }

   //check quote length to detemrine styling
   if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');

   } else {
    quoteText.classList.remove('long-quote');
   }
   //set quote, hie loader
   quoteText.textContent = quote.text;
   complete();
   
}

//tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // _blank - allows the twitter window to open in a new tab
}


async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); //turning the response into a json variable
        newQuote();


    } catch  (error) {

        // catch error here
    }
}
//event listeners
newQuoteBtn.addEventListener('click', newQuote);
TwitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
