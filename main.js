console.log('hi from main');

// Deck detbotls
var deck_id;
var remaining_cards;

// Game data
var player = {
  currentHand: [],
  pile: [],
  remaining_cards_in_pile: 0
}
var bot = {
  currentHand: [],
  pile: [],
  remaining_cards_in_pile: 0
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

      // Append Card Count for Bot Player to DOM
      $('#botCardCount').text(bot.pile.length)
    })

    // Deal Player's Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      console.log('Players hand', result)
      player.pile = result.cards

      // Append Card Count for Bot Player to DOM
      $('#playerCardCount').text(player.pile.length)
    })
  })
})


// Draw Card Operations
$('#drawCard').click(() => {

  // Draw Player's Card
  console.log('Player draws card');
  player.currentHand.push(player.pile.shift())
  player.remaining_cards_in_pile = player.pile.length-player.currentHand.length

  // Append Player card to DOM
  let $playerHandWrapper = $('#playerHandWrapper');
  player.currentHand.map((card) => {
    let $card = $('<img>');
    $card.attr({
      src: card.image,
      class: 'active_hand'
    });
    $playerHandWrapper.append($card);
  })

  // Draw Player's Card
  console.log('bot draws card');
  bot.currentHand.push(bot.pile.shift())
  bot.remaining_cards_in_pile = bot.pile.length-bot.currentHand.length

  // Append bot card to DOM
  let $botHandWrapper = $('#botHandWrapper');
  bot.currentHand.map((card) => {
    let $card = $('<img>');
    $card.attr({
      src: card.image,
      class: 'active_hand'
    });
    $botHandWrapper.append($card);
  })

  determineWinningCard(player.currentHand[0], bot.currentHand[0])


  // // Draw card for user
  // $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/user_pile/draw/`, (result, err) => {
  //   console.log('user draw')
  //   // Update cards remaining in pile
  //   $('#userCardCount').text(result.piles.user_pile.remaining)
  //   user.currentHand.push(result.cards[0])
  //   var pCard = user.currentHand[user.currentHand.length-1]

  //   console.log('the pcard', user.currentHand)
  //   // Display the card to compare
  //   let $handWrapper = $('#playerHandWrapper');
  //     let $cardImg = $('<img>')
  //     $cardImg.attr({
  //       src: pCard.image,
  //       class: 'active_hand'
  //     });
  //     $handWrapper.append($cardImg)


  //   $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/bot_pile/draw/`, (result, err) => {
  //     console.log('bot draw')
  //     //console.log('result', result)
  //     bot.currentHand.push(result.cards[0])
  //     var bCard = bot.currentHand[bot.currentHand.length-1]

  //     // Update cards remaining in pile
  //     $('#botCardCount').text(result.piles.bot_pile.remaining)

  //     // Display the card to compare
  //     let $handWrapper = $('#botHandWrapper');
  //     let $cardImg = $('<img>')
  //     $cardImg.attr({
  //       src: bCard.image,
  //       class: 'active_hand'
  //     });
  //     $handWrapper.append($cardImg)

  //     // Determine Winning Card
  //     determineWinningCard(pCard, bCard)
  //   })
  // })
})


// Works
var drawCardFromPile = (player, numTimes) => {
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${player}_pile/draw/?count=${numTimes}`, (result) => {
    let key = `${player}_pile`;
    $(`#${player}CardCount`).text(result.piles[key].remaining)
    result.cards.map((card) => {
      // Add to Current Hand
      if (player === 'user') {
        user.currentHand.push(card)
      } else if (player === 'bot') {
        bot.currentHand.push(card)
      }

      // Add to DOM
      let $handWrapper = $(`#${player}HandWrapper`);
      let $cardImg = $('<img>')
      $cardImg.attr({
        src: card.image,
        class: 'active_hand'
      });
      $handWrapper.append($cardImg)
    });
  })
};


// War Logic
var WarLogic = () => {
  // Draw three cards and add to current hand for user
  drawCardFromPile('user', 3)
  drawCardFromPile('bot', 3)
  determineWinningCard(user.currentHand[user.currentHand.length-1], bot.currentHand[bot.currentHand.length-1])
}

var CheckWarWin = (userCards, botCards) => {
  let lastUCard = userCards[userCards.length-1]
  let lastBCard = botCards[botCards.length-1]
  determineWinningCard(lastUCard, lastBCard)
}

