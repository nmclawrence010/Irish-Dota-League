import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { divisionMatches } from "@/data/matchData";
import { Match } from "@/types/tournament";
import { MatchStats } from "@/components/MatchStats";

export const MatchList: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(8);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const maxWeeks = 8;

  const getTeamName = (teamId: string): string => {
    const teamNames: Record<string, string> = {
      // Division 1
      monkey_kings: "Monkey Kings",
      wongs_bakery: "Wongs Bakery 麵包店",
      the_standins: "The Standins",
      joonsquad: "JOONSQUAD: Welcome to the JOONgle",
      team_secret: "It's a Team Secret",
      bye_week: "Bye Week",
      // Division 2
      taylors_angels: "Taylor's Angels",
      kobold_camp: "Kobold Camp",
      cavan_champions: "Cavan Champions",
      stinky_steve: "Stinky Steve and the BO Boys",
      creep_enjoyers: "Creep Enjoyers",
      void: "Void",
      // Division 3
      dans_crusty_socks: "Dans Crusty Socks",
      imprint_esports: "Imprint Esports",
      passport_issues: "Passport Issues",
      andy_archons: "Andy & The Archons",
      no_discord: "No Discord Notifications",
    };
    return teamNames[teamId] || teamId;
  };

  const getMatchesForWeek = (week: number) => {
    const div1Matches = divisionMatches[1].filter((match) => match.week === week);
    const div2Matches = divisionMatches[2].filter((match) => match.week === week);
    const div3Matches = divisionMatches[3].filter((match) => match.week === week);
    const weekDate = div1Matches[0]?.date;
    return { div1Matches, div2Matches, div3Matches, weekDate };
  };

  const { div1Matches, div2Matches, div3Matches, weekDate } = getMatchesForWeek(currentWeek);

  const handlePreviousWeek = () => {
    setCurrentWeek((week) => Math.max(1, week - 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek((week) => Math.min(maxWeeks, week + 1));
  };

  const getScoreColor = (score: number[] | undefined, index: number) => {
    if (!score) {
      return "text-gray-600 dark:text-gray-400"; // Default color for undefined scores
    }
    if (score[0] === score[1]) {
      return "text-amber-500 dark:text-amber-400"; // Draw - yellow color
    }
    if ((index === 0 && score[0] > score[1]) || (index === 1 && score[1] > score[0])) {
      return "text-emerald-600 dark:text-emerald-400"; // Winner - green
    }
    return "text-red-500 dark:text-red-400"; // Loser - red
  };

  const toggleMatch = (matchId: string) => {
    setExpandedMatch((currentId) => (currentId === matchId ? null : matchId));
  };

  const renderMatch = (match: Match) => (
    <div key={match.id} className="relative overflow-x-scroll md:overflow-auto">
      {match.isByeWeek ? (
        // Bye week display
        <div className="w-full p-4 relative">
          <div className="relative md:px-4 py-4 md:py-0">
            <div className="grid grid-cols-[minmax(115px,1fr),auto,minmax(115px,1fr)] md:grid-cols-[minmax(200px,1fr),auto,minmax(200px,1fr)] items-center gap-4 max-w-3xl mx-auto">
              <div className="text-center md:text-right">
                <span className="font-medium text-gray-900 dark:text-white">{getTeamName(match.team1Id)}</span>
              </div>
              <div className="flex items-center justify-center w-[116px]">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bye Week</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-medium text-transparent">-</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Regular match display - keep existing code
        <button
          onClick={() => toggleMatch(match.id)}
          className="w-full p-2 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors relative text-left"
        >
          <div className="relative md:px-4 py-4 md:py-0">
            <div className="grid grid-cols-[minmax(115px,1fr),auto,minmax(115px,1fr)] md:grid-cols-[minmax(200px,1fr),auto,minmax(200px,1fr)] items-center gap-4 max-w-3xl mx-auto">
              <div className="text-center md:text-right">
                <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">{getTeamName(match.team1Id)}</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                {match.completed ? (
                  <>
                    <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className={`text-sm font-medium ${getScoreColor(match.score, 0)}`}>{match.score?.[0] || 0}</span>
                    </div>
                    <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[40px] text-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">vs</span>
                    </div>
                    <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className={`text-sm font-medium ${getScoreColor(match.score, 1)}`}>{match.score?.[1] || 0}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-block bg-gray-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className="text-sm font-medium text-white">0</span>
                    </div>
                    <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[40px] text-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">vs</span>
                    </div>
                    <div className="inline-block bg-gray-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className="text-sm font-medium text-white">0</span>
                    </div>
                  </>
                )}
              </div>
              <div className="text-center md:text-left">
                <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white">{getTeamName(match.team2Id)}</span>
              </div>
            </div>

            {/* Chevron */}
            <div className="md:absolute mt-4 md:mt-0 flex justify-center relative md:right-2 md:top-1/2 md:-translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-[#1d1d1b] flex items-center justify-center hover:opacity-90 transition-all">
                <ChevronDown
                  size={20}
                  className={`text-[#46ffd0] transform transition-transform ${expandedMatch === match.id ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Expandable content */}
      <div className={`overflow-hidden transition-all duration-300 ${expandedMatch === match.id ? "max-h-fit" : "max-h-0"}`}>
        <div className="p-4 pb-8 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto space-y-6">
            {!match.isByeWeek && match.games && (
              <>
                {/* Game 1 */}
                <div>
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 1</h4>
                  <MatchStats
                    matchId={match.id}
                    dota2MatchId={match.games.game1.dota2MatchId || ""}
                    isExpanded={expandedMatch === match.id}
                  />
                  {match.games.game1.dota2MatchId && (
                    <div className="mt-4 text-center">
                      <a
                        href={`https://www.dotabuff.com/matches/${match.games.game1.dota2MatchId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2 inline-block hover:opacity-80 transition-opacity"
                      >
                        <img src="/dotabuff.png" alt="View on Dotabuff" className="h-6 w-auto" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Game divider */}
                <div className="border-b-2 border-gray-300 dark:border-gray-600 w-full opacity-75"></div>

                {/* Game 2 */}
                <div>
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 2</h4>
                  <MatchStats
                    matchId={match.id}
                    dota2MatchId={match.games.game2.dota2MatchId || ""}
                    isExpanded={expandedMatch === match.id}
                  />
                  {match.games.game2.dota2MatchId && (
                    <div className="mt-4 text-center">
                      <a
                        href={`https://www.dotabuff.com/matches/${match.games.game2.dota2MatchId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2 inline-block hover:opacity-80 transition-opacity"
                      >
                        <img src="/dotabuff.png" alt="View on Dotabuff" className="h-6 w-auto" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Game 3 */}
                {match.games.game3 && (
                  <>
                    <div className="border-b-2 border-gray-300 dark:border-gray-600 w-full opacity-75"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 3</h4>
                      <MatchStats
                        matchId={match.id}
                        dota2MatchId={match.games.game3.dota2MatchId || ""}
                        isExpanded={expandedMatch === match.id}
                      />
                      {match.games.game3.dota2MatchId && (
                        <div className="mt-4 text-center">
                          <a
                            href={`https://www.dotabuff.com/matches/${match.games.game3.dota2MatchId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 inline-block hover:opacity-80 transition-opacity"
                          >
                            <img src="/dotabuff.png" alt="View on Dotabuff" className="h-6 w-auto" />
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Game 4 */}
                {match.games.game4 && (
                  <>
                    <div className="border-b-2 border-gray-300 dark:border-gray-600 w-full opacity-75"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 4</h4>
                      <MatchStats
                        matchId={match.id}
                        dota2MatchId={match.games.game4.dota2MatchId || ""}
                        isExpanded={expandedMatch === match.id}
                      />
                      {match.games.game4.dota2MatchId && (
                        <div className="mt-4 text-center">
                          <a
                            href={`https://www.dotabuff.com/matches/${match.games.game4.dota2MatchId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 inline-block hover:opacity-80 transition-opacity"
                          >
                            <img src="/dotabuff.png" alt="View on Dotabuff" className="h-6 w-auto" />
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Game 5 */}
                {match.games.game5 && match.games.game5.played && (
                  <>
                    <div className="border-b-2 border-gray-300 dark:border-gray-600 w-full opacity-75"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 5</h4>
                      <MatchStats
                        matchId={match.id}
                        dota2MatchId={match.games.game5.dota2MatchId || ""}
                        isExpanded={expandedMatch === match.id}
                      />
                      {match.games.game5.dota2MatchId && (
                        <div className="mt-4 text-center">
                          <a
                            href={`https://www.dotabuff.com/matches/${match.games.game5.dota2MatchId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 inline-block hover:opacity-80 transition-opacity"
                          >
                            <img src="/dotabuff.png" alt="View on Dotabuff" className="h-6 w-auto" />
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header with navigation */}
      <div className="bg-gray-50 dark:bg-gray-750 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handlePreviousWeek}
            disabled={currentWeek === 1}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Week {currentWeek}</h2>
            {weekDate && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(weekDate).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            )}
          </div>

          <button
            onClick={handleNextWeek}
            disabled={currentWeek === maxWeeks}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Matches list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Division 1 */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 relative">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">Division 1</h3>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">powered by</p>
            <img src="/imprintbannernoback.png" alt="Imprint Banner" className="h-8" />
          </div>
        </div>
        {div1Matches.map(renderMatch)}

        {/* Division 2 */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 text-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Division 2</h3>
        </div>
        {div2Matches.map(renderMatch)}

        {/* Division 3 */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 text-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Division 3</h3>
        </div>
        {div3Matches.map(renderMatch)}
      </div>
    </div>
  );
};
