import { initDeck, Card, Rank, Color } from "./poker";
import { describe, it, expect } from '@jest/globals';

describe('verify the cards', () => {

  it('Verify that there are 52 cards in the deck', () => {
    expect(initDeck().length).toEqual(52);
  });

  it('Verify that all the cards are present in the deck', () => {
    const deck = initDeck();
    const colors: Color[] = ['Cœur', 'Carreau', 'Trèfle', 'Pique'];
    const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];

    colors.forEach(color => {
      ranks.forEach(rank => {
        const card: Card = { rank, color };
        expect(deck).toContainEqual(card);
      });
    });
  });
});
