import { initDeck, Card, ranks, colors, shuffleDeck } from "./poker";
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
