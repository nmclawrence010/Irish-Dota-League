import React, { useState } from "react";
import { useTournamentStore } from "../store/tournamentStore";
import { getSupabaseClient } from "../lib/supabase";
// import { Player } from "../types/tournament";
import { useAuth } from "../hooks/useAuth";
import { useMyTeam } from "../hooks/useMyTeam";
import { CheckCircle2, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";

interface AddTeamFormProps {
  divisionId: number;
}

interface PlayerFormData {
  name: string;
  steamProfile: string;
  rank: string;
  auth_id?: string;
  country?: string;
}

const initialPlayerState: PlayerFormData = {
  name: "",
  steamProfile: "",
  rank: "",
};

const getCountry = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data.country_name;
  } catch (error) {
    console.error("Error getting country:", error);
    return "Unknown";
  }
};

export const AddTeamForm: React.FC<AddTeamFormProps> = ({ divisionId }) => {
  const [teamName, setTeamName] = useState("");
  const [player, setPlayer] = useState<PlayerFormData>(initialPlayerState);
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const addTeam = useTournamentStore((state) => state.addTeam);
  const { user, supabaseToken } = useAuth();
  const { team: existingTeam, loading } = useMyTeam();

  const ADMIN_ID = "google-oauth2|116693036538557171023";
  const isAdmin = user?.sub === ADMIN_ID;

  const handlePlayerChange = (field: keyof PlayerFormData, value: string) => {
    setPlayer((currentPlayer) => ({
      ...currentPlayer,
      [field]: value,
    }));
  };

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

      setTeamImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setTeamImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
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

  // Show loading state while checking team membership
  if (loading) {
    return <div className="text-center text-idl-light py-8">Loading...</div>;
  }

  // Only show the "already on team" message if user is not admin
  if (existingTeam && !isAdmin) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-idl-gray rounded-lg shadow-lg p-8 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-idl-light">Already on a Team</h2>
          <p className="text-idl-light mb-6">
            You are already a member of team "{existingTeam.name}". You cannot register a new team while being a member of another team.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user?.sub || !supabaseToken || !teamImage) return;

    setIsSubmitting(true);

    try {
      const country = await getCountry();
      const authenticatedClient = getSupabaseClient(supabaseToken);

      // Upload image if selected
      let imageUrl = null;
      if (teamImage) {
        imageUrl = await uploadImage(teamImage);
      }

      const playerWithAuthId = {
        ...player,
        auth_id: user.sub,
        country: country,
      };

      const newTeam = {
        name: teamName,
        players: [JSON.stringify(playerWithAuthId)],
        points: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        division_id: divisionId,
        image_url: imageUrl, // Add image URL to team data
      };

      const { data, error } = await authenticatedClient.from("teams").insert([newTeam]).select().single();

      if (error) throw error;
      if (data) {
        addTeam(divisionId, data);
        setTeamName("");
        setPlayer(initialPlayerState);
        setTeamImage(null);
        setImagePreview(null);
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Error adding team:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-idl-gray rounded-lg shadow-lg p-8 transition-colors">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-idl-accent" />
            </div>
            <h2 className="text-2xl font-bold text-idl-light">Team Successfully Registered!</h2>
            <p className="text-idl-light">
              Your team has been registered for the Irish Dota League. You can now view your team details and manage your roster.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <Link
                to="/my-team"
                className="bg-idl-accent hover:bg-idl-accent/80 text-idl-light px-6 py-3 rounded-lg transition-colors font-medium"
              >
                View My Team
              </Link>
              <Link
                to="/"
                className="bg-idl-accent hover:bg-idl-accent/80 text-idl-light px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ranks = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"];

  const inputClasses =
    "w-full px-4 py-2 bg-idl-light border-2 border-gray-300 rounded-lg focus:border-idl-accent focus:ring-2 focus:ring-idl-accent outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400";
  const selectClasses =
    "w-full px-4 py-2 bg-idl-light border-2 border-gray-300 rounded-lg focus:border-idl-accent focus:ring-2 focus:ring-idl-accent outline-none transition-colors duration-200 text-gray-900";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-idl-gray rounded-lg shadow-lg p-8 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-idl-light">Team Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">Team Name</label>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} className={inputClasses} required />
          </div>

          {/* Team Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">
              Team Logo <span className="text-red-400">*</span>
            </label>
            <div className="space-y-4">
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-idl-accent transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="team-image-upload"
                    required
                  />
                  <label htmlFor="team-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-idl-light mb-2">Click to upload team logo</p>
                    <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Team logo preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-idl-light">Captain's Details</h3>
            <div className="bg-idl-gray p-6 rounded-lg space-y-4 border-2 border-idl-accent">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-idl-light mb-2">Name</label>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handlePlayerChange("name", e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-idl-light mb-2">Steam Profile URL</label>
                  <input
                    type="url"
                    value={player.steamProfile}
                    onChange={(e) => handlePlayerChange("steamProfile", e.target.value)}
                    className={inputClasses}
                    placeholder="https://steamcommunity.com/id/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-idl-light mb-2">Rank</label>
                  <div className="relative">
                    <select
                      value={player.rank}
                      onChange={(e) => handlePlayerChange("rank", e.target.value)}
                      className={selectClasses}
                      required
                    >
                      <option value="">Select Rank</option>
                      {ranks.map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-idl-light">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !teamImage}
              className={`w-full py-4 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-colors text-lg font-medium ${
                isSubmitting || !teamImage
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-idl-accent text-white hover:bg-idl-accent/80 focus:ring-idl-accent"
              }`}
            >
              {isSubmitting ? "Registering Team..." : !teamImage ? "Please upload a team logo" : "Register Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
