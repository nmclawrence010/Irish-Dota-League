import React from "react";
import { Team } from "@/types/tournament";

interface KnockoutBracketProps {
  teams: Team[];
  division?: number;
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = ({ teams, division = 2 }) => {
  // Sort teams by points to determine seeding
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  const matchBoxClasses =
    "w-48 h-16 bg-gray-50 dark:bg-gray-750 rounded-lg p-3 flex flex-col justify-center border border-gray-200 dark:border-gray-700";
  const finalsBoxClasses =
    "w-48 h-24 bg-[#169B62] dark:bg-[#0A2F51] rounded-lg p-3 flex flex-col justify-center border border-gray-200 dark:border-gray-700";
  const winnerBoxClasses =
    "w-48 h-20 bg-[#FFD700] dark:bg-[#B8860B] rounded-lg p-3 flex flex-col justify-center border border-gray-200 dark:border-gray-700";
  const teamNameClasses = "font-medium text-gray-900 dark:text-white truncate";
  const labelClasses = "text-sm text-gray-500 dark:text-gray-400 truncate";

  // Function to render a match box with truncated text
  const renderMatchBox = (label: string, team?: Team | string) => (
    <div className={matchBoxClasses} title={typeof team === "string" ? team : team?.name}>
      <div className={labelClasses}>{label}</div>
      <div className={teamNameClasses}>{typeof team === "string" ? team : team?.name || "TBD"}</div>
    </div>
  );

  // Updated function to render finals box with two teams
  const renderFinalsBox = (topTeam?: Team | string, bottomTeam?: Team | string) => (
    <div className={finalsBoxClasses}>
      <div className="text-sm text-white truncate">Finals</div>
      <div className="font-medium text-white truncate">{typeof topTeam === "string" ? topTeam : topTeam?.name || "TBD"}</div>
      <div className="font-medium text-white truncate">{typeof bottomTeam === "string" ? bottomTeam : bottomTeam?.name || "TBD"}</div>
    </div>
  );

  // Function to render winner box
  const renderWinnerBox = (winner?: Team | string) => (
    <div className={winnerBoxClasses}>
      <div className="text-sm text-gray-900 dark:text-white truncate">👑 Champion</div>
      <div className="font-medium text-gray-900 dark:text-white truncate">
        {typeof winner === "string" ? winner : winner?.name || "TBD"}
      </div>
    </div>
  );

  if (division === 1) {
    // Division 1 Format (5 teams, 3rd seed goes straight to semi-finals)
    return (
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[1000px] flex items-center justify-between gap-4">
          {/* Round 1 (Quarter Finals) */}
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-3">
              {/* Empty space where 3rd vs 6th would be */}
              <div className="w-48 h-40"></div>
            </div>
            <div className="flex flex-col gap-3">
              {renderMatchBox("4th Seed", sortedTeams[3])}
              {renderMatchBox("5th Seed", sortedTeams[4])}
            </div>
          </div>

          {/* Round 2 (Semi Finals) */}
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-3">
              {renderMatchBox("2nd Seed", sortedTeams[1])}
              {renderMatchBox("3rd Seed", sortedTeams[2])}
            </div>
            <div className="flex flex-col gap-3">
              {renderMatchBox("1st Seed", sortedTeams[0])}
              {renderMatchBox("Winner of 4th vs 5th", "TBD")}
            </div>
          </div>

          {/* Finals */}
          <div className="flex flex-col justify-center">{renderFinalsBox()}</div>

          {/* Winner column */}
          <div className="flex flex-col justify-center">{renderWinnerBox()}</div>
        </div>
      </div>
    );
  }

  if (division === 3) {
    // Division 3 Format (4 teams)
    return (
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[1000px] flex items-center justify-between gap-4">
          {/* Round 1 (Semi Finals) */}
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-3">
              {renderMatchBox("4th Seed", sortedTeams[3])}
              {renderMatchBox("1st Seed", sortedTeams[0])}
            </div>
            <div className="flex flex-col gap-3">
              {renderMatchBox("2nd Seed", sortedTeams[1])}
              {renderMatchBox("3rd Seed", sortedTeams[2])}
            </div>
          </div>

          {/* Spacer for alignment */}
          <div className="w-48"></div>

          {/* Finals - now showing the third seed team that advanced */}
          <div className="flex flex-col justify-center">{renderFinalsBox(undefined, sortedTeams[2])}</div>

          {/* Winner column */}
          <div className="flex flex-col justify-center">{renderWinnerBox()}</div>
        </div>
      </div>
    );
  }

  // Original Division 2 Format (6 teams)
  return (
    <div className="p-4 overflow-x-auto">
      <div className="min-w-[1000px] flex items-center justify-between gap-4">
        {/* Round 1 (Quarter Finals) */}
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-3">
            {renderMatchBox("3rd Seed", sortedTeams[2])}
            {renderMatchBox("6th Seed", sortedTeams[5])}
          </div>
          <div className="flex flex-col gap-3">
            {renderMatchBox("4th Seed", sortedTeams[3])}
            {renderMatchBox("5th Seed", sortedTeams[4])}
          </div>
        </div>

        {/* Round 2 (Semi Finals) */}
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-3">
            {renderMatchBox("2nd Seed", sortedTeams[1])}
            {renderMatchBox("Winner of 3rd vs 6th", "TBD")}
          </div>
          <div className="flex flex-col gap-3">
            {renderMatchBox("1st Seed", sortedTeams[0])}
            {renderMatchBox("Winner of 4th vs 5th", "TBD")}
          </div>
        </div>

        {/* Finals */}
        <div className="flex flex-col justify-center">{renderFinalsBox()}</div>

        {/* Winner column */}
        <div className="flex flex-col justify-center">{renderWinnerBox()}</div>
      </div>
    </div>
  );
};
