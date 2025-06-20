import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, X, Globe } from "lucide-react";
import { fetchLeaderboard } from "../services/leaderboardApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Player {
  account_id: number;
  account_name: string;
  team: {
    team_id: number;
    team_name: string;
    team_logo_src: string;
  };
  position: number;
  average_imprint_rating: number;
  wins: number;
  losses: number;
  win_rate: string;
}

// Add position mapping helper - simplified to only use light mode images
const getPositionImage = (position: number): string => {
  const positionMap: Record<number, string> = {
    1: "/Carry.png",
    2: "/Middle.png",
    3: "/Offlane.png",
    4: "/SoftSupport.png",
    5: "/HardSupport.png",
  };
  return positionMap[position] || "";
};

export const ImprintPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setPlayers(data.players.sort((a, b) => b.average_imprint_rating - a.average_imprint_rating));
      } catch (err) {
        setError("Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="rounded-lg p-[1px] animate-background-pulse overflow-hidden">
        <div className="bg-idl-imprintDark rounded-lg shadow-lg p-8 transition-colors relative">
          <div
            className="absolute inset-0 rounded-lg border-2 border-transparent animate-border-rotate"
            style={{ borderImageSlice: 1 }}
          ></div>
          <div className="relative">
            <div className="text-center space-y-6 mb-8">
              <h1 className="text-4xl font-display font-black text-idl-imprint tracking-widest drop-shadow-[0_4px_8px_rgba(70,255,208,0.3)] transform hover:scale-105 transition-all duration-300">
                Imprint Leaderboard
              </h1>
              {/* Social links section */}
              <div className="flex flex-wrap justify-center gap-6 pt-4 pb-4">
                <a
                  href="https://imprint.gg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-idl-light hover:text-[#46ffd0] transition-colors"
                >
                  <Globe size={24} />
                  <span className="font-medium">Check out our new website</span>
                </a>

                <a
                  href="https://x.com/ImprintEsports_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-idl-light hover:text-[#46ffd0] transition-colors"
                >
                  <X size={24} />
                  <span className="font-medium">Follow us on X</span>
                </a>

                <a
                  href="https://www.instagram.com/ImprintEsports/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-idl-light hover:text-pink-500 transition-colors"
                >
                  <Instagram size={24} />
                  <span className="font-medium">Follow us on Instagram</span>
                </a>

                <a
                  href="https://www.facebook.com/people/Imprint-Esports/61563195342615/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-idl-light hover:text-blue-600 transition-colors"
                >
                  <Facebook size={24} />
                  <span className="font-medium">Follow us on Facebook</span>
                </a>

                <a
                  href="https://www.linkedin.com/company/imprintesports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-idl-light hover:text-blue-700 transition-colors"
                >
                  <Linkedin size={24} />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-idl-imprintDark">
                        <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Player</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Position</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Team</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Win Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-idl-imprintDark divide-y divide-idl-accent">
                      {players.map((player, index) => (
                        <tr
                          key={player.account_id}
                          className={`hover:bg-[#2a2a28] transition-colors ${index === 0 ? "border-t border-idl-accent" : ""}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-idl-light">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-idl-light">{player.account_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <img
                              src={getPositionImage(player.position)}
                              alt={`Position ${player.position}`}
                              className="w-6 h-6 inline-block"
                              title={`Position ${player.position}`}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-[#46ffd0]">
                            {player.average_imprint_rating.toFixed(1)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-idl-light">
                            <div className="flex items-center gap-2">
                              <img src={player.team.team_logo_src} alt={player.team.team_name} className="w-6 h-6 object-contain" />
                              {player.team.team_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-idl-light">
                            {player.win_rate} ({player.wins}/{player.losses})
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* <div className="text-2xl font-semibold text-idl-light">Season 5 Coming Soon</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
