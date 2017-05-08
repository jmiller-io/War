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
    console.log(result)
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
          console.log(result)
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
    console.log(' draw result', result)
    // Update cards remaining in pile
    $('#userCardCount').text(result.piles.user_pile.remaining)

    // Display the card to compare
    $('#user_card').attr('src', result.cards[0].image)

    pCard = result.cards[0]

    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/bot_pile/draw/`, (result, err) => {
      //console.log('result', result)
      bCard = result.cards[0]

      // Update cards remaining in pile
      $('#botCardCount').text(result.piles.bot_pile.remaining)
      // Display the card to compare
      $('#bot_card').attr('src', result.cards[0].image)

      // Determine Winning Card
      determineWinningCard(pCard, bCard)
    })
  })
})


// Draw card from pile
var drawCardFromPile = (player, numTimes) => {
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${player}_pile/draw/?count=${numTimes}`, (result) => {
    let key = `${player}_pile`
    $(`#${player}CardCount`).text(result.piles[key].remaining)
    result.cards.map((card) => {
      let $handWrapper = $(`#${player}HandWrapper`);
      let $cardImg = $('<img>')
      $cardImg.attr({
        src: card.image,
        class: 'active_hand'
      });
      $handWrapper.append($cardImg)
    });
  });
};



