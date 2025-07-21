import React from "react";
import { Team } from "@/types/tournament";
import { SeasonFiveKnockoutBracket } from "./SeasonFiveKnockoutBracket";

interface KnockoutBracketProps {
  teams: Team[];
  division?: number;
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = ({ teams, division = 1 }) => {
  return <SeasonFiveKnockoutBracket teams={teams} division={division} />;
};
