import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMyTeam } from "../hooks/useMyTeam";
import { useAuth } from "../hooks/useAuth";
import { Copy, Check, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Player } from "../types/tournament";

export const MyTeamPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { team, loading, error, mutate } = useMyTeam();
  const [copied, setCopied] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleCopyId = async () => {
    if (!team?.id) return;

    try {
      await navigator.clipboard.writeText(team.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const isTeamCaptain = team?.players[0]?.auth_id === user?.sub;

  const handleRemovePlayer = async (playerToRemove: Player) => {
    if (!team || !isTeamCaptain) return;

    try {
      // Filter out the player to remove and stringify remaining players
      const updatedPlayers = team.players
        .filter((player) => player.auth_id !== playerToRemove.auth_id)
        .map((player) => JSON.stringify(player));

      const { error: updateError } = await supabase.from("teams").update({ players: updatedPlayers }).eq("id", team.id);

      if (updateError) throw updateError;

      // Refresh the team data
      mutate();
    } catch (err) {
      console.error("Error removing player:", err);
    }
  };

  const renderEmptySlots = (currentPlayers: number) => {
    const emptySlots = [];
    for (let i = currentPlayers; i < 5; i++) {
      emptySlots.push(
        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-400 dark:text-gray-500">Empty Slot</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">No player assigned</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Unranked</p>
            </div>
          </div>
        </div>
      );
    }
    return emptySlots;
  };

  if (error) {
    return <div className="text-center text-red-500 dark:text-red-400 py-8">Error loading team: {error}</div>;
  }

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400 py-8">Loading team...</div>;
  }

  if (!team) {
    return <div className="text-center text-gray-500 dark:text-gray-400 py-8">You are not part of any team yet</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Team {isTeamCaptain && <span className="text-sm text-indigo-500">(Captain)</span>}
          </h1>
          <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
            Division {team.division_id}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{team.name}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyId}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Team ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Roster</h3>
          {team.players.map((player, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">Name: {player.name}</p>
                  <a
                    href={player.steamProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Steam Profile
                  </a>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Rank: {player.rank}</p>
                </div>
                {isTeamCaptain && index > 0 && (
                  <button
                    onClick={() => handleRemovePlayer(player)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    title="Remove player"
                  >
                    <X size={14} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {renderEmptySlots(team.players.length)}
        </div>
      </div>
    </div>
  );
};
