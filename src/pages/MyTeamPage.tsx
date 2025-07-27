import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMyTeam } from "../hooks/useMyTeam";
import { useAuth } from "../hooks/useAuth";
import { Copy, Check, X, Edit2, Camera } from "lucide-react";
import { supabase, getSupabaseClient } from "../lib/supabase";
import { Player } from "../types/tournament";
import { ROLES } from "../constants/roles";

export const MyTeamPage: React.FC = () => {
  const { isAuthenticated, user, supabaseToken } = useAuth();
  const { team, loading, error, mutate } = useMyTeam();
  const [copied, setCopied] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [newTeamImage, setNewTeamImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      setNewTeamImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeNewImage = () => {
    setNewTeamImage(null);
    setImagePreview(null);
  };

  const uploadNewImage = async (file: File): Promise<string | null> => {
    if (!supabaseToken) return null;
    
    const authenticatedClient = getSupabaseClient(supabaseToken);
    
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error } = await authenticatedClient.storage
        .from('team-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading image:', error);
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = authenticatedClient.storage
        .from('team-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const deleteOldImage = async (imageUrl: string): Promise<void> => {
    if (!supabaseToken || !imageUrl) return;
    
    const authenticatedClient = getSupabaseClient(supabaseToken);
    
    try {
      // Extract filename from the URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        const { error } = await authenticatedClient.storage
          .from('team-images')
          .remove([fileName]);
        
        if (error) {
          console.error('Error deleting old image:', error);
        }
      }
    } catch (error) {
      console.error('Error deleting old image:', error);
    }
  };

  const handleUpdateTeamImage = async () => {
    if (!team || !isTeamCaptain || !newTeamImage || !supabaseToken) return;

    setIsUploadingImage(true);

    try {
      const imageUrl = await uploadNewImage(newTeamImage);
      
      if (imageUrl) {
        const authenticatedClient = getSupabaseClient(supabaseToken);
        const { error: updateError } = await authenticatedClient
          .from("teams")
          .update({ image_url: imageUrl })
          .eq("id", team.id);

        if (updateError) throw updateError;

        // Delete the old image if it exists
        if (team.image_url) {
          await deleteOldImage(team.image_url);
        }

        // Refresh the team data
        mutate();
        setNewTeamImage(null);
        setImagePreview(null);
        alert('Team logo updated successfully!');
      }
    } catch (err) {
      console.error("Error updating team image:", err);
      alert('Failed to update team logo. Please try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

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
          <div className="flex items-center gap-4 mb-4">
            {team.image_url ? (
              <img
                src={team.image_url}
                alt={`${team.name} logo`}
                className="w-16 h-16 object-cover rounded-full border-2 border-idl-accent"
                onError={(e) => {
                  // Hide the image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-16 h-16 bg-idl-dark rounded-full border-2 border-idl-accent flex items-center justify-center">
                <span className="text-xl text-idl-light font-bold">
                  {team.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-idl-light">{team.name}</h2>
              {isTeamCaptain && (
                <button
                  onClick={() => document.getElementById('team-image-upload')?.click()}
                  className="flex items-center gap-2 text-sm text-idl-accent hover:text-idl-light transition-colors"
                >
                  <Camera size={14} />
                  Change Team Logo
                </button>
              )}
            </div>
          </div>

          {/* Hidden file input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="team-image-upload"
          />

          {/* Image preview and update section */}
          {imagePreview && (
            <div className="mb-4 p-4 bg-idl-dark rounded-lg border border-idl-accent">
              <div className="flex items-center gap-4">
                <img
                  src={imagePreview}
                  alt="New team logo preview"
                  className="w-12 h-12 object-cover rounded-full border border-idl-accent"
                />
                <div className="flex-1">
                  <p className="text-sm text-idl-light">New team logo preview</p>
                  <p className="text-xs text-gray-400">Click update to save changes</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateTeamImage}
                    disabled={isUploadingImage}
                    className="px-3 py-1 bg-idl-accent text-white rounded text-sm hover:bg-idl-accent/80 transition-colors disabled:opacity-50"
                  >
                    {isUploadingImage ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={removeNewImage}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
