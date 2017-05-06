console.log('hi from main');

// Deck details
var deck_id;
var remaining_cards;

$('#startBtn').click(function() {
  // Get a shuffled deck of cards from API
  $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', function (result, err){
    console.log(result)
    deck_id = result.deck_id

    //Create the player hands
    // AI Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, function(result, err) {
      console.log('result', result)

      result.cards.map((card) => {
        console.log(card.code)

        // Add to AI Pile
        $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/ai_hand/add/?cards=${card.code}`, (result, err) => {
          console.log(result)
        })
      })
    })

    // AI Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, function(result, err) {
      console.log('result', result)

      result.cards.map((card) => {
        console.log(card.code)

        // Add to Player Pile
        $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/player_hand/add/?cards=${card.code}`, (result, err) => {
          console.log(result)
        })
      })
    })



  })
})

$('#drawCard').click(() =>{
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/player_hand/draw/`, function(result, err) {
    console.log('result', result)
  })
})
