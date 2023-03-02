let quoteContainer = document.getElementById("quote-container")
let quoteText = document.getElementById("quote")
let authorText = document.getElementById("author")
let twitterBtn = document.getElementById("twitter")
let newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

let apiQuotes = []

// Loading Spinner Shown
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// Loading Spinner removed
function complete(){
    quoteContainer.hidden = false
    loader.hidden = true
}

//show new quote
function newQuote(){
    loading()
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if author field is blank and replace with "unkown"
    if(!quote.author){
        authorText.textContent = "Unknown"
    }else {
        authorText.textContent = quote.author
    }
// Check quote length to determine styling
if(quote.text.length > 120){
    quoteText.classList.add("long-quote")
} else{
    quoteText.classList.remove("long-quote")
}
// Set Quote, Hide loader
    quoteText.textContent = quote.text
    complete()
} 

// Get Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error){
        // Catch error here
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, "_blank")
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)
//On Load
getQuotes()

