import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, X } from "lucide-react";
import { fetchLeaderboard } from "../services/leaderboardApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Player {
  account_id: number;
  account_name: string;
  primary_team: {
    team_id: number;
    team_name: string;
    team_logo_src: string;
  };
  primary_position: number;
  average_imprint_rating: number;
  wins: number;
  losses: number;
  win_rate: string;
}

// Add position mapping helper
const getPositionImage = (position: number, isDarkMode: boolean): string => {
  const positionMap: Record<number, string> = {
    1: isDarkMode ? "/Carry.png" : "/CarryLight.png",
    2: isDarkMode ? "/Middle.png" : "/MiddleLight.png",
    3: isDarkMode ? "/Offlane.png" : "/OfflaneLight.png",
    4: isDarkMode ? "/SoftSupport.png" : "/SoftSupportLight.png",
    5: isDarkMode ? "/HardSupport.png" : "/HardSupportLight.png",
  };
  return positionMap[position] || "";
};

export const ImprintPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setPlayers(
          data.players.sort(
            (a, b) => b.average_imprint_rating - a.average_imprint_rating
          )
        );
      } catch (err) {
        setError("Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
        <div className="text-center space-y-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Imprint Leaderboard
          </h1>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Win Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {players.map((player, index) => (
                    <tr
                      key={player.account_id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {player.account_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <img
                          src={getPositionImage(
                            player.primary_position,
                            isDarkMode
                          )}
                          alt={`Position ${player.primary_position}`}
                          className="w-6 h-6 inline-block"
                          title={`Position ${player.primary_position}`}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-[#46ffd0]">
                        {player.average_imprint_rating.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <img
                            src={player.primary_team.team_logo_src}
                            alt={player.primary_team.team_name}
                            className="w-6 h-6 object-contain"
                          />
                          {player.primary_team.team_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 dark:text-white">
                        {player.win_rate} ({player.wins}/{player.losses})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Social links section */}
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <a
            href="https://x.com/ImprintEsports_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <X size={24} />
            <span className="font-medium">Follow us on X</span>
          </a>

          <a
            href="https://www.instagram.com/ImprintEsports/#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
          >
            <Instagram size={24} />
            <span className="font-medium">Follow us on Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/people/Imprint-Esports/61563195342615/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
          >
            <Facebook size={24} />
            <span className="font-medium">Follow us on Facebook</span>
          </a>

          <a
            href="https://www.linkedin.com/company/imprintesports/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
          >
            <Linkedin size={24} />
            <span className="font-medium">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};
