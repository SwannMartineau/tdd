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

export function isCouleur(hand: Card[]): boolean {
  const colorsCount: { [key in Color]: number } = { 'Cœur': 0, 'Carreau': 0, 'Trèfle': 0, 'Pique': 0 };

  hand.forEach(card => {
    colorsCount[card.color]++;
  });

  return Object.values(colorsCount).includes(5);
}

export function isRoyalFlush(hand: Card[]): boolean {
  const sortedHand = hand.sort((a, b) => b.value - a.value);
  const isFlush = isCouleur(hand);

  return isFlush && sortedHand[0].rank === 'As' && sortedHand[1].rank === 'Roi' && sortedHand[2].rank === 'Dame' && sortedHand[3].rank === 'Valet' && sortedHand[4].rank === '10';
}

export function evaluateHand(hand: Card[]): { score: number, egalite: number[] } {
  const sortedHand = hand.sort((a, b) => b.value - a.value);
  
  if (isRoyalFlush(hand)) return { score: 10, egalite: sortedHand.map(card => card.value) };
  if (isStraightHand(hand) && isCouleur(hand)) return { score: 9, egalite: sortedHand.map(card => card.value) };
  if (isCarre(hand)) return { score: 8, egalite: sortedHand.filter(card => card.rank === sortedHand[0].rank).map(card => card.value) };
  if (isFull(hand)) return { score: 7, egalite: sortedHand.map(card => card.value) };
  if (isCouleur(hand)) return { score: 6, egalite: sortedHand.map(card => card.value) };
  if (isStraightHand(hand)) return { score: 5, egalite: sortedHand.map(card => card.value) };
  if (isBrelan(hand)) return { score: 4, egalite: sortedHand.filter(card => card.rank === sortedHand[0].rank).map(card => card.value) };
  if (isTwoPair(hand)) return { score: 3, egalite: sortedHand.map(card => card.value) };
  if (isOnePair(hand)) return { score: 2, egalite: sortedHand.map(card => card.value) };
  
  return { score: 1, egalite: sortedHand.map(card => card.value) };
}

export function comparePlayers(player1: Player, player2: Player): Player {
  const hand1 = evaluateHand(player1.cards);
  const hand2 = evaluateHand(player2.cards);
  
  if (hand1.score > hand2.score) return player1;
  if (hand1.score < hand2.score) return player2;
  
  for (let i = 0; i < 5; i++) {
    if (hand1.egalite[i] > hand2.egalite[i]) return player1;
    if (hand1.egalite[i] < hand2.egalite[i]) return player2;
  }
}