console.log('hi from main');

// Deck detbotls
var deck_id;
var remaining_cards;

// Game data
var user = {
  currentHand: []
}
var bot = {
  currentHand: []
}

$('#startBtn').click(function() {
  // Get a shuffled deck of cards from API
  $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', (result, err) => {
    //console.log(result)
    deck_id = result.deck_id

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
          //console.log(result)
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
    console.log('user draw')
    // Update cards remaining in pile
    $('#userCardCount').text(result.piles.user_pile.remaining)
    user.currentHand.push(result.cards[0])
    var pCard = user.currentHand[user.currentHand.length-1]

    console.log('the pcard', user.currentHand)
    // Display the card to compare
    let $handWrapper = $('#userHandWrapper');
      let $cardImg = $('<img>')
      $cardImg.attr({
        src: pCard.image,
        class: 'active_hand'
      });
      $handWrapper.append($cardImg)


    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/bot_pile/draw/`, (result, err) => {
      console.log('bot draw')
      //console.log('result', result)
      bot.currentHand.push(result.cards[0])
      var bCard = bot.currentHand[bot.currentHand.length-1]

      // Update cards remaining in pile
      $('#botCardCount').text(result.piles.bot_pile.remaining)

      // Display the card to compare
      let $handWrapper = $('#botHandWrapper');
      let $cardImg = $('<img>')
      $cardImg.attr({
        src: bCard.image,
        class: 'active_hand'
      });
      $handWrapper.append($cardImg)

      // Determine Winning Card
      determineWinningCard(pCard, bCard)
    })
  })
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

