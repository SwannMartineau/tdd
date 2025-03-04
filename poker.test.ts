import { initDeck, Card, ranks, colors, shuffleDeck, distribution, Player } from "./poker";
import { describe, it, expect } from '@jest/globals';

describe('verify the cards', () => {

  it('Verify that there are 52 cards in the deck', () => {
    expect(initDeck().length).toEqual(52);
  });

  it('Verify that all the cards are present in the deck', () => {
    const deck = initDeck();

    colors.forEach(color => {
      ranks.forEach(rank => {
        const card: Card = { rank, color };
        expect(deck).toContainEqual(card);
      });
    });
  });

  it('Verify that the deck is shuffled', () => {
    const originalDeck = initDeck();
    const shuffledDeck = shuffleDeck(originalDeck);
    
    expect(shuffledDeck).not.toEqual(originalDeck);
    
    let isDifferent = false;
    for (let i = 0; i < originalDeck.length; i++) {
      if (originalDeck[i] !== shuffledDeck[i]) {
        isDifferent = true;
        break;
      }
    }
    expect(isDifferent).toBe(true);
  });

  it('Verify that the deck is complete after shuffle', () => {
    const deck = initDeck();
    const shuffledDeck = shuffleDeck(deck);

    colors.forEach(color => {
      ranks.forEach(rank => {
        const card: Card = { rank, color };
        expect(shuffledDeck).toContainEqual(card);
      });
    });
  })

});

describe('verify the cards after distribution for a number of players', () => {

  const player1: Player = {id: 1, cards: [{color: 'Carreau', rank: '10'}, {color: 'Carreau', rank: '4'}, 
    {color: 'Pique', rank: 'As'}, {color: 'Carreau', rank: 'Valet'}, {color: 'Carreau', rank: '2'}]}
  const player2: Player = {id: 2, cards: [{color: 'Pique', rank: 'Dame'}, {color: 'Pique', rank: 'Roi'}, 
    {color: 'Pique', rank: 'As'}, {color: 'Pique', rank: 'Valet'}, {color: 'Pique', rank: '10'}]}

  it('Should return an error if there are not enough cards in the deck', () => {
    expect(() => distribution(11)).toThrowError('Not enough card in the deck for the number of players');
  })

  it('Verify that there are 42 cards in the deck and 5 per players', () => {
    expect(distribution(2).players[0].cards.length).toEqual(player1.cards.length);
    expect(distribution(2).players[0].id).toEqual(player1.id);
    expect(distribution(2).players[1].cards.length).toEqual(player2.cards.length);
    expect(distribution(2).players[1].id).toEqual(player2.id);
    expect(distribution(2).shuffledDeck.length).toEqual(42);
  });
});