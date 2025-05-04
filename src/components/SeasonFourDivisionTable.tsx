import React from "react";
import { Division } from "../types/tournament";

interface DivisionTableProps {
  division: Division;
}

export const SeasonFourDivisionTable: React.FC<DivisionTableProps> = ({ division }) => {
  const sortedTeams = [...division.teams].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-idl-gray rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-2xl font-bold mb-4 text-idl-light">{division.name}</h2>
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
                <td className="px-6 py-4 whitespace-nowrap text-idl-light">{team.points}</td>
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
