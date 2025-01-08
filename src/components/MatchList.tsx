import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { divisionMatches } from "@/data/matchData";
import { Match } from "@/types/tournament";
import { MatchStats } from "@/components/MatchStats";

export const MatchList: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const maxWeeks = 3;

  const getTeamName = (teamId: string): string => {
    // Remove 'team_' prefix and replace underscores with spaces
    return teamId
      .replace("team_", "")
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

  const getScoreColor = (score: number[], index: number) => {
    if (score[0] === score[1]) return "text-gray-900 dark:text-white"; // Draw
    if ((index === 0 && score[0] > score[1]) || (index === 1 && score[1] > score[0])) {
      return "text-emerald-600 dark:text-emerald-400"; // Winner
    }
    return "text-red-500 dark:text-red-400"; // Loser
  };

  const toggleMatch = (matchId: string) => {
    setExpandedMatch((currentId) => (currentId === matchId ? null : matchId));
  };

  const renderMatch = (match: Match) => (
    <div key={match.id} className="relative">
      <button
        onClick={() => toggleMatch(match.id)}
        className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors relative group text-left"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[#169B62] transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FF8200] transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
        <div className="relative px-4">
          <div className="grid grid-cols-[minmax(200px,1fr),auto,minmax(200px,1fr)] items-center gap-4 max-w-3xl mx-auto">
            <div className="text-right">
              <span className="font-medium text-gray-900 dark:text-white">{getTeamName(match.team1Id)}</span>
            </div>
            <div className="flex items-center space-x-2">
              {match.completed ? (
                <>
                  <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[32px] text-center">
                    <span className={`text-sm font-medium ${getScoreColor(match.score!, 0)}`}>{match.score?.[0]}</span>
                  </div>
                  <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[40px] text-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">vs</span>
                  </div>
                  <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[32px] text-center">
                    <span className={`text-sm font-medium ${getScoreColor(match.score!, 1)}`}>{match.score?.[1]}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-block bg-gray-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg min-w-[32px] text-center">
                    <span className="text-sm font-medium text-transparent">0</span>
                  </div>
                  <div className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg min-w-[40px] text-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">vs</span>
                  </div>
                  <div className="inline-block bg-gray-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg min-w-[32px] text-center">
                    <span className="text-sm font-medium text-transparent">0</span>
                  </div>
                </>
              )}
            </div>
            <div className="text-left">
              <span className="font-medium text-gray-900 dark:text-white">{getTeamName(match.team2Id)}</span>
            </div>
          </div>

          {/* Chevron */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full bg-[#1d1d1b] flex items-center justify-center hover:opacity-90 transition-all">
              <ChevronDown
                size={20}
                className={`text-[#46ffd0] transform transition-transform ${expandedMatch === match.id ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div className={`overflow-hidden transition-all duration-300 ${expandedMatch === match.id ? "max-h-fit" : "max-h-0"}`}>
        <div className="p-4 pb-8 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Game 1 */}
            <div>
              <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 1</h4>
              <MatchStats matchId={match.id} dota2MatchId={match.games.game1.dota2MatchId || ""} isExpanded={expandedMatch === match.id} />
            </div>

            {/* Game divider */}
            <div className="border-b-2 border-gray-300 dark:border-gray-600 w-full opacity-75"></div>

            {/* Game 2 */}
            <div>
              <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3 text-center">Game 2</h4>
              <MatchStats matchId={match.id} dota2MatchId={match.games.game2.dota2MatchId || ""} isExpanded={expandedMatch === match.id} />
            </div>
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
