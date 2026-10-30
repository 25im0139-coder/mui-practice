export type Movie = {
  title: string;
  year: number;
  director: string;
  minutes: number;
  genres: string[];
  tagline: string;
  synopsis: string;
  wiki: string;
  poster: string;
  c1: string; // neon color 1
  c2: string; // neon color 2
};

// Poster paths are relative, so they work with Vite's base "/mui-practice/".
export const movies: Movie[] = [
  {
    title: 'Blade Runner 2049', year: 2017, director: 'Denis Villeneuve', minutes: 164,
    genres: ['Sci-Fi', 'Neo-noir'], c1: '#ff7a1a', c2: '#16f4ff',
    tagline: 'A buried secret could change what it means to be human.',
    synopsis: 'Officer K, a replicant who hunts older replicants, uncovers a long-hidden secret. His search leads him to Rick Deckard, a blade runner who vanished thirty years earlier.',
    wiki: 'Blade_Runner_2049', poster: 'posters/blade-runner-2049.jpg',
  },
  {
    title: 'Spirited Away', year: 2001, director: 'Hayao Miyazaki', minutes: 125,
    genres: ['Animation', 'Fantasy'], c1: '#16f4ff', c2: '#b6ff3b',
    tagline: 'A bathhouse for spirits, and a girl who must save her parents.',
    synopsis: 'Ten-year-old Chihiro wanders into a hidden world ruled by gods and witches. To free her parents, she takes a job at a bathhouse and learns to stand on her own.',
    wiki: 'Spirited_Away', poster: 'posters/spirited-away.jpg',
  },
  {
    title: 'Inception', year: 2010, director: 'Christopher Nolan', minutes: 148,
    genres: ['Sci-Fi', 'Thriller'], c1: '#8a5bff', c2: '#16f4ff',
    tagline: 'Your mind is the scene of the crime.',
    synopsis: 'Dom Cobb steals secrets from inside people’s dreams. His final job is the reverse: planting an idea in a target’s mind, across several layers of dreaming.',
    wiki: 'Inception', poster: 'posters/inception.jpg',
  },
  {
    title: 'Mad Max: Fury Road', year: 2015, director: 'George Miller', minutes: 120,
    genres: ['Action', 'Adventure'], c1: '#ffd21a', c2: '#ff3b30',
    tagline: 'The future belongs to the mad.',
    synopsis: 'In a desert wasteland, Furiosa runs from a tyrant with his prisoners. Max, a drifter haunted by his past, is dragged into the high-speed escape.',
    wiki: 'Mad_Max:_Fury_Road', poster: 'posters/mad-max-fury-road.jpg',
  },
  {
    title: 'Your Name.', year: 2016, director: 'Makoto Shinkai', minutes: 107,
    genres: ['Animation', 'Romance'], c1: '#ff6fb5', c2: '#16f4ff',
    tagline: 'Two strangers swap lives and search for each other.',
    synopsis: 'Mitsuha, in a rural town, and Taki, in Tokyo, begin waking up in each other’s bodies. As they leave notes for one another, they uncover a bond tied to a comet.',
    wiki: 'Your_Name.', poster: 'posters/your-name.jpg',
  },
  {
    title: 'The Matrix', year: 1999, director: 'The Wachowskis', minutes: 136,
    genres: ['Sci-Fi', 'Action'], c1: '#39ff14', c2: '#16f4ff',
    tagline: 'Free your mind.',
    synopsis: 'Hacker Neo learns that his everyday world is a simulation built by machines. He joins a rebel crew and begins to fight for those still trapped inside.',
    wiki: 'The_Matrix', poster: 'posters/the-matrix.jpg',
  },
];
