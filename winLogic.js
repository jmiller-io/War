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
    console.log(winningPlayer + ' wins')
    depositCardsInWinnersPile(winningPlayer, bot.currentHand, user.currentHand)
    bot.currentHand = []
    user.currentHand = []
  } else if (pValue > bValue) {
    let winningPlayer = 'user';
    console.log(winningPlayer + ' wins')
    depositCardsInWinnersPile(winningPlayer, user.currentHand, bot.currentHand)
    bot.currentHand = []
    user.currentHand = []
  } else {
    console.log('war')
    WarLogic();
  }

}

// Add cards to winners pile
var depositCardsInWinnersPile = (winningPlayer, winnersCard, losersCard) => {
  console.log('running deposit cards')
  // Get request to deposit cards
  console.log(winningPlayer, winnersCard, losersCard)

  // Deposit winners hand back in pile
  winnersCard.map((card) => {
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${winningPlayer}_pile/add/?cards=${card.code}`, (result, err) => {
      console.log(err)
      console.log('winner deposit', result)

      // Update cards remaining in pile
      $('#botCardCount').text(result.piles.bot_pile.remaining)
    })
  })

  // Deposit losers hand in winners pile
  losersCard.map((card) => {
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${winningPlayer}_pile/add/?cards=${card.code}`, (result, err) => {
      console.log(err)
      console.log('loser deposit', result)
      // Update cards remaining in pile
      $('#userCardCount').text(result.piles.user_pile.remaining)
    })
  })

  // Add to user Pile
  // $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${winningPlayer}_pile/add/?cards=${winnersCard.code},${losersCard.code}`, (result, err) => {
  //   //console.log(result)
  //   $('#userCardCount').text(result.piles.user_pile.remaining)
  // })
}

