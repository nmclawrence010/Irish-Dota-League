import React, { useState, useEffect } from "react";
import { useAllTeams } from "../hooks/useAllTeams";
import { fetchImprintTeams, fetchTeamHeroStatistics, fetchPlayerHeroStatistics } from "../services/leaderboardApi";
import { Download } from "lucide-react";
import JSZip from "jszip";

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"production" | "cast">("production");
  const { teams, loading, error } = useAllTeams();
  
  // Imprint teams state
  const [imprintTeams, setImprintTeams] = useState<any[]>([]);
  const [imprintLoading, setImprintLoading] = useState(false);
  const [imprintError, setImprintError] = useState<string | null>(null);
  
  // Hero statistics state
  const [heroStats, setHeroStats] = useState<Record<number, any>>({});
  const [heroLoading, setHeroLoading] = useState<Record<number, boolean>>({});
  
  // Player statistics state
  const [playerStats, setPlayerStats] = useState<Record<number, any>>({});
  const [playerLoading, setPlayerLoading] = useState<Record<number, boolean>>({});
  
  // Team selection state
  const [selectedTeam1, setSelectedTeam1] = useState<number | null>(null);
  const [selectedTeam2, setSelectedTeam2] = useState<number | null>(null);

  // Load Imprint teams when Cast tab is selected
  useEffect(() => {
    if (activeTab === "cast" && imprintTeams.length === 0) {
      const loadImprintTeams = async () => {
        try {
          setImprintLoading(true);
          setImprintError(null);
                     const data = await fetchImprintTeams();
           setImprintTeams(data.teams);
        } catch (err) {
          setImprintError("Failed to load Imprint teams");
          console.error("Error loading Imprint teams:", err);
        } finally {
          setImprintLoading(false);
        }
      };
      
      loadImprintTeams();
    }
  }, [activeTab, imprintTeams.length]);

  // Auto-load hero stats when teams are selected
  useEffect(() => {
    if (selectedTeam1 && !heroStats[selectedTeam1]) {
      fetchHeroStats(selectedTeam1);
    }
    if (selectedTeam2 && !heroStats[selectedTeam2]) {
      fetchHeroStats(selectedTeam2);
    }
  }, [selectedTeam1, selectedTeam2]);

  // Auto-load player stats when teams are selected
  useEffect(() => {
    const loadPlayerStats = async () => {
      const selectedTeams = getFilteredTeams();
      for (const team of selectedTeams) {
        for (const player of team.players) {
          if (!playerStats[player.account_id] && !playerLoading[player.account_id]) {
            await fetchPlayerStats(player.account_id);
          }
        }
      }
    };
    
    if (selectedTeam1 || selectedTeam2) {
      loadPlayerStats();
    }
  }, [selectedTeam1, selectedTeam2, imprintTeams]);

  // Position mapping helper
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

  // Fetch hero statistics for a team
  const fetchHeroStats = async (teamId: number) => {
    if (heroStats[teamId]) return; // Already loaded
    
    setHeroLoading(prev => ({ ...prev, [teamId]: true }));
    try {
      const data = await fetchTeamHeroStatistics(teamId);
      setHeroStats(prev => ({ ...prev, [teamId]: data.hero_statistics }));
    } catch (err) {
      console.error("Error loading hero statistics:", err);
      alert('Failed to load hero statistics. Please try again.');
    } finally {
      setHeroLoading(prev => ({ ...prev, [teamId]: false }));
    }
  };

  // Fetch player statistics for a player
  const fetchPlayerStats = async (accountId: number) => {
    if (playerStats[accountId]) return; // Already loaded
    
    setPlayerLoading(prev => ({ ...prev, [accountId]: true }));
    try {
      const data = await fetchPlayerHeroStatistics(accountId);
      setPlayerStats(prev => ({ ...prev, [accountId]: data }));
    } catch (err) {
      console.error("Error loading player statistics:", err);
      // Don't show alert for player stats as it might be too many
    } finally {
      setPlayerLoading(prev => ({ ...prev, [accountId]: false }));
    }
  };

  // Get filtered teams based on selection
  const getFilteredTeams = () => {
    if (!selectedTeam1 && !selectedTeam2) {
      return [];
    }
    
    const filtered = imprintTeams.filter(team => 
      team.team_id === selectedTeam1 || team.team_id === selectedTeam2
    );
    
    return filtered;
  };

  const downloadImage = async (imageUrl: string, teamName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract file extension from URL
      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length - 1]?.split('?')[0] || 'png';
      
      // Set filename with team name and extension
      const sanitizedTeamName = teamName.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `${sanitizedTeamName}_logo.${extension}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const downloadAllImages = async () => {
    try {
      const zip = new JSZip();
      const teamsWithImages = teams.filter(team => team.image_url);
      
      if (teamsWithImages.length === 0) {
        alert('No team logos available to download.');
        return;
      }

      // Download all images and add to zip
      const downloadPromises = teamsWithImages.map(async (team) => {
        try {
          const response = await fetch(team.image_url!);
          const blob = await response.blob();
          
          // Extract file extension from URL
          const urlParts = team.image_url!.split('.');
          const extension = urlParts[urlParts.length - 1]?.split('?')[0] || 'png';
          
          // Sanitize team name for filename
          const sanitizedTeamName = team.name.replace(/[^a-zA-Z0-9]/g, '_');
          const filename = `${sanitizedTeamName}_logo.${extension}`;
          
          zip.file(filename, blob);
        } catch (error) {
          console.error(`Error downloading ${team.name} logo:`, error);
        }
      });

      await Promise.all(downloadPromises);
      
      // Generate and download zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'all_team_logos.zip';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading all images:', error);
      alert('Failed to download all team logos. Please try again.');
    }
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-idl-light">Admin Dashboard</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-idl-gray rounded-lg p-1 w-fit border border-idl-dark">
        <button
          onClick={() => setActiveTab("production")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "production"
              ? "bg-idl-accent text-white"
              : "bg-transparent text-idl-light hover:text-idl-accent"
          }`}
        >
          Production
        </button>
        <button
          onClick={() => setActiveTab("cast")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "cast"
              ? "bg-idl-accent text-white"
              : "bg-transparent text-idl-light hover:text-idl-accent"
          }`}
        >
          Cast
        </button>
      </div>

      {activeTab === "production" && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm rounded-full bg-idl-accent text-white">
                {teams.length} Teams
              </span>
              <button
                onClick={downloadAllImages}
                className="flex items-center gap-2 px-4 py-2 bg-idl-accent text-white rounded-lg hover:bg-idl-accent/80 transition-colors text-sm font-medium"
                title="Download all team logos"
              >
                <Download size={16} />
                Download All
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-idl-light py-8">Flipping coins...</div>
          ) : teams.length === 0 ? (
            <div className="text-center text-idl-light py-8">
              No teams registered yet
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-idl-gray rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105 border border-idl-dark relative"
                >
                  {/* Download Button - Top Right */}
                  {team.image_url && (
                    <button
                      onClick={() => downloadImage(team.image_url!, team.name)}
                      className="absolute top-2 right-2 p-1 text-idl-accent hover:text-idl-light transition-colors bg-idl-gray/80 rounded-full"
                      title="Download team logo"
                    >
                      <Download size={20} />
                    </button>
                  )}
                  
                  <div className="text-center space-y-4">
                    {/* Team Logo */}
                    <div className="flex justify-center">
                      {team.image_url ? (
                        <img
                          src={team.image_url}
                          alt={`${team.name} logo`}
                          className="w-32 h-32 object-cover rounded-xl border-4 border-idl-accent shadow-lg"
                          onError={(e) => {
                            // Hide the image if it fails to load
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-32 h-32 bg-idl-dark rounded-xl border-4 border-idl-accent flex items-center justify-center shadow-lg">
                          <span className="text-3xl text-idl-light font-bold">
                            {team.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Team Name */}
                    <div>
                      <h2 className="text-lg font-bold text-idl-light truncate" title={team.name}>
                        {team.name}
                      </h2>
                      <p className="text-sm text-idl-accent">Division {team.division_id}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

             {activeTab === "cast" && (
         <>
                       {/* Team Selection Dropdowns */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-idl-light">Team 1:</label>
                <select
                  value={selectedTeam1 || ""}
                  onChange={(e) => setSelectedTeam1(e.target.value ? Number(e.target.value) : null)}
                  className="px-3 py-2 pr-8 bg-idl-dark border border-idl-accent rounded-lg text-idl-light focus:outline-none focus:ring-2 focus:ring-idl-accent"
                >
                  <option value="">All Teams</option>
                  {imprintTeams.map((team) => (
                    <option key={team.team_id} value={team.team_id}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-idl-light">Team 2:</label>
                <select
                  value={selectedTeam2 || ""}
                  onChange={(e) => setSelectedTeam2(e.target.value ? Number(e.target.value) : null)}
                  className="px-3 py-2 pr-8 bg-idl-dark border border-idl-accent rounded-lg text-idl-light focus:outline-none focus:ring-2 focus:ring-idl-accent"
                >
                  <option value="">All Teams</option>
                  {imprintTeams.map((team) => (
                    <option key={team.team_id} value={team.team_id}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          {imprintLoading ? (
            <div className="text-center text-idl-light py-8">Loading teams...</div>
          ) : imprintError ? (
            <div className="text-center text-red-500 py-8">{imprintError}</div>
                     ) : getFilteredTeams().length === 0 ? (
             <div className="text-center text-idl-light py-8">
               {imprintTeams.length === 0 ? "No Imprint teams available" : "No teams match your selection"}
             </div>
                       ) : (
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getFilteredTeams().map((team) => (
                                                   <div
                    key={team.team_id}
                    className="bg-idl-gray rounded-lg shadow-lg p-6 transition-all hover:shadow-xl border border-idl-dark"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Side - Team Data */}
                      <div>
                        {/* Team Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src={team.team_logo_src} 
                            alt={team.team_name} 
                            className="w-12 h-12 rounded object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-idl-light truncate" title={team.team_name}>
                              {team.team_name}
                            </h3>
                            <p className="text-sm text-idl-accent">ID: {team.team_id}</p>
                          </div>
                        </div>

                        {/* Team Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-sm text-idl-light">Wins</p>
                            <p className="text-lg font-bold text-green-400">{team.wins}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-idl-light">Losses</p>
                            <p className="text-lg font-bold text-red-400">{team.losses}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-idl-light">Win Rate</p>
                            <p className="text-lg font-bold text-idl-accent">{team.win_rate}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-idl-light">Rating</p>
                            <p className="text-lg font-bold text-[#46ffd0]">{team.average_team_imprint_rating.toFixed(1)}</p>
                          </div>
                        </div>

                        {/* Players */}
                        <div>
                          <h4 className="text-sm font-semibold text-idl-light mb-2">Players</h4>
                          <div className="space-y-2">
                            {team.players.map((player: any) => (
                              <div key={player.account_id} className="flex items-center justify-between bg-idl-dark rounded p-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={getPositionImage(player.position)}
                                    alt={`Position ${player.position}`}
                                    className="w-4 h-4"
                                    title={`Position ${player.position}`}
                                  />
                                  <span className="text-sm text-idl-light font-medium">
                                    {player.account_name}
                                  </span>
                                </div>
                                <span className="text-xs text-idl-accent">
                                  {player.account_id}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Hero Statistics */}
                      <div>
                        <h4 className="text-sm font-semibold text-idl-light mb-2">Hero Stats</h4>
                        
                                                 {heroLoading[team.team_id] ? (
                           <div className="text-center text-idl-light py-4">Loading hero data...</div>
                         ) : heroStats[team.team_id] ? (
                           <div className="space-y-2">
                             <div className="text-xs text-idl-light bg-idl-dark rounded p-2">
                               <div className="text-center">
                                 <span>Different Heroes: {heroStats[team.team_id].hero_count}</span>
                               </div>
                             </div>
                             
                             {/* Top 10 Heroes */}
                             <div>
                               <h5 className="text-xs font-medium text-idl-light mb-1">Top Heroes</h5>
                                                               <div className="grid grid-cols-2 gap-1">
                                  {heroStats[team.team_id].heroes
                                    .filter((hero: any) => hero.match_count > 1)
                                    .sort((a: any, b: any) => b.match_count - a.match_count)
                                    .slice(0, 10)
                                    .map((hero: any) => {
                                     const mostPlayedPosition = hero.position_tally
                                       .sort((a: any, b: any) => b.match_count - a.match_count)[0];
                                     const positionNames = {
                                       1: "Carry",
                                       2: "Mid",
                                       3: "Offlane", 
                                       4: "Soft Support",
                                       5: "Hard Support"
                                     };
                                     return (
                                                                               <div key={hero.name} className="flex items-center justify-between bg-idl-dark rounded p-1">
                                          <div className="flex items-center gap-1">
                                            <img
                                              src={hero.icon_src}
                                              alt={hero.name}
                                              className="w-8 h-8"
                                              title={hero.name}
                                            />
                                          </div>
                                          <div className="text-right">
                                            <div className="text-xs text-idl-accent">{hero.win_rate}</div>
                                            <div className="text-xs text-gray-400">
                                              {hero.wins}W-{hero.losses}L
                                            </div>
                                            <div className="text-xs text-gray-400">
                                              {positionNames[mostPlayedPosition?.position as keyof typeof positionNames] || "?"}
                                            </div>
                                          </div>
                                        </div>
                                     );
                                   })}
                               </div>
                             </div>
                           </div>
                         ) : (
                           <div className="text-center text-idl-light py-4">No hero data available</div>
                         )}
                      </div>

                     {/* Player Statistics Section - Full Width */}
                     <div className="mt-6 pt-6 border-t border-idl-dark col-span-2">
                       <h4 className="text-sm font-semibold text-idl-light mb-3">Player Stats</h4>
                       <div className="space-y-3">
                         {team.players.map((player: any) => {
                           const playerData = playerStats[player.account_id];
                           const positionNames = {
                             1: "Carry",
                             2: "Mid",
                             3: "Offlane", 
                             4: "Soft Support",
                             5: "Hard Support"
                           };
                           
                           return (
                             <div key={player.account_id} className="bg-idl-dark rounded p-3">
                               {/* Player Header */}
                               <div className="flex items-center gap-2 mb-2">
                                 <img
                                   src={getPositionImage(player.position)}
                                   alt={`Position ${player.position}`}
                                   className="w-4 h-4 flex-shrink-0"
                                   title={`Position ${player.position}`}
                                 />
                                 <div className="flex-1 min-w-0">
                                   <div className="text-sm font-medium text-idl-light truncate">
                                     {player.account_name}
                                   </div>
                                   <div className="text-xs text-idl-accent">
                                     {positionNames[player.position as keyof typeof positionNames]}
                                   </div>
                                 </div>
                                 {playerData && (
                                   <span className="text-xs text-green-400 flex-shrink-0">
                                     {playerData.hero_statistics.match_count} games
                                   </span>
                                 )}
                               </div>

                               {/* Player Hero Stats */}
                               {playerLoading[player.account_id] ? (
                                 <div className="text-center text-idl-light py-2 text-xs">Loading player data...</div>
                               ) : playerData ? (
                                 <div className="space-y-2">
                                   {/* Top 5 Heroes */}
                                    <div className="flex gap-1">
                                      {playerData.hero_statistics.heroes
                                        .sort((a: any, b: any) => b.match_count - a.match_count)
                                        .slice(0, 5)
                                        .map((hero: any) => (
                                         <div key={hero.name} className="bg-idl-gray rounded p-1 text-center flex-1">
                                           <img
                                             src={hero.icon_src}
                                             alt={hero.name}
                                             className="w-6 h-6 mx-auto mb-1"
                                             title={hero.name}
                                           />
                                           <div className="text-xs text-idl-accent">{hero.win_rate}</div>
                                           <div className="text-xs text-gray-400">
                                             {hero.wins}W-{hero.losses}L
                                           </div>
                                           <div className="text-xs text-gray-400">
                                             {hero.average_kills.toFixed(1)}/{hero.average_deaths.toFixed(1)}/{hero.average_assists.toFixed(1)}
                                           </div>
                                         </div>
                                       ))}
                                   </div>
                                 </div>
                               ) : (
                                 <div className="text-center text-idl-light py-2 text-xs">No player data available</div>
                               )}
                             </div>
                           );
                         })}
                       </div>
                     </div>
                    </div>
                  </div>
               ))}
             </div>
          )}
        </>
      )}
    </div>
  );
}; 