export interface Movie {
  id: string;
  title: string;
  year: string;
  posterUrl: string;
  videoUrl: string;
  description: string;
}

export interface Painting {
  id: string;
  imageUrl: string;
  artist: string;
  title: string;
}

export interface MovieStill {
  id: string;
  imageUrl: string;
  movieTitle: string;
  year: string;
}

export interface WordleWord {
  word: string;
  description: string;
}

export interface GameState {
  currentGame: 'artist' | 'movie' | 'wordle' | null;
  score: number;
  completed: string[];
}