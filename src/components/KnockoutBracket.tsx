import React from "react";
import { Team } from "@/types/tournament";

interface KnockoutBracketProps {
  teams: Team[];
  division?: number;
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = () => {
  return (
    <div className="w-full h-[600px] bg-[#0D1B2A] dark:bg-[#0D1B2A] rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-white mb-4">Season 5 Coming Soon</h2>
    </div>
  );
};
