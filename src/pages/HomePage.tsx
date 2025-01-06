import React, { useState } from "react";
import { useTeams } from "../hooks/useTeams";
import { clsx } from "clsx";
import { Team } from "@/types/tournament";
import { MatchList } from "@/components/MatchList";

export const HomePage: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState(1);
  const { teams: currentTeams, loading } = useTeams(selectedDivision);

  const divisions = [
    { id: 1, name: "Division 1" },
    { id: 2, name: "Division 2" },
    { id: 3, name: "Division 3" },
  ];

  const renderTeamRow = (team: Team, index: number) => (
    <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{team.name}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.points}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.wins}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.draws}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.losses}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-gray-900 dark:text-white">{team.points}</td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <div className="flex space-x-2">
        {divisions.map((division) => (
          <button
            key={division.id}
            onClick={() => setSelectedDivision(division.id)}
            className={clsx(
              "px-6 py-3 rounded-lg font-semibold transition-colors",
              selectedDivision === division.id
                ? "bg-[#169B62] dark:bg-[#0A2F51] text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            {division.name}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {divisions.find((d) => d.id === selectedDivision)?.name} Standings
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Games Won
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Wins
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Draws
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Losses
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Loading teams...
                  </td>
                </tr>
              ) : currentTeams.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No teams registered yet
                  </td>
                </tr>
              ) : (
                currentTeams.map((team, index) => renderTeamRow(team, index))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fixtures - Ignore this, I'm working on main branch like a pleb
          </h2>
        </div>
        <MatchList />
      </div>
    </div>
  );
};
