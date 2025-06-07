import React, { useState } from "react";
import { useSeasonFiveTeams } from "../hooks/useSeasonFiveTeams";
import { clsx } from "clsx";
// import { Team } from "@/types/tournament";
import { SeasonFiveMatchList } from "@/components/SeasonFiveMatchList";
import { Twitch, Star } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const HomePage: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState(1);
  const [selectedPhase, setSelectedPhase] = useState<"league" | "knockout">("league");
  const { teams: allTeams, loading } = useSeasonFiveTeams();
  const currentTeams = allTeams.filter((team) => team.division_id === selectedDivision);
  const sortedTeams = [...currentTeams].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    if (b.draws !== a.draws) {
      return b.draws - a.draws;
    }
    return a.losses - b.losses;
  });

  const divisions = [
    { id: 1, name: "Division 1" },
    { id: 2, name: "Division 2" },
    { id: 3, name: "Division 3" },
  ];

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
          selectedDivision === 2 ? (
            // Special handling for Division 2 with groups
            <div className="space-y-8">
              {/* Group A */}
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold text-idl-light mb-4">Group 2A</h3>
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
                    ) : (
                      allTeams
                        .filter((team) => team.division_id === 2)
                        .filter(
                          (team) =>
                            ["BDC", "Creep Enjoyers", "Fear the Samurai", "Lughs Last Hitters", "Mike's Army"].includes(
                              team.name?.trim()
                            ) || team.id === "1dec53ba-b42e-4d1d-9e6a-5f274a28b670"
                        )
                        .sort((a, b) => {
                          if (b.points !== a.points) return b.points - a.points;
                          if (b.wins !== a.wins) return b.wins - a.wins;
                          if (b.draws !== a.draws) return b.draws - a.draws;
                          return a.losses - b.losses;
                        })
                        .map((team, index) => (
                          <tr key={team.id} className="hover:bg-idl-dark transition-colors rounded-lg">
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light first:rounded-l-lg">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-idl-light">{team.name}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">
                              {team.wins + team.draws + team.losses}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.wins}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.draws}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.losses}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-idl-light last:rounded-r-lg">
                              {team.points}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Group B */}
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold text-idl-light mb-4">Group 2B</h3>
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
                    ) : (
                      allTeams
                        .filter(
                          (team) =>
                            team.division_id === 2 &&
                            ["Team LFT", "Cavan Champions", "Cavan Chumpions", "Ausgang"].includes(team.name?.trim())
                        )
                        .sort((a, b) => {
                          if (b.points !== a.points) return b.points - a.points;
                          if (b.wins !== a.wins) return b.wins - a.wins;
                          if (b.draws !== a.draws) return b.draws - a.draws;
                          return a.losses - b.losses;
                        })
                        .map((team, index) => (
                          <tr key={team.id} className="hover:bg-idl-dark transition-colors rounded-lg">
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light first:rounded-l-lg">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-idl-light">
                              <div className="flex items-center">
                                <span>{team.name}</span>
                                {team.name?.trim() === "Cavan Champions" && (
                                  <span className="ml-2 flex items-center">
                                    <Star size={16} className="text-gray-400 fill-gray-400" />
                                    <Star size={16} className="text-gray-400 fill-gray-400" />
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">
                              {team.wins + team.draws + team.losses}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.wins}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.draws}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.losses}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-idl-light last:rounded-r-lg">
                              {team.points}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Regular single table for Divisions 1 and 3
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
                    sortedTeams.map((team, index) => (
                      <tr key={team.id} className="hover:bg-idl-dark transition-colors rounded-lg">
                        <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light first:rounded-l-lg">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-idl-light">
                          <div className="flex items-center">
                            <span>{team.name}</span>
                            {team.name?.trim() === "Wongs Bakery馬戲團" && (
                              <span className="ml-2 flex items-center">
                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                              </span>
                            )}
                            {team.name?.trim() === "Imprint Esports" && (
                              <span className="ml-2 flex items-center">
                                <Star size={16} className="text-orange-600 fill-orange-600" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.wins + team.draws + team.losses}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.wins}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.draws}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-idl-light">{team.losses}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap font-bold text-idl-light last:rounded-r-lg">
                          {team.points}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <h3 className="text-xl font-medium text-idl-light mb-2">Knockout Phase</h3>
            <p className="text-gray-500 dark:text-gray-400">Knockout brackets will be available after the league phase concludes</p>
          </div>
        )}
      </div>

      <div className="bg-idl-gray rounded-lg shadow-md overflow-hidden">
        <div className="pl-6 pt-4 pb-2 relative">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-idl-light w-1/3">Season 5 Matches</h2>
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
        <SeasonFiveMatchList />
      </div>
    </div>
  );
};
