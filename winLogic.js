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
  // console.log(p, b)
  //console.log('pValue ', pValue, 'bValue, ', bValue)
  let pValue = convertFaceCardToNum(p.code.charAt(0))
  let bValue = convertFaceCardToNum(b.code.charAt(0))
  if (pValue < bValue) {
    console.log('winner is Bot with, ', b)
  } else if (pValue > bValue) {
    console.log('winner is player with, ', p)
  } else {
    console.log('war')
  }

}
