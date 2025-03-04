export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Valet' | 'Dame' | 'Roi' | 'As';
export type Color = 'Cœur' | 'Carreau' | 'Trèfle' | 'Pique';

export interface Card {
  rank: Rank;
  color: Color;
}

export function initDeck(): Card[] {
  const colors: Color[] = ['Cœur', 'Carreau', 'Trèfle', 'Pique'];
  const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];
  
  let deck: Card[] = [];
  
  colors.forEach(color => {
    ranks.forEach(rank => {
      deck.push({ rank, color });
    });
  });
  
  return deck;
}
