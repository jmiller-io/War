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
  var winningPerson = null;
  let pValue = convertFaceCardToNum(p.code.charAt(0))
  let bValue = convertFaceCardToNum(b.code.charAt(0))
  if (pValue < bValue) {
    winningPerson = 'bot';
    console.log(winningPerson + ' wins')
    depositCardsInWinnersPile(winningPerson, bot.currentHand, player.currentHand)
    bot.currentHand = []
    player.currentHand = []
  } else if (pValue > bValue) {
    winningPerson = 'player';
    console.log(winningPerson + ' wins')
    depositCardsInWinnersPile(winningPerson, player.currentHand, bot.currentHand)
    bot.currentHand = []
    player.currentHand = []
  } else {
    console.log('War!')
    WarLogic();
  }

}

// Add cards to winners pile
var depositCardsInWinnersPile = (winningPerson, winnersCurrentHand, losersCurrentHand) => {
  console.log('running deposit cards')
  // Add the current hands to the winners pile
  if (winningPerson === 'bot') {
    bot.pile = [...bot.pile, ...winnersCurrentHand, ...losersCurrentHand]
  } else if (winningPerson === 'player') {
    player.pile = [...player.pile, ...winnersCurrentHand, ...losersCurrentHand]
  }

  console.log('clearing hand');
  bot.currentHand = [];
  player.currentHand = [];

  // Update DOM
  // Clear Cards from the DOM
  setTimeout(function() {$('.active_hand').remove()}, 2500)

  // Append Card Count for Player to DOM
  $('#playerCardCount').text(player.pile.length)

  // Append Card Count for Bot Player to DOM
  $('#botCardCount').text(bot.pile.length)
}

