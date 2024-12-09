import { create } from 'zustand';
import { Division, Team, Match } from '../types/tournament';
import { divisionMatches } from '../data/matchData';

interface TournamentState {
  divisions: Division[];
  addTeam: (divisionId: number, team: Team) => void;
  updateMatch: (divisionId: number, match: Match) => void;
}

const calculateTeamStats = (team: Team, matches: Match[]): Team => {
  const teamMatches = matches.filter(
    (m) => m.completed && (m.team1Id === team.id || m.team2Id === team.id)
  );

  let wins = 0;
  let draws = 0;
  let losses = 0;
  let points = 0;

  teamMatches.forEach((match) => {
    const isTeam1 = match.team1Id === team.id;
    const teamScore = isTeam1 ? match.score![0] : match.score![1];
    const opponentScore = isTeam1 ? match.score![1] : match.score![0];

    // Add points based on games won (1 point per game)
    points += teamScore;

    if (teamScore > opponentScore) wins++;
    else if (teamScore === opponentScore) draws++;
    else losses++;
  });

  return {
    ...team,
    points,
    wins,
    draws,
    losses,
  };
};

export const useTournamentStore = create<TournamentState>()((set) => ({
  divisions: [
    {
      id: 1,
      name: 'Division 1',
      teams: [],
      matches: divisionMatches[1],
    },
    {
      id: 2,
      name: 'Division 2',
      teams: [],
      matches: divisionMatches[2],
    },
  ],

  addTeam: (divisionId, team) =>
    set((state) => ({
      divisions: state.divisions.map((div) =>
        div.id === divisionId
          ? { ...div, teams: [...div.teams, team] }
          : div
      ),
    })),

  updateMatch: (divisionId, updatedMatch) =>
    set((state) => ({
      divisions: state.divisions.map((div) =>
        div.id === divisionId
          ? {
              ...div,
              matches: div.matches.map((match) =>
                match.id === updatedMatch.id ? updatedMatch : match
              ),
              teams: div.teams.map((team) => 
                calculateTeamStats(team, [
                  ...div.matches.filter((m) => m.id !== updatedMatch.id),
                  updatedMatch,
                ])
              ),
            }
          : div
      ),
    })),
}));