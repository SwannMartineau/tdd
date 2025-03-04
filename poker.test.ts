import { initDeck, Card, ranks, colors, shuffleDeck, distribution, Player, rankValues, isOnePair, isTwoPair, isBrelan, isCarre, isFull, isStraightHand, isCouleur, isRoyalFlush, evaluateHand, comparePlayers } from "./poker";
import { describe, it, expect } from '@jest/globals';

describe('verify the cards', () => {

  it('Verify that there are 52 cards in the deck', () => {
    expect(initDeck().length).toEqual(52);
  });

  it('Verify that all the cards are present in the deck', () => {
    const deck = initDeck();

    colors.forEach(color => {
      ranks.forEach(rank => {
        const card: Card = { rank, color, value: rankValues[rank] };
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
        const card: Card = { rank, color, value: rankValues[rank] };
        expect(shuffledDeck).toContainEqual(card);
      });
    });
  })

});

describe('verify the cards after distribution for a number of players', () => {

  const player1: Player = {id: 1, cards: [{color: 'Carreau', rank: '10', value: 10}, {color: 'Carreau', rank: '4', value: 4}, 
    {color: 'Pique', rank: 'As', value: 14}, {color: 'Carreau', rank: 'Valet', value: 11}, {color: 'Carreau', rank: '2', value: 2}]}
  const player2: Player = {id: 2, cards: [{color: 'Pique', rank: 'Dame', value: 12}, {color: 'Pique', rank: 'Roi', value: 13}, 
    {color: 'Pique', rank: 'As', value: 14}, {color: 'Pique', rank: 'Valet', value: 11}, {color: 'Pique', rank: '10', value: 10}]}
  const player3: Player = {id: 3, cards: [{color: 'Pique', rank: '5', value: 5}, {color: 'Pique', rank: '4', value: 4}, 
    {color: 'Pique', rank: '3', value: 3}, {color: 'Pique', rank: 'As', value: 14}, {color: 'Pique', rank: '2', value: 2}]}

  it('Should return an error if there are not enough cards in the deck', () => {
    expect(() => distribution(11)).toThrowError('Not enough card in the deck for the number of players');
  })

  it('Verify that there are 42 cards in the deck and 5 per players for 2 players', () => {
    expect(distribution(2).players[0].cards.length).toEqual(player1.cards.length);
    expect(distribution(2).players[0].id).toEqual(player1.id);
    expect(distribution(2).players[1].cards.length).toEqual(player2.cards.length);
    expect(distribution(2).players[1].id).toEqual(player2.id);
    expect(distribution(2).shuffledDeck.length).toEqual(42);
  });

  it('Verify that there are 37 cards in the deck and 5 per players for 3 players', () => {
    expect(distribution(3).players[0].cards.length).toEqual(player1.cards.length);
    expect(distribution(3).players[0].id).toEqual(player1.id);
    expect(distribution(3).players[1].cards.length).toEqual(player2.cards.length);
    expect(distribution(3).players[1].id).toEqual(player2.id);
    expect(distribution(3).players[2].cards.length).toEqual(player3.cards.length);
    expect(distribution(3).players[2].id).toEqual(player3.id);
    expect(distribution(3).shuffledDeck.length).toEqual(37);
  })
});


