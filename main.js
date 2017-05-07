console.log('hi from main');

// Deck detbotls
var deck_id;
var remaining_cards;

// Game data
var user = {
  wonLastHand: null
}
var bot = {
  wonLastHand: null
}

$('#startBtn').click(function() {
  // Get a shuffled deck of cards from API
  $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', (result, err) => {
    //console.log(result)
    deck_id = result.deck_id

    //Create the user hands
    // bot Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      //console.log('result', result)

      result.cards.map((card) => {
        // console.log(card.code)

        // Add to bot Pile
        $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/bot_pile/add/?cards=${card.code}`, (result, err) => {
          //console.log(result)
          $('#botCardCount').text(result.piles.bot_pile.remaining)
        })
      })
    })

    // user Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      // console.log('result', result)

      result.cards.map((card) => {
        // console.log(card.code)

        // Add to user Pile
        $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/user_pile/add/?cards=${card.code}`, (result, err) => {
          // console.log(result)
          $('#userCardCount').text(result.piles.user_pile.remaining)
        })
      })
    })
  })
})


// Draw Card Operations
$('#drawCard').click(() => {

  // Draw card for user
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/user_pile/draw/`, (result, err) => {
    //console.log('result', result)
    // Update cards remaining in pile
    $('#userCardCount').text(result.piles.user_pile.remaining)

    // Display the card to compare
    $('#user_card').attr('src', result.cards[0].image)

    pCard = result.cards[0]

    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/bot_pile/draw/`, (result, err) => {
      //console.log('result', result)
      bCard = result.cards[0]

      // Update cards rembotning in pile
      $('#botCardCount').text(result.piles.bot_pile.remaining)
      // Display the card to compare
      $('#bot_card').attr('src', result.cards[0].image)

      // Determine Winning Card
      determineWinningCard(pCard, bCard)
    })
  })
})


// A=14 K=13 Q=12 J=11 0=10

// Logic for determining winning hand
var determineWinningCard = (p, b) => {
  console.log('determining winning card')
  // console.log(p, b)
  let pValue = convertFaceCardToNum(p.code.charAt(0))
  let bValue = convertFaceCardToNum(b.code.charAt(0))
  console.log('pValue ', pValue, 'bValue, ', bValue)
  setTimeout(winLogic(pValue, bValue), 5000)

}


var convertFaceCardToNum = (cardCode) => {
  switch(cardCode) {
    case '0':
      return 10;
      break;
    case 'J':
      return 11;
      break;
    case 'Q':
      return 12;
      break;
    case 'K':
      return 13;
      break;
    case 'A':
      return 14;
      break;
    default:
      return cardCode;
      break;
  }
}

var winLogic = (p, b) => {
  if (p < b) {
    alert('The bot has a better hand')

  } else if (p > b) {
    alert('User has a better hand')
  } else {
    alert('Its War!')
  }
}


var depositCardsInWinnersPile = () => {}
