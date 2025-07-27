export interface Player {
  name: string;
  steamProfile: string;
  rank: string;
  auth_id?: string;
  country?: string;
  role?: string;
}

export type Team = {
  id: string;
  name: string;
  players: Player[];
  points: number;
  wins: number;
  draws: number;
  losses: number;
  division_id: number;
  image_url?: string;
};

interface Game {
  played: boolean;
  winner?: string;
  dota2MatchId?: string;
}

export type Match = {
  id: string;
  team1Id: string;
  team2Id: string;
  date: string;
  completed: boolean;
  week: number;
  isByeWeek?: boolean;
  isKnockout?: boolean;
  games: {
    game1: Game;
    game2: Game;
    game3?: Game;
    game4?: Game;
    game5?: Game;
  };
  seriesWinner?: string;
  score?: [number, number];
};

export type Division = {
  id: 1 | 2;
  name: string;
  teams: Team[];
  matches: Match[];
};
