export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';
export type Color = 'Cœur' | 'Carreau' | 'Trèfle' | 'Pique';

export interface Card {
  rank: Rank;
  color: Color;
}

export const colors: Color[] = ['Cœur', 'Carreau', 'Trèfle', 'Pique'];
export const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];

export function initDeck(): Card[] {  
  let deck: Card[] = [];
  
  colors.forEach(color => {
    ranks.forEach(rank => {
      deck.push({ rank, color });
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