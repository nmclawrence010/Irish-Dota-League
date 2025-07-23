import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, X, Globe } from "lucide-react";
import { fetchLeaderboard, fetchHeroStatistics } from "../services/leaderboardApi";
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
  match_count: number;
}

interface HeroFacet {
  name: string;
  icon_src: string;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_imprint_rating: number;
}

interface HeroPosition {
  position: number;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_imprint_rating: number;
}

interface Hero {
  name: string;
  raw_name: string;
  live_portrait_src: string;
  icon_src: string;
  static_portrait_src: string;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_kills: number;
  average_deaths: number;
  average_assists: number;
  average_net_worth: number;
  average_hero_damage: number;
  average_gpm: number;
  average_xpm: number;
  average_imprint_rating: number;
  facet_tally: HeroFacet[];
  position_tally: HeroPosition[];
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
  const [activeTab, setActiveTab] = useState<"leaderboard" | "heroes">("leaderboard");
  const [players, setPlayers] = useState<Player[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (activeTab === "leaderboard") {
          const data = await fetchLeaderboard();
          const filteredPlayers = data.players
            .filter((player) => player.match_count >= 3)
            .sort((a, b) => b.average_imprint_rating - a.average_imprint_rating);
          setPlayers(filteredPlayers);
        } else {
          const data = await fetchHeroStatistics();
          setHeroes(data.hero_statistics.heroes.sort((a, b) => b.match_count - a.match_count));
        }
      } catch (err) {
        setError(`Failed to load ${activeTab} data`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  const renderLeaderboard = () => (
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
          {/* Bl1nkz row */}
          <tr className="hover:bg-[#2a2a28] transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-idl-light">{players.length + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-idl-light">Bl1nkz</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              <img
                src={getPositionImage(2)}
                alt="Position 2"
                className="w-6 h-6 inline-block"
                title="Position 2"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-[#46ffd0]">
              -5.2
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-idl-light">
              <div className="flex items-center gap-2">
                <img src="/archon.png" alt="Waterford, Ireland" className="w-6 h-6 object-contain" />
                <span>Waterford, Ireland</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-idl-light">
              0% (0/87)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // Helper functions to get most popular position and facet
  const getMostPopularPosition = (hero: Hero) => {
    if (!hero.position_tally || hero.position_tally.length === 0) return null;
    return hero.position_tally.reduce((prev, current) => (current.match_count > prev.match_count ? current : prev));
  };

  const getMostPopularFacet = (hero: Hero) => {
    if (!hero.facet_tally || hero.facet_tally.length === 0) return null;
    return hero.facet_tally.reduce((prev, current) => (current.match_count > prev.match_count ? current : prev));
  };

  const renderHeroStats = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-idl-imprintDark">
            <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Hero</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Matches</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Win Rate</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Avg Rating</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-idl-light uppercase tracking-wider">Facet</th>
          </tr>
        </thead>
        <tbody className="bg-idl-imprintDark divide-y divide-idl-accent">
          {heroes.map((hero, index) => {
            const mostPopularPosition = getMostPopularPosition(hero);
            const mostPopularFacet = getMostPopularFacet(hero);

            return (
              <tr key={hero.raw_name} className={`hover:bg-[#2a2a28] transition-colors ${index === 0 ? "border-t border-idl-accent" : ""}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-idl-light">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-idl-light">
                  <div className="flex items-center gap-3">
                    <img src={hero.icon_src} alt={hero.name} className="w-8 h-8 rounded" title={hero.name} />
                    <span className="font-medium">{hero.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-idl-light">{hero.match_count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-idl-light">
                  <span className={hero.wins > hero.losses ? "text-green-400" : "text-red-400"}>{hero.win_rate}</span>
                  <div className="text-xs text-gray-400">
                    ({hero.wins}W/{hero.losses}L)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-[#46ffd0]">
                  {hero.average_imprint_rating.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  {mostPopularPosition ? (
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={getPositionImage(mostPopularPosition.position)}
                        alt={`Position ${mostPopularPosition.position}`}
                        className="w-6 h-6"
                        title={`Position ${mostPopularPosition.position}`}
                      />
                      <span className="text-xs text-gray-400">{mostPopularPosition.match_count}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  {mostPopularFacet ? (
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={mostPopularFacet.icon_src}
                        alt={mostPopularFacet.name}
                        className="w-6 h-6 rounded"
                        title={mostPopularFacet.name}
                      />
                      <span className="text-xs text-gray-400">{mostPopularFacet.match_count}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="rounded-lg p-[1px] overflow-hidden">
        <div className="bg-idl-imprintDark rounded-lg shadow-lg p-8 transition-colors relative">
          <div className="relative">
            <div className="text-center space-y-6 mb-8">
              <h1 className="text-4xl font-display pt-4 font-black text-idl-imprint tracking-widest drop-shadow-[0_4px_8px_rgba(70,255,208,0.3)] transform hover:scale-105 transition-all duration-300">
                Imprint Leaderboard
              </h1>

              {/* Tab Navigation */}
              <div className="flex justify-center space-x-1 bg-idl-imprintDark rounded-lg p-1 w-fit mx-auto border border-idl-imprint">
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors border ${
                    activeTab === "leaderboard"
                      ? "bg-idl-imprint text-gray-900 border-idl-imprint"
                      : "bg-idl-imprintDark text-idl-light hover:text-idl-imprint border-idl-imprintDark"
                  }`}
                >
                  Players
                </button>
                <button
                  onClick={() => setActiveTab("heroes")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors border ${
                    activeTab === "heroes"
                      ? "bg-idl-imprint text-gray-900 border-idl-imprint"
                      : "bg-idl-imprintDark text-idl-light hover:text-idl-imprint border-idl-imprintDark"
                  }`}
                >
                  Heroes
                </button>
              </div>

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
              ) : activeTab === "leaderboard" ? (
                renderLeaderboard()
              ) : (
                renderHeroStats()
              )}
              {/* <div className="text-2xl font-semibold text-idl-light">Season 5 Coming Soon</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
