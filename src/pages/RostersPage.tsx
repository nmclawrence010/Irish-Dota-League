import React from 'react';
import { useAllTeams } from '../hooks/useAllTeams';

export const RostersPage: React.FC = () => {
  const { teams, loading, error } = useAllTeams();

  const renderEmptySlots = (currentPlayers: number) => {
    const emptySlots = [];
    for (let i = currentPlayers; i < 5; i++) {
      emptySlots.push(
        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-400 dark:text-gray-500">Empty Slot</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">No player assigned</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Unranked</p>
            </div>
          </div>
        </div>
      );
    }
    return emptySlots;
  };

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-8">
        Error loading teams: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Rosters</h1>
      
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Loading teams...
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No teams registered yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {team.name}
                </h2>
                <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  Div {team.division_id}
                </span>
              </div>
              
              <div className="space-y-2">
                {team.players && team.players.map((player, index) => (
                  <div key={index} className="p-2 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="space-y-0.5">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{player.name}</p>
                      <a 
                        href={player.steamProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Steam Profile
                      </a>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Rank: {player.rank}</p>
                    </div>
                  </div>
                ))}
                {team.players && renderEmptySlots(team.players.length)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 