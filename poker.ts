export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';
export type Color = 'Cœur' | 'Carreau' | 'Trèfle' | 'Pique';

export interface Card {
  rank: Rank;
  color: Color;
  value: number;
}

export interface Player {
    id: number;
    cards: Card[];
}

export interface PokerGame {
    players: Player[];
    shuffledDeck: Card[];
}

export const colors: Color[] = ['Cœur', 'Carreau', 'Trèfle', 'Pique'];
export const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];
export const rankValues: { [key in Rank]: number } = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'Valet': 11,
  'Dame': 12,
  'Roi': 13,
  'As': 14
};

export function initDeck(): Card[] {  
  let deck: Card[] = [];
  
  colors.forEach(color => {
    ranks.forEach(rank => {
      deck.push({ rank, color, value: rankValues[rank] });
    });
  });
  
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck]; 

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
}

export function distribution(playersNumber: number): PokerGame {
  let deck: Card[] = initDeck();
  let shuffledDeck: Card[] = shuffleDeck(deck);
  let players: Player[] = [];

  for (let i = 0; i < playersNumber; i++) {
    if (shuffledDeck.length < 5) {
        throw new Error('Not enough card in the deck for the number of players');
    }
    let player: Player = { id: i + 1, cards: [] };
    for (let j = 0; j < 5; j++) {
      player.cards.push(shuffledDeck.pop()!);
    }
    players.push(player);
  }

  const pokerGame: PokerGame = {players, shuffledDeck};

  return pokerGame;
}

export function isOnePair(hand: Card[]): boolean {
  const ranksCount: { [key in Rank]: number } = { '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'Valet': 0, 'Dame': 0, 'Roi': 0, 'As': 0 };
  
  hand.forEach(card => {
    ranksCount[card.rank]++;
  });
  
  return Object.values(ranksCount).includes(2);
}

export function isTwoPair(hand: Card[]): boolean {
  const ranksCount: { [key in Rank]: number } = { '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'Valet': 0, 'Dame': 0, 'Roi': 0, 'As': 0 };

  hand.forEach(card => {
    ranksCount[card.rank]++;
  });

  const values = Object.values(ranksCount);
  return values.filter(count => count === 2).length === 2;
}

export function isBrelan(hand: Card[]): boolean {
  const ranksCount: { [key in Rank]: number } = { '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'Valet': 0, 'Dame': 0, 'Roi': 0, 'As': 0 };

  hand.forEach(card => {
    ranksCount[card.rank]++;
  });

  return Object.values(ranksCount).includes(3);
}

export function isCarre(hand: Card[]): boolean {
  const ranksCount: { [key in Rank]: number } = { '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'Valet': 0, 'Dame': 0, 'Roi': 0, 'As': 0 };

  hand.forEach(card => {
    ranksCount[card.rank]++;
  });

  return Object.values(ranksCount).includes(4);
}

export function isFull(hand: Card[]): boolean {
  const ranksCount: { [key in Rank]: number } = { '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'Valet': 0, 'Dame': 0, 'Roi': 0, 'As': 0 };

  hand.forEach(card => {
    ranksCount[card.rank]++;
  });

  const values = Object.values(ranksCount);
  return values.includes(3) && values.includes(2);
}

export function isStraightHand(hand: Card[]): boolean {
  const sortedHand = hand.sort((a, b) => b.value - a.value);
  for (let i = 1; i < sortedHand.length; i++) {
    if (sortedHand[i].value !== sortedHand[i - 1].value - 1) {
      return false;
    }
  }
  return true;
}
