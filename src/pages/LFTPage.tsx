import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { LFTForm } from "../components/LFTForm";
import { useLFTPlayers } from "../hooks/useLFTPlayers";
import { useAuth } from "../hooks/useAuth";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { supabase } from "../lib/supabase";

export const LFTPage: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { players, loading, error, mutate } = useLFTPlayers();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <div className="text-center text-idl-light py-8">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleRemovePlayer = async (playerId: string) => {
    if (!user?.sub) return;

    const confirmed = window.confirm("Are you sure you want to remove yourself from the LFT list?");
    if (!confirmed) return;

    try {
      const { error: deleteError } = await supabase.from("lft_players").delete().eq("id", playerId);

      if (deleteError) throw deleteError;

      // Refresh the players list
      mutate();
    } catch (err) {
      console.error("Error removing LFT entry:", err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center space-x-2 bg-idl-accent hover:bg-idl-accent/80 text-idl-light py-3 px-6 rounded-lg transition-colors text-lg font-medium"
        >
          <span>{showForm ? "Hide Registration Form" : "Register as LFT"}</span>
          {showForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div className={`transition-all duration-300 ease-in-out ${showForm ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
          <LFTForm onSubmitSuccess={() => setShowForm(false)} />
        </div>
      </div>

      <div className="bg-idl-gray rounded-lg shadow-md p-6 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-idl-light">Players Looking for Team</h2>

        {error ? (
          <div className="text-center text-red-500 dark:text-red-400 py-4">Error loading players: {error}</div>
        ) : loading ? (
          <div className="text-center text-idl-light py-4">Loading players...</div>
        ) : players.length === 0 ? (
          <div className="text-center text-idl-light py-4">No players currently looking for team</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-idl-gray">
                  <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Steam Profile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Roles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-idl-light uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-idl-gray divide-y divide-idl-light">
                {players.map((player) => (
                  <tr key={player.id} className="hover:bg-idl-dark transition-colors relative group rounded-lg">
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-idl-light first:rounded-l-lg">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-idl-light">
                      <a href={player.steamProfile} target="_blank" rel="noopener noreferrer" className="text-idl-accent hover:underline">
                        Steam Profile
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-idl-light">{player.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-idl-light">
                      <div className="flex flex-wrap gap-1">
                        {player.roles.map((role) => (
                          <span key={role} className="px-2 py-1 text-sm rounded-full bg-idl-accent text-white">
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-base text-idl-light pr-12 last:rounded-r-lg">
                      {player.notes}
                      {user?.sub === player.auth_id && (
                        <button
                          onClick={() => handleRemovePlayer(player.id)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-red-500 hover:text-idl-accent hover:bg-red-500 transition-all transform hover:scale-110"
                          title="Remove yourself from LFT"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
