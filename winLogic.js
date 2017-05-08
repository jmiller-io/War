// Convert Face cards to numeric values
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

// Logic for determining winning hand
var determineWinningCard = (p, b) => {
  console.log('determining winning card')
  console.log(p)
  let pValue = convertFaceCardToNum(p.code.charAt(0))
  let bValue = convertFaceCardToNum(b.code.charAt(0))
  if (pValue < bValue) {
    let winningPlayer = 'bot';
    depositCardsInWinnersPile(winningPlayer, b, p)
  } else if (pValue > bValue) {
    let winningPlayer = 'user';
    depositCardsInWinnersPile(winningPlayer, p, b)
  } else {
    console.log('war')
  }

}

// Add cards to winners pile
var depositCardsInWinnersPile = (winningPlayer, winnersCard, losersCard) => {
  // Get request to deposit cards
//console.log(winningPlayer, winnersCard, losersCard)

// Add to user Pile
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${winningPlayer}_pile/add/?cards=${winnersCard.code},${losersCard.code}`, (result, err) => {
    //console.log(result)
    $('#userCardCount').text(result.piles.user_pile.remaining)
  })

}
