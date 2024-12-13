import React, { useState } from "react";
import { Match, Division } from "../types/tournament";
import { useTournamentStore } from "../store/tournamentStore";
import { ChevronDown, ChevronUp } from "lucide-react";
import { clsx } from "clsx";

interface MatchListProps {
  division: Division;
}

export const MatchList: React.FC<MatchListProps> = ({ division }) => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const updateMatch = useTournamentStore((state) => state.updateMatch);

  const getTeamName = (teamId: string): string => {
    const team = division.teams.find((t) => t.id === teamId);
    return team?.name || "Unknown Team";
  };

  const handleGameUpdate = (match: Match, gameNumber: 1 | 2, winner: string) => {
    const updatedMatch = {
      ...match,
      games: {
        ...match.games,
        [gameNumber === 1 ? "game1Winner" : "game2Winner"]: winner,
      },
    };

    // If both games are completed, calculate the final score
    if (updatedMatch.games.game1Winner && updatedMatch.games.game2Winner) {
      const team1Wins =
        (updatedMatch.games.game1Winner === match.team1Id ? 1 : 0) + (updatedMatch.games.game2Winner === match.team1Id ? 1 : 0);
      const team2Wins = 2 - team1Wins;

      updatedMatch.completed = true;
      updatedMatch.score = [team1Wins, team2Wins];
    }

    updateMatch(division.id, updatedMatch);
  };

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => (prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]));
  };

  const matchesByWeek = division.matches.reduce((acc, match) => {
    if (!acc[match.week]) {
      acc[match.week] = [];
    }
    acc[match.week].push(match);
    return acc;
  }, {} as Record<number, Match[]>);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 transition-colors">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Fixture List</h3>

      <div className="space-y-4">
        {Object.entries(matchesByWeek).map(([week, matches]) => (
          <div key={week} className="border dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleWeek(parseInt(week))}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white">Week {week}</span>
              {expandedWeeks.includes(parseInt(week)) ? (
                <ChevronUp size={20} className="text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <div
              className={clsx("transition-all duration-300", {
                hidden: !expandedWeeks.includes(parseInt(week)),
              })}
            >
              {matches.map((match) => (
                <div key={match.id} className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4 text-gray-900 dark:text-white">
                      <span className="font-medium">{getTeamName(match.team1Id)}</span>
                      <span className="text-gray-500 dark:text-gray-400">vs</span>
                      <span className="font-medium">{getTeamName(match.team2Id)}</span>
                    </div>
                    {match.completed && (
                      <div className="text-gray-600 dark:text-gray-400">
                        Score: {match.score?.[0]} - {match.score?.[1]}
                      </div>
                    )}
                  </div>

                  {!match.completed && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Game 1:</span>
                        {!match.games.game1Winner ? (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleGameUpdate(match, 1, match.team1Id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition-colors"
                            >
                              {getTeamName(match.team1Id)} Won
                            </button>
                            <button
                              onClick={() => handleGameUpdate(match, 1, match.team2Id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition-colors"
                            >
                              {getTeamName(match.team2Id)} Won
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900 dark:text-white">Winner: {getTeamName(match.games.game1Winner)}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Game 2:</span>
                        {!match.games.game2Winner ? (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleGameUpdate(match, 2, match.team1Id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition-colors"
                            >
                              {getTeamName(match.team1Id)} Won
                            </button>
                            <button
                              onClick={() => handleGameUpdate(match, 2, match.team2Id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition-colors"
                            >
                              {getTeamName(match.team2Id)} Won
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900 dark:text-white">Winner: {getTeamName(match.games.game2Winner)}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
