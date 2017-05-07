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
  console.log(p, b)
  let pValue = convertFaceCardToNum(p.code.charAt(0))
  let bValue = convertFaceCardToNum(b.code.charAt(0))

  // switch(b.code.charAt(0)) {
  //   case 0:
  //     bValue = 10;
  //   case 'J':
  //     bValue = 11;
  //   case 'Q':
  //     bValue = 12;
  //   case 'K':
  //     bValue = 13;
  //   case 'A':
  //     bValue = 14;
  //   default:
  //     bValue = b.code.charAt(0)
  // }

  // switch(p.code.charAt(0)) {
  //   case 0:
  //     pValue = 10;
  //   case 'J':
  //     pValue = 11;
  //   case 'Q':
  //     pValue = 12;
  //   case 'K':
  //     pValue = 13;
  //   case 'A':
  //     pValue = 14;
  //   default:
  //     pValue = p.code.charAt(0)
  // }

  console.log('pValue ', pValue, 'bValue, ', bValue)

}


var convertFaceCardToNum = (cardCode) => {
  switch(cardCode) {
    case 0:
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
