import React from "react";
import { useSeasonFourTeams } from "../hooks/useSeasonFourTeams";
import { Trophy } from "lucide-react";

const getRankImage = (rank: string) => {
  const rankToImage: { [key: string]: string } = {
    Herald: "/herald.png",
    Guardian: "/guardian.png",
    Crusader: "/crusader.png",
    Archon: "/archon.png",
    Legend: "/legend.png",
    Ancient: "/ancient.png",
    Divine: "/divine.png",
    Immortal: "/immortal.png",
  };

  return rankToImage[rank] || "/unranked.png";
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const SeasonFourRostersPage: React.FC = () => {
  const { teams, loading, error } = useSeasonFourTeams();

  const renderEmptySlots = (currentPlayers: number) => {
    const emptySlots = [];
    for (let i = currentPlayers; i < 5; i++) {
      emptySlots.push(
        <div
          key={i}
          className="h-[76px] p-2 bg-idl-gray rounded-lg border border-dashed border-idl-dark"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="font-medium text-sm text-idl-light">Empty Slot</p>
              <p className="text-xs text-idl-light">No player assigned</p>
            </div>
            <img
              src="/unranked.png"
              alt="Unranked"
              className="w-14 h-14 object-contain"
            />
          </div>
        </div>
      );
    }
    return emptySlots;
  };

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-8">
        Error loading teams: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-idl-light">
        Season 4 Team Rosters
      </h1>

      {loading ? (
        <div className="text-center text-idl-light py-8">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="text-center text-idl-light py-8">
          No teams registered yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-idl-gray rounded-lg shadow-md p-4 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2
                    className="text-lg font-bold text-idl-light cursor-default"
                    title={team.name}
                  >
                    {truncateText(team.name, 20)}
                  </h2>
                  {team.name === "Wongs Bakery 麵包店" && (
                    <Trophy
                      size={18}
                      className="text-yellow-500 dark:text-yellow-400"
                      aria-label="Defending Champions"
                    />
                  )}
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-idl-accent text-white">
                  Div {team.division_id}
                </span>
              </div>

              <div className="space-y-2">
                {team.players &&
                  team.players.map((player, index) => (
                    <div
                      key={index}
                      className="h-[76px] p-2 bg-idl-gray rounded-lg border border-idl-dark"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-idl-light">
                              {player.name}
                            </p>
                            {player.role && (
                              <span className="text-xs px-2 py-1 bg-idl-accent text-white rounded">
                                {player.role}
                              </span>
                            )}
                          </div>
                          <a
                            href={player.steamProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-idl-accent hover:underline"
                          >
                            Steam Profile
                          </a>
                        </div>
                        <img
                          src={getRankImage(player.rank)}
                          alt={player.rank}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    </div>
                  ))}
                {team.players && renderEmptySlots(team.players.length)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
