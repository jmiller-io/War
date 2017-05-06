console.log('hi from main');

// Deck details
var deck_id;
var remaining_cards;

$('#startBtn').click(function() {
  // Get a shuffled deck of cards from API
  $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', (result, err) => {
    console.log(result)
    deck_id = result.deck_id

    //Create the player hands
    // AI Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      console.log('result', result)

      result.cards.map((card) => {
        console.log(card.code)

        // Add to AI Pile
        $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/ai_hand/add/?cards=${card.code}`, (result, err) => {
          console.log(result)
          $('#aiCardCount').text(result.piles.ai_hand.remaining)
        })
      })
    })

    // Player Hand
    $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=26`, (result, err) => {
      console.log('result', result)

      result.cards.map((card) => {
        console.log(card.code)

        // Add to Player Pile
        $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/player_hand/add/?cards=${card.code}`, (result, err) => {
          console.log(result)
          $('#playerCardCount').text(result.piles.player_hand.remaining)
        })
      })
    })



  })
})

$('#drawCard').click(() =>{
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/player_hand/draw/`, (result, err) => {
    console.log('result', result)
  })
})