describe('verify values of a hand', () => {

  const player1: Player = {
    id: 1, 
    cards: [
      {color: 'Carreau', rank: '10', value: 10}, 
      {color: 'Trèfle', rank: '10', value: 10}, 
      {color: 'Pique', rank: 'As', value: 14}, 
      {color: 'Carreau', rank: 'Valet', value: 11}, 
      {color: 'Carreau', rank: '2', value: 2}]};

  const player2: Player = {
    id: 2, 
    cards: [
      {color: 'Pique', rank: 'Dame', value: 12}, 
      {color: 'Pique', rank: 'Roi', value: 13}, 
      {color: 'Pique', rank: 'As', value: 14}, 
      {color: 'Pique', rank: 'Valet', value: 11}, 
      {color: 'Pique', rank: '10', value: 10}]};

  const player3: Player = {
    id: 3,
    cards: [
      {color: 'Pique', rank: 'As', value: 14}, 
      {color: 'Pique', rank: 'Roi', value: 13}, 
      {color: 'Pique', rank: 'Dame', value: 12}, 
      {color: 'Pique', rank: 'Valet', value: 11}, 
      {color: 'Pique', rank: '10', value: 10}]};

  const player4: Player = { 
    id: 4, 
    cards: [
      {color: 'Trèfle', rank: '10', value: 10}, 
      {color: 'Carreau', rank: '10', value: 10}, 
      {color: 'Pique', rank: '5', value: 5}, 
      {color: 'Cœur', rank: '5', value: 5}, 
      {color: 'Trèfle', rank: 'As', value: 14}]};

  const player5: Player = { 
    id: 5, 
    cards: [
      { color: 'Carreau', rank: '7', value: 7 }, 
      { color: 'Trèfle', rank: '7', value: 7 },
      { color: 'Pique', rank: '7', value: 7 },
      { color: 'Cœur', rank: '2', value: 2 },
      { color: 'Carreau', rank: 'Valet', value: 11 }]};

    const player6: Player = { 
      id: 6, 
      cards: [
        { color: 'Carreau', rank: '7', value: 7 }, 
        { color: 'Trèfle', rank: '7', value: 7 },
        { color: 'Pique', rank: '7', value: 7 },
        { color: 'Cœur', rank: '7', value: 7 },
        { color: 'Carreau', rank: 'Valet', value: 11 }]};

  const player7: Player = { 
    id: 7, 
    cards: [
      { color: 'Carreau', rank: '10', value: 10 }, 
      { color: 'Trèfle', rank: '10', value: 10 },
      { color: 'Pique', rank: '10', value: 10 },
      { color: 'Cœur', rank: '7', value: 7 }, 
      { color: 'Carreau', rank: '7', value: 7 }]};

  const player8: Player = { 
    id: 8, 
    cards: [
      { color: 'Carreau', rank: '5', value: 5 }, 
      { color: 'Trèfle', rank: '6', value: 6 },
      { color: 'Pique', rank: '7', value: 7 },
      { color: 'Cœur', rank: '8', value: 8 },
      { color: 'Carreau', rank: '9', value: 9 }]};

  const player9: Player = { 
    id: 9, 
    cards: [
      { color: 'Pique', rank: '2', value: 2 }, 
      { color: 'Pique', rank: '4', value: 4 },
      { color: 'Pique', rank: '6', value: 6 },
      { color: 'Pique', rank: '8', value: 8 },
      { color: 'Pique', rank: '10', value: 10 }]};

  it('Should return true if it is a pair', () => {
    const hand1 = player1.cards;
    
    expect(isOnePair(hand1)).toBe(true);
  });

  it('Should return false if it is not a pair', () => {
    const hand2 = player2.cards;
    expect(isOnePair(hand2)).toBe(false);
  });

  it('Should return true if it is a two pairs', () => {
    const hand4 = player4.cards;
    
    expect(isTwoPair(hand4)).toBe(true);
  });

  it('Should return false if it is not a two pairs', () => {
    const hand2 = player2.cards;
    expect(isTwoPair(hand2)).toBe(false);
  });

  it('Should return true if it is a brelan', () => {
    const hand5 = player5.cards;
    
    expect(isBrelan(hand5)).toBe(true);
  });

  it('Should return false if it is not a brelan', () => {
    const hand1 = player1.cards;
    expect(isBrelan(hand1)).toBe(false);
  });

  it('Should return true if it is a carre', () => {
    const hand6 = player6.cards;
    
    expect(isCarre(hand6)).toBe(true);
  });

  it('Should return false if it is not a carre', () => {
    const hand1 = player1.cards;
    expect(isCarre(hand1)).toBe(false);
  });

  it('Should return true if it is a full', () => {
    const hand7 = player7.cards;
    expect(isFull(hand7)).toBe(true);
  });

  it('Should return false if it is not a full', () => {
    const hand1 = player1.cards;
    expect(isFull(hand1)).toBe(false);
  });

  it('Should return true if it is a suite', () => {
    const hand8 = player8.cards;
    expect(isStraightHand(hand8)).toBe(true);
  });

  it('Should return false if it is not a suite', () => {
    const hand1 = player1.cards;
    expect(isStraightHand(hand1)).toBe(false);
  });

  it('Should return true if it is a couleur', () => {
    const hand9 = player9.cards;
    expect(isCouleur(hand9)).toBe(true);
  });

  it('Should return false if it is not a couleur', () => {
    const hand1 = player1.cards;
    expect(isCouleur(hand1)).toBe(false);
  });

  it('Should return true if it is a royal flush', () => {
    const hand3 = player3.cards;
    expect(isRoyalFlush(hand3)).toBe(true);
  });

  it('Should return false if it is not a royal flush', () => {
    const hand1 = player1.cards;
    expect(isRoyalFlush(hand1)).toBe(false);
  });
});


