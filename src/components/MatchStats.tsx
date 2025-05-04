import React, { useEffect, useState } from "react";
import { fetchMatchDetails } from "@/services/matchApi";

interface MatchStatsProps {
  matchId: string;
  dota2MatchId: string;
  isExpanded: boolean;
}

export const MatchStats: React.FC<MatchStatsProps> = ({ dota2MatchId, isExpanded }) => {
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatchData = async () => {
      if (!isExpanded || !dota2MatchId) return;

      try {
        setLoading(true);
        const data = await fetchMatchDetails(dota2MatchId);
        setMatchData(data);
      } catch (err) {
        setError("Failed to load match data");
      } finally {
        setLoading(false);
      }
    };

    loadMatchData();
  }, [dota2MatchId, isExpanded]);

  if (!isExpanded) return null;
  if (loading)
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#46ffd0]"></div>
      </div>
    );
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!matchData) return null;

  const team1Players = matchData.teams[0]?.players || [];
  const team2Players = matchData.teams[1]?.players || [];

  // Helper function to truncate long names
  const truncateName = (name: string, limit: number = 15): string => {
    return name.length > limit ? `${name.substring(0, limit)}...` : name;
  };

  // Find highest imprint rating from all players
  const allPlayers = [...team1Players, ...team2Players];
  const highestRating = Math.max(...allPlayers.map((player) => player.imprint_rating));

  const isMVP = (rating: number) => rating === highestRating;

  return (
    <div className="block md:grid md:grid-cols-2 gap-8 px-4">
      {/* Team 1 */}

      <div className="divide-y divide-idl-accent">
        {team1Players.map((player: any) => (
          <div key={player.account_id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center md:justify-end justify-between relative">
              <div className="block md:flex gap-1 md:absolute relative md:-left-56">
                {player.items?.map(
                  (item: any, index: number) =>
                    item?.icon_src && (
                      <img
                        key={index}
                        src={item.icon_src}
                        alt={item.Name || "Item"}
                        title={item.Name || "Item"}
                        className="w-8 h-8 object-contain rounded"
                      />
                    )
                ) || null}
              </div>
              <span className="text-base font-semibold text-idl-light block md:absolute -left-0 w-20 text-center md:text-right">
                {player.kills}-{player.deaths}-{player.assists}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-base text-center md:text-left ${
                    isMVP(player.imprint_rating) ? "text-[#46ffd0] font-semibold flex items-center gap-1" : "text-idl-light"
                  }`}
                  title={player.account_name}
                >
                  {truncateName(player.account_name)}
                  {isMVP(player.imprint_rating) && (
                    <span className="text-[#46ffd0]" title="MVP">
                      👑
                    </span>
                  )}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#1d1d1b] flex items-center justify-center">
                  <span className="text-base font-medium text-[#46ffd0]">{Math.round(player.imprint_rating)}</span>
                </div>
                <img src={player.hero.static_portrait_src} alt={player.hero.Name} className="w-14 h-10 object-cover rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team 2 */}
      <div className="divide-y divide-idl-accent">
        {team2Players.map((player: any) => (
          <div key={player.account_id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center md:justify-start justify-between relative">
              <div className="flex items-center gap-2">
                <img src={player.hero.static_portrait_src} alt={player.hero.Name} className="w-14 h-10 object-cover rounded" />
                <div className="w-8 h-8 rounded-lg bg-[#1d1d1b] flex items-center justify-center">
                  <span className="text-base font-medium text-[#46ffd0]">{Math.round(player.imprint_rating)}</span>
                </div>
                <span
                  className={`text-center md:text-right ${
                    isMVP(player.imprint_rating) ? "text-[#46ffd0] font-semibold flex items-center gap-1" : "text-idl-light"
                  }`}
                  title={player.account_name}
                >
                  {truncateName(player.account_name)}
                  {isMVP(player.imprint_rating) && (
                    <span className="text-[#46ffd0]" title="MVP">
                      👑
                    </span>
                  )}
                </span>
              </div>

              <span className="text-base font-semibold text-idl-light block md:absolute -right-0 w-20 text-center md:text-left">
                {player.kills}-{player.deaths}-{player.assists}
              </span>

              <div className="block md:flex gap-1 md:absolute relative md:-right-56">
                {player.items?.map(
                  (item: any, index: number) =>
                    item?.icon_src && (
                      <img
                        key={index}
                        src={item.icon_src}
                        alt={item.Name || "Item"}
                        title={item.Name || "Item"}
                        className="w-8 h-8 object-contain rounded"
                      />
                    )
                ) || null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
