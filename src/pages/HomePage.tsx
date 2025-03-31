import React, { useState } from "react";
import { useTeams } from "../hooks/useTeams";
import { clsx } from "clsx";
import { Team } from "@/types/tournament";
import { MatchList } from "@/components/MatchList";
import { Twitch } from "lucide-react";
import { KnockoutBracket } from "@/components/KnockoutBracket";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const HomePage: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState(2);
  const [selectedPhase, setSelectedPhase] = useState<"league" | "knockout">("knockout");
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
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.wins + team.draws + team.losses}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.wins}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.draws}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-gray-900 dark:text-gray-100">{team.losses}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-gray-900 dark:text-white">{team.points}</td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex shadow-sm">
            {divisions.map((division) => (
              <button
                key={division.id}
                onClick={() => setSelectedDivision(division.id)}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  selectedDivision === division.id
                    ? "bg-[#169B62] dark:bg-[#0A2F51] text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                )}
              >
                {division.name}
              </button>
            ))}
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex shadow-sm">
            <button
              onClick={() => setSelectedPhase("league")}
              className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                selectedPhase === "league"
                  ? "bg-[#169B62] dark:bg-[#0A2F51] text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              )}
            >
              League Phase
            </button>
            <button
              onClick={() => setSelectedPhase("knockout")}
              className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                selectedPhase === "knockout"
                  ? "bg-[#169B62] dark:bg-[#0A2F51] text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              )}
            >
              Knockout Phase
            </button>
          </div>
        </div>

        {selectedPhase === "league" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Played
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
                    <td colSpan={7} className="px-6 py-8">
                      <LoadingSpinner />
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
        ) : (
          <div className="overflow-x-auto">
            {loading ? (
              <div className="h-[600px] flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <KnockoutBracket teams={currentTeams ?? []} division={selectedDivision} />
            )}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="pl-6 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700 relative">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fixtures</h2>
          <a
            href="https://www.twitch.tv/dota2ireland"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-14 md:-right-20 mt-1 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 text-sm md:text-base text-gray-600 hover:text-[#6441a5] dark:text-gray-400 dark:hover:text-[#6441a5] transition-colors"
          >
            Games will be live on <Twitch size={20} className="text-[#6441a5]" />
          </a>
        </div>
        <MatchList />
      </div>
    </div>
  );
};
