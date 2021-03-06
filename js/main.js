console.log('hi from main');

// Deck detbotls
var deck_id;
var remaining_cards;

// Game data
var player = {
  currentHand: [],
  pile: []
}

var bot = {
  currentHand: [],
  pile: []
}

$('#startBtn').click(function() {
  // Get a shuffled deck of cards from API
  $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', (result, err) => {
    //console.log(result)
    var deck_id = result.deck_id

    // Deal Bot Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      console.log('bot hand', result)
      bot.pile = result.cards

      // Append Card Count for Bot  to DOM
      $('#botCardCount').text(bot.pile.length)
    })

    // Deal Player's Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      console.log('Players hand', result)
      player.pile = result.cards

      // Append Card Count for Player to DOM
      $('#playerCardCount').text(player.pile.length)
    })
  })
})


// Draw Card Operations
$('#drawCard').click(() => {

  // Draw Player's Card
  player.currentHand.push(player.pile.shift())

  // Append Player card to DOM
  let $playerHandWrapper = $('#playerHandWrapper');
  player.currentHand.map((card) => {
    let $card = $('<img>');
    $card.attr({
      src: card.image,
      class: 'active_hand'
    });
    $playerHandWrapper.append($card);
    $('#playerCardCount').text(player.pile.length)
  })

  // Draw Player's Card
  bot.currentHand.push(bot.pile.shift())

  // Append bot card to DOM
  let $botHandWrapper = $('#botHandWrapper');
  bot.currentHand.map((card) => {
    let $card = $('<img>');
    $card.attr({
      src: card.image,
      class: 'active_hand'
    });
    $botHandWrapper.append($card);
    $('#botCardCount').text(bot.pile.length)
  })

  determineWinningCard(player.currentHand[0], bot.currentHand[0])
})


var drawCardFromPile = (numTimes) => {
  // Player
  let playerCards = player.pile.splice(0, numTimes);
  player.currentHand = [...player.currentHand, ...playerCards]
  let botCards = bot.pile.splice(0, numTimes);
  bot.currentHand = [...bot.currentHand, ...botCards]

  cards = {
    playerCards: playerCards,
    botCards: botCards
  };
  return cards;
};

// Update DOM
var addCardsToDOM = (cards) => {
  // Player
  cards.playerCards.map((card) => {
    let $handWrapper = $('#playerHandWrapper');
    let $cardImg = $('<img>')
    $cardImg.attr({
      src: card.image,
      class: 'active_hand'
    });
    $('#playerCardCount').text(player.pile.length)
    $handWrapper.append($cardImg)
  })

  // Bot
  cards.botCards.map((card) => {
    let $handWrapper = $('#botHandWrapper');
    let $cardImg = $('<img>');
    $cardImg.attr({
      src: card.image,
      class: 'active_hand'
    });
    $handWrapper.append($cardImg)
    $('#botCardCount').text(bot.pile.length)
  })

  // Position Cards
  var activeCards = $('.active_hand');

  activeCards.each(function(){
    let prevSibling = $(this).prev()[0]
    console.log('prevSibling', prevSibling)
    if (prevSibling === undefined) {
      let pos = 0
      $(this).css('left', pos.toString().concat('px'))
    } else {
      let prevSiblingPosition = $(prevSibling).css('left')
      let prevCardPos = prevSiblingPosition.replace('px', '');
      let pos = parseInt(prevCardPos) + -75
      $(this).css('left', pos.toString().concat('px'))
    }
  })

}

// War Logic
var WarLogic = () => {
  addCardsToDOM(drawCardFromPile(3))
  determineWinningCard(player.currentHand[player.currentHand.length-1], bot.currentHand[bot.currentHand.length-1])
}

