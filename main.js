console.log('hi from main');

// Deck details
var deck_id;
var remaining_cards;

$('#startBtn').click(function() {
  $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', function (result, err){
    //console.log(results)
    console.log(result)
    deck_id = result.deck_id
    remaining_cards = result.remaining;

  })
})

$('#drawCard').click(() =>{
  $.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`, function(result, err) {
    console.log('result', result)
  })
})
