import React, { useState } from "react";
import { useTeams } from "../hooks/useTeams";
import { clsx } from "clsx";
// import { Team } from "@/types/tournament";
import { MatchList } from "@/components/MatchList";
import { Twitch } from "lucide-react";
import { DiscordIcon } from "@/components/DiscordIcon";
// import { KnockoutBracket } from "@/components/KnockoutBracket";
// import { LoadingSpinner } from "@/components/LoadingSpinner";

export const HomePage: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState(2);
  const [selectedPhase, setSelectedPhase] = useState<"league" | "knockout">("league");
  useTeams(selectedDivision);

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

        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-3xl font-bold text-idl-light mb-4">Season 5 starts: 8/6/2025</h2>
          <a
            href="https://discord.gg/fErrveaumv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-idl-accent hover:text-idl-light transition-all duration-300"
          >
            <DiscordIcon />
            <span>Join the Discord</span>
          </a>
        </div>
      </div>

      <div className="bg-idl-gray rounded-lg shadow-md overflow-hidden">
        <div className="pl-6 pt-4 pb-2 relative">
          <h2 className="text-2xl font-bold text-idl-light">Upcoming Matches</h2>
          <a
            href="https://www.twitch.tv/dota2ireland"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-14 md:-right-20 mt-1 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 text-sm md:text-base text-idl-light hover:text-idl-accent transition-colors"
          >
            Games will be live over at <Twitch size={20} className="text-idl-accent" />
          </a>
        </div>
        <MatchList />
      </div>
    </div>
  );
};
