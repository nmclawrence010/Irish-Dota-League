import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMyTeam } from "../hooks/useMyTeam";
import { useAuth } from "../hooks/useAuth";
import { Copy, Check, X, Edit2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Player } from "../types/tournament";
import { ROLES } from "../constants/roles";

export const MyTeamPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { team, loading, error, mutate } = useMyTeam();
  const [copied, setCopied] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);

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

  const handleAssignRole = async (playerAuthId: string, role: string) => {
    if (!team || !isTeamCaptain) return;

    try {
      // Update the player's role in the team
      const updatedPlayers = team.players.map((player) => {
        if (player.auth_id === playerAuthId) {
          return { ...player, role };
        }
        return player;
      });

      // Stringify the updated players for the database
      const stringifiedPlayers = updatedPlayers.map((player) =>
        JSON.stringify(player)
      );

      const { error: updateError } = await supabase
        .from("teams")
        .update({ players: stringifiedPlayers })
        .eq("id", team.id);

      if (updateError) throw updateError;

      // Refresh the team data
      mutate();
      setEditingRole(null);
    } catch (err) {
      console.error("Error assigning role:", err);
    }
  };

  const handleRemovePlayer = async (playerToRemove: Player) => {
    if (!team || !isTeamCaptain) return;

    const confirmed = window.confirm(
      `Are you sure you want to remove ${playerToRemove.name} from the team?`
    );
    if (!confirmed) return;

    try {
      // Filter out the player to remove and stringify remaining players
      const updatedPlayers = team.players
        .filter((player) => player.auth_id !== playerToRemove.auth_id)
        .map((player) => JSON.stringify(player));

      const { error: updateError } = await supabase
        .from("teams")
        .update({ players: updatedPlayers })
        .eq("id", team.id);

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
        <div
          key={i}
          className="p-3 bg-idl-gray rounded-lg border-2 border-dashed border-idl-accent"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-idl-light">Empty Slot</p>
              <p className="text-sm text-idl-light">No player assigned</p>
              <p className="text-sm text-idl-light">Unranked</p>
            </div>
          </div>
        </div>
      );
    }
    return emptySlots;
  };

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-8">
        Error loading team: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-idl-light py-8">Loading team...</div>
    );
  }

  if (!team) {
    return (
      <div className="text-center text-idl-light py-8">
        You are not part of any team yet
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-idl-gray rounded-lg shadow-md p-6 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-idl-light">
            My Team{" "}
            {isTeamCaptain && (
              <span className="text-sm text-idl-accent">(Captain)</span>
            )}
          </h1>
          <span className="px-3 py-1 text-sm rounded-full bg-idl-accent text-white">
            Division {team.division_id}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-idl-light mb-2">{team.name}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyId}
              className="flex items-center space-x-2 px-4 py-2 bg-idl-accent text-white rounded-lg hover:bg-idl-accent/80 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Team Invite Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-idl-light">Roster</h3>
          {team.players.map((player, index) => (
            <div
              key={index}
              className="p-4 bg-idl-gray rounded-lg border border-idl-accent"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-sm text-idl-light">
                    Name: {player.name}
                  </p>
                  <a
                    href={player.steamProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-idl-accent hover:underline"
                  >
                    Steam Profile
                  </a>
                  <p className="text-xs text-idl-light">Rank: {player.rank}</p>

                  {/* Role Assignment */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-idl-light">Role:</span>
                    {isTeamCaptain && editingRole === player.auth_id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={player.role || ""}
                          onChange={(e) =>
                            handleAssignRole(player.auth_id!, e.target.value)
                          }
                          className="text-xs px-2 py-1 bg-idl-light border border-gray-300 rounded text-gray-900"
                        >
                          <option value="">Select Role</option>
                          {ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => setEditingRole(null)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-idl-accent text-white rounded">
                          {player.role || "Unassigned"}
                        </span>
                        {isTeamCaptain && (
                          <button
                            onClick={() => setEditingRole(player.auth_id!)}
                            className="text-xs text-idl-accent hover:text-idl-light"
                            title="Edit role"
                          >
                            <Edit2 size={12} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
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
