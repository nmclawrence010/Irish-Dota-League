import React from "react";
import { divisionMatches } from "@/data/matchDataSeason5";
import { Match } from "@/types/tournament";

interface TeamStanding {
  id: string;
  name: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  gamesWon: number;
  gamesLost: number;
}

interface DivisionTableProps {
  divisionNumber: 1 | 2 | 3;
}

export const SeasonFiveDivisionTable: React.FC<DivisionTableProps> = ({ divisionNumber }) => {
  const getTeamName = (teamId: string): string => {
    const teamNames: Record<string, string> = {
      // Division 1
      joonsquad: "JOONSQUAD: Welcome to the JOONgle",
      mms: "M&M's",
      mouseys_fierce_warriors: "Mousey's Fierce Warriors",
      sentinel_island_esports: "Sentinel Island Esports",
      wongs_bakery: "Wongs Bakery馬戲團",
    };
    return teamNames[teamId] || teamId;
  };

  const calculateStandings = (matches: Match[]): TeamStanding[] => {
    const teams = new Map<string, TeamStanding>();

    // Initialize teams
    const teamIds = new Set<string>();
    matches.forEach((match) => {
      if (!match.isByeWeek) {
        teamIds.add(match.team1Id);
        teamIds.add(match.team2Id);
      }
    });

    teamIds.forEach((teamId) => {
      teams.set(teamId, {
        id: teamId,
        name: getTeamName(teamId),
        wins: 0,
        draws: 0,
        losses: 0,
        points: 0,
        gamesWon: 0,
        gamesLost: 0,
      });
    });

    // Calculate standings from completed matches
    matches.forEach((match) => {
      if (match.completed && !match.isByeWeek && match.score) {
        const team1 = teams.get(match.team1Id);
        const team2 = teams.get(match.team2Id);

        if (team1 && team2) {
          const [team1Score, team2Score] = match.score;

          // Update game wins/losses
          team1.gamesWon += team1Score;
          team1.gamesLost += team2Score;
          team2.gamesWon += team2Score;
          team2.gamesLost += team1Score;

          // Update series results and points
          if (team1Score > team2Score) {
            // Team 1 wins
            team1.wins += 1;
            team1.points += 3;
            team2.losses += 1;
          } else if (team2Score > team1Score) {
            // Team 2 wins
            team2.wins += 1;
            team2.points += 3;
            team1.losses += 1;
          } else {
            // Draw
            team1.draws += 1;
            team1.points += 1;
            team2.draws += 1;
            team2.points += 1;
          }
        }
      }
    });

    return Array.from(teams.values());
  };

  const matches = divisionMatches[divisionNumber] || [];
  const standings = calculateStandings(matches);

  // Sort teams by points (desc), then wins (desc), then draws (desc), then losses (asc)
  const sortedTeams = standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.draws !== a.draws) return b.draws - a.draws;
    return a.losses - b.losses;
  });

  const divisionName = `Division ${divisionNumber}`;

  // Don't render if no teams in division
  if (sortedTeams.length === 0) {
    return null;
  }

  return (
    <div className="bg-idl-gray rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-2xl font-bold mb-4 text-idl-light">{divisionName}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-idl-gray">
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Games Won</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Series Won</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Series Drawn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Series Lost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-idl-gray divide-y divide-idl-accent">
            {sortedTeams.map((team, index) => (
              <tr key={team.id} className="hover:bg-idl-dark transition-colors rounded-lg">
                <td className="px-6 py-4 whitespace-nowrap text-idl-light first:rounded-l-lg">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-idl-light">{team.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-idl-light">{team.gamesWon}</td>
                <td className="px-6 py-4 whitespace-nowrap text-idl-light">{team.wins}</td>
                <td className="px-6 py-4 whitespace-nowrap text-idl-light">{team.draws}</td>
                <td className="px-6 py-4 whitespace-nowrap text-idl-light">{team.losses}</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-idl-light last:rounded-r-lg">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