describe('verify values of a hand', () => {

  const player1: Player = {
    id: 1, 
    cards: [
      {color: 'Carreau', rank: '10', value: 10}, 
      {color: 'Trèfle', rank: '10', value: 10}, 
      {color: 'Pique', rank: 'As', value: 14}, 
      {color: 'Carreau', rank: 'Valet', value: 11}, 
      {color: 'Carreau', rank: '2', value: 2}]};

  const player2: Player = {
    id: 2, 
    cards: [
      {color: 'Pique', rank: 'Dame', value: 12}, 
      {color: 'Pique', rank: 'Roi', value: 13}, 
      {color: 'Pique', rank: 'As', value: 14}, 
      {color: 'Pique', rank: 'Valet', value: 11}, 
      {color: 'Pique', rank: '10', value: 10}]};

  const player3: Player = {
    id: 3,
    cards: [
      {color: 'Pique', rank: 'As', value: 14}, 
      {color: 'Pique', rank: 'Roi', value: 13}, 
      {color: 'Pique', rank: 'Dame', value: 12}, 
      {color: 'Pique', rank: 'Valet', value: 11}, 
      {color: 'Pique', rank: '10', value: 10}]};

  const player4: Player = { 
    id: 4, 
    cards: [
      {color: 'Trèfle', rank: '10', value: 10}, 
      {color: 'Carreau', rank: '10', value: 10}, 
      {color: 'Pique', rank: '5', value: 5}, 
      {color: 'Cœur', rank: '5', value: 5}, 
      {color: 'Trèfle', rank: 'As', value: 14}]};

  const player5: Player = { 
    id: 5, 
    cards: [
      { color: 'Carreau', rank: '7', value: 7 }, 
      { color: 'Trèfle', rank: '7', value: 7 },
      { color: 'Pique', rank: '7', value: 7 },
      { color: 'Cœur', rank: '2', value: 2 },
      { color: 'Carreau', rank: 'Valet', value: 11 }]};

  const player6: Player = { 
    id: 6, 
    cards: [
      { color: 'Carreau', rank: '7', value: 7 }, 
      { color: 'Trèfle', rank: '7', value: 7 },
      { color: 'Pique', rank: '7', value: 7 },
      { color: 'Cœur', rank: '7', value: 7 },
      { color: 'Carreau', rank: 'Valet', value: 11 }]};

  const player7: Player = { 
    id: 7, 
    cards: [
      { color: 'Carreau', rank: '10', value: 10 }, 
      { color: 'Trèfle', rank: '10', value: 10 },
      { color: 'Pique', rank: '10', value: 10 },
      { color: 'Cœur', rank: '7', value: 7 }, 
      { color: 'Carreau', rank: '7', value: 7 }]};

  const player8: Player = { 
    id: 8, 
    cards: [
      { color: 'Carreau', rank: '5', value: 5 }, 
      { color: 'Trèfle', rank: '6', value: 6 },
      { color: 'Pique', rank: '7', value: 7 },
      { color: 'Cœur', rank: '8', value: 8 },
      { color: 'Carreau', rank: '9', value: 9 }]};

  const player9: Player = { 
    id: 9, 
    cards: [
      { color: 'Pique', rank: '2', value: 2 }, 
      { color: 'Pique', rank: '4', value: 4 },
      { color: 'Pique', rank: '6', value: 6 },
      { color: 'Pique', rank: '8', value: 8 },
      { color: 'Pique', rank: '10', value: 10 }]};

  it('Should return 2 if it is a pair', () => {
    const hand1 = player1.cards;
    expect(evaluateHand(hand1).score).toEqual(2);
  });

  it('Should return 3 if it is a two pairs', () => {
    const hand4 = player4.cards;
    expect(evaluateHand(hand4).score).toEqual(3);
  });

  it('Should return 4 if it is a brelan', () => {
    const hand5 = player5.cards;
    expect(evaluateHand(hand5).score).toEqual(4);
  });

  it('Should return 5 if it is a suite', () => {
    const hand8 = player8.cards;
    expect(evaluateHand(hand8).score).toEqual(5);
  });

  it('Should return 6 if it is a couleur', () => {
    const hand9 = player9.cards;
    expect(evaluateHand(hand9).score).toEqual(6);
  });

  it('Should return 7 if it is a full', () => {
    const hand7 = player7.cards;
    expect(evaluateHand(hand7).score).toEqual(7);
  });

  it('Should return 8 if it is a carre', () => {
    const hand6 = player6.cards;
    expect(evaluateHand(hand6).score).toEqual(8);
  });

  it('Should return 10 if it is a quinte full royal', () => {
    const hand3 = player3.cards;
    expect(evaluateHand(hand3).score).toEqual(10);
  });

  it('should return player 3', () => {
    const hand3 = player3.cards;
    const hand6 = player6.cards;
    expect(comparePlayers(player3, player6)).toEqual(player3);
  })
});

