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

    var pCard = result.cards[0]

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
      var bCard = result.cards[0]

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


// Draw card from pile
var drawCardFromPile = (player, numTimes) => {
  var jqxhr = $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${player}_pile/draw/?count=${numTimes}`)
    .done(function() {
    alert( "second success" );
  })
  //  (result) => {
  //   let key = `${player}_pile`;
  //   $(`#${player}CardCount`).text(result.piles[key].remaining)
  //   result.cards.map((card) => {
  //     let $handWrapper = $(`#${player}HandWrapper`);
  //     let $cardImg = $('<img>')
  //     $cardImg.attr({
  //       src: card.image,
  //       class: 'active_hand'
  //     });
  //     $handWrapper.append($cardImg)
  //   });
  //   console.log('res', result)
  //   test = result.cards
  // })
  // return test
};

// Works
var drawCardFromPile = (player, numTimes) => {
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${player}_pile/draw/?count=${numTimes}`, (result) => {
    let key = `${player}_pile`;
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
  })
};


