export interface Player {
  name: string;
  steamProfile: string;
  rank: string;
  auth_id?: string;
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
};

export type Match = {
  id: string;
  team1Id: string;
  team2Id: string;
  score?: [number, number];
  date: string;
  completed: boolean;
  week: number;
  games: {
    game1Winner?: string;
    game2Winner?: string;
  };
};

export type Division = {
  id: 1 | 2;
  name: string;
  teams: Team[];
  matches: Match[];
};