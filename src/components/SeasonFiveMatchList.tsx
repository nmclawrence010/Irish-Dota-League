import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { divisionMatches } from "@/data/matchDataSeason5";
import { Match } from "@/types/tournament";
import { MatchStats } from "@/components/MatchStats";

export const SeasonFiveMatchList: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(6);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const maxWeeks = 7;

  const getTeamName = (teamId: string): string => {
    const teamNames: Record<string, string> = {
      // Division 1
      joonsquad: "Joonsquad: Extrajoondicial Violence",
      mms: "M&M's",
      mouseys_fierce_warriors: "Mousey's Fierce Warriors",
      sentinel_island_esports: "Sentinel Island Esports",
      wongs_bakery: "Wongs Bakery馬戲團",
      // Division 2 - Group A
      bdc: "BDC",
      creep_enjoyers: "Creep Enjoyers",
      fear_the_samurai: "Fear the Samurai",
      lughs_last_hitters: "Lugh's Last Hitters",
      mikes_army: "Mike's Army",
      // Division 2 - Group B
      team_lft: "Team LFT",
      cavan_champions: "Cavan Champions",
      cavan_chumpions: "Cavan Chumpions",
      ausgang: "Ausgang",
      // Division 3
      imprint_esports: "Imprint Esports",
      border_control: "Border Control",
      passport_issues: "Passport Issues",
      ratatataouille: "Ratatataouille",
      bye_week: "Bye Week",
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
                <span className="font-medium text-idl-light">{getTeamName(match.team1Id)}</span>
              </div>
              <div className="flex items-center justify-center w-[116px]">
                <span className="text-sm font-medium text-idl-light">Bye Week</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-medium text-transparent">-</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Regular match display
        <button onClick={() => toggleMatch(match.id)} className="w-full p-2 md:p-4 hover:bg-idl-dark transition-colors relative text-left">
          <div className="relative md:px-4 py-4 md:py-0">
            <div className="grid grid-cols-[minmax(115px,1fr),auto,minmax(115px,1fr)] md:grid-cols-[minmax(200px,1fr),auto,minmax(200px,1fr)] items-center gap-4 max-w-3xl mx-auto">
              <div className="text-center md:text-right">
                <span className="text-sm md:text-base font-medium text-idl-light">{getTeamName(match.team1Id)}</span>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                {match.completed ? (
                  <>
                    <div className="inline-block bg-idl-dark px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className={`text-sm font-medium ${getScoreColor(match.score, 0)}`}>{match.score?.[0] || 0}</span>
                    </div>
                    <div className="inline-block bg-idl-dark px-2 py-1 rounded-lg min-w-[40px] text-center">
                      <span className="text-sm font-medium text-idl-light">vs</span>
                    </div>
                    <div className="inline-block bg-idl-dark px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className={`text-sm font-medium ${getScoreColor(match.score, 1)}`}>{match.score?.[1] || 0}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-block bg-idl-dark px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className="text-sm font-medium text-idl-light">0</span>
                    </div>
                    <div className="inline-block bg-idl-dark px-2 py-1 rounded-lg min-w-[40px] text-center">
                      <span className="text-sm font-medium text-idl-light">vs</span>
                    </div>
                    <div className="inline-block bg-idl-dark px-2 py-1 rounded-lg min-w-[32px] text-center">
                      <span className="text-sm font-medium text-idl-light">0</span>
                    </div>
                  </>
                )}
              </div>
              <div className="text-center md:text-left">
                <span className="text-sm md:text-base font-medium text-idl-light">{getTeamName(match.team2Id)}</span>
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
        <div className="p-4 pb-8 bg-idl-gray border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6">
            {!match.isByeWeek && match.games && (
              <>
                {/* Game 1 */}
                <div>
                  <h4 className="text-lg font-medium text-idl-light mb-3 text-center">Game 1</h4>
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
                <div className="border-b-2 border-idl-accent w-full opacity-75"></div>

                {/* Game 2 */}
                <div>
                  <h4 className="text-lg font-medium text-idl-light mb-3 text-center">Game 2</h4>
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
                    <div className="border-b-2 border-idl-accent w-full opacity-75"></div>
                    <div>
                      <h4 className="text-lg font-medium text-idl-light mb-3 text-center">Game 3</h4>
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
                    <div className="border-b-2 border-idl-accent w-full opacity-75"></div>
                    <div>
                      <h4 className="text-lg font-medium text-idl-light mb-3 text-center">Game 4</h4>
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
                    <div className="border-b-2 border-idl-accent w-full opacity-75"></div>
                    <div>
                      <h4 className="text-lg font-medium text-idl-light mb-3 text-center">Game 5</h4>
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
    <div className="bg-idl-gray rounded-lg shadow-md overflow-hidden">
      {/* Header with navigation */}
      <div className="bg-idl-gray p-4 border-b border-idl-accent">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handlePreviousWeek}
            disabled={currentWeek === 1}
            className="p-2 rounded-lg hover:bg-idl-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-idl-light" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-idl-light">Week {currentWeek}</h2>
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
            className="p-2 rounded-lg hover:bg-idl-gray/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-idl-light" />
          </button>
        </div>
      </div>

      {/* Matches list */}
      <div className="divide-y divide-idl-accent">
        {/* Division 1 */}
        <div className="px-4 py-3 bg-idl-accent relative">
          <h3 className="text-sm font-medium text-idl-light text-center">Division 1</h3>
        </div>
        {div1Matches.map(renderMatch)}

        {/* Division 2 */}
        {div2Matches.length > 0 && (
          <>
            <div className="px-4 py-3 bg-idl-accent text-center">
              <h3 className="text-sm font-medium text-idl-light">Division 2</h3>
            </div>
            {div2Matches.map(renderMatch)}
          </>
        )}

        {/* Division 3 */}
        {div3Matches.length > 0 && (
          <>
            <div className="px-4 py-3 bg-idl-accent text-center">
              <h3 className="text-sm font-medium text-idl-light">Division 3</h3>
            </div>
            {div3Matches.map(renderMatch)}
          </>
        )}
      </div>
    </div>
  );
};
