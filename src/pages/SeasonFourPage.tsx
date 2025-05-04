import React, { useState } from "react";
import { useSeasonFourTeams } from "../hooks/useSeasonFourTeams";
import { clsx } from "clsx";
import { Team } from "@/types/tournament";
import { SeasonFourMatchList } from "@/components/SeasonFourMatchList";
import { Twitch } from "lucide-react";
import { SeasonFourKnockoutBracket } from "@/components/SeasonFourKnockoutBracket";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const SeasonFourPage: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState(2);
  const [selectedPhase, setSelectedPhase] = useState<"league" | "knockout">("league");
  const { teams: allTeams, loading } = useSeasonFourTeams();
  const currentTeams = allTeams.filter((team) => team.division_id === selectedDivision);

  const divisions = [
    { id: 1, name: "Division 1" },
    { id: 2, name: "Division 2" },
    { id: 3, name: "Division 3" },
  ];

  const renderTeamRow = (team: Team, index: number) => (
    <tr key={team.id} className="hover:bg-idl-dark transition-colors rounded-lg">
      <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light first:rounded-l-lg">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-idl-light">{team.name}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.wins + team.draws + team.losses}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.wins}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.draws}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.losses}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-idl-light last:rounded-r-lg">{team.points}</td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <div className="bg-idl-gray rounded-lg shadow-md p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="bg-idl-light p-1 rounded-lg inline-flex shadow-sm">
            {divisions.map((division) => (
              <button
                key={division.id}
                onClick={() => setSelectedDivision(division.id)}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  selectedDivision === division.id ? "bg-idl-accent text-white" : "text-gray-700 hover:bg-gray-50"
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
                selectedPhase === "league" ? "bg-idl-accent text-white" : "text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              )}
            >
              League Phase
            </button>
            <button
              onClick={() => setSelectedPhase("knockout")}
              className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                selectedPhase === "knockout" ? "bg-idl-accent text-white" : "text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                <tr className="bg-idl-gray">
                  <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Played</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Wins</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Draws</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Losses</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-idl-gray divide-y divide-idl-accent">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : currentTeams.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-idl-light">
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
              <SeasonFourKnockoutBracket teams={currentTeams ?? []} division={selectedDivision} />
            )}
          </div>
        )}
      </div>

      <div className="bg-idl-gray rounded-lg shadow-md overflow-hidden">
        <div className="pl-6 pt-4 pb-2 relative">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-idl-light w-1/3">Upcoming Matches</h2>
            <div className="flex-1 flex justify-center items-center gap-2">
              <p className="text-xs text-idl-light">Stats powered by</p>
              <img src="/imprintbannernoback.png" alt="Imprint Banner" className="h-8" />
            </div>
            <div className="w-1/3"></div>
          </div>
          <a
            href="https://www.twitch.tv/dota2ireland"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-14 md:-right-20 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 text-sm md:text-base text-idl-light hover:text-idl-accent transition-colors"
          >
            Games will be live over at <Twitch size={20} className="text-idl-accent" />
          </a>
        </div>
        <SeasonFourMatchList />
      </div>
    </div>
  );
};
