import React, { useEffect, useState } from "react";
import { fetchMatchDetails } from "@/services/matchApi";

interface MatchStatsProps {
  matchId: string;
  dota2MatchId: string;
}

export const MatchStats: React.FC<MatchStatsProps> = ({ dota2MatchId }) => {
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatchData = async () => {
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
  }, [dota2MatchId]);

  if (loading) return <div className="text-center py-4">Loading match details...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!matchData) return null;

  const team1Players = matchData.teams[0]?.players || [];
  const team2Players = matchData.teams[1]?.players || [];

  return (
    <div className="grid grid-cols-2 gap-8 px-4">
      {/* Team 1 */}
      <div>
        <div className="space-y-2">
          {team1Players.map((player: any) => (
            <div key={player.account_id} className="flex items-center justify-end gap-2">
              <span className="text-sm text-gray-900 dark:text-white">{player.account_name}</span>
              <div className="w-7 h-7 rounded-lg bg-[#1d1d1b] flex items-center justify-center">
                <span className="text-sm font-medium text-[#46ffd0]">{Math.round(player.imprint_rating)}</span>
              </div>
              <img src={player.hero.static_portrait_src} alt={player.hero.Name} className="w-12 h-8 object-cover rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Team 2 */}
      <div>
        <div className="space-y-2">
          {team2Players.map((player: any) => (
            <div key={player.account_id} className="flex items-center gap-2">
              <img src={player.hero.static_portrait_src} alt={player.hero.Name} className="w-12 h-8 object-cover rounded" />
              <div className="w-7 h-7 rounded-lg bg-[#1d1d1b] flex items-center justify-center">
                <span className="text-sm font-medium text-[#46ffd0]">{Math.round(player.imprint_rating)}</span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white">{player.account_name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
