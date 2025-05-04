import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { useMyTeam } from "../hooks/useMyTeam";

interface LFTFormData {
  name: string;
  steamProfile: string;
  rank: string;
  notes: string;
  roles: string[];
}

const initialFormState: LFTFormData = {
  name: "",
  steamProfile: "",
  rank: "",
  notes: "",
  roles: [],
};

const ROLES = ["Carry", "Mid", "Offlane", "Soft Support", "Hard Support"] as const;

interface LFTFormProps {
  onSubmitSuccess?: () => void;
}

export const LFTForm: React.FC<LFTFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<LFTFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { team: existingTeam, loading: checkingTeam } = useMyTeam();

  const handleChange = (field: keyof Omit<LFTFormData, "roles">, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleRoleToggle = (role: string) => {
    setFormData((current) => ({
      ...current,
      roles: current.roles.includes(role) ? current.roles.filter((r) => r !== role) : [...current.roles, role],
    }));
  };

  const ranks = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"];

  // Show loading state while checking team membership
  if (checkingTeam) {
    return <div className="text-center text-idl-light py-8">Loading...</div>;
  }

  // Don't allow reg if already on a team
  if (existingTeam) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-idl-gray rounded-lg shadow-lg p-8 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-idl-light">Already on a Team</h2>
          <p className="text-idl-light mb-6">You cannot register as LFT while being a member of a team.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user?.sub || formData.roles.length === 0) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from("lft_players").insert([
        {
          ...formData,
          auth_id: user.sub,
        },
      ]);

      if (submitError) throw submitError;

      setFormData(initialFormState);
      alert("Successfully registered as LFT!");
      onSubmitSuccess?.();
    } catch (err) {
      console.error("Error registering as LFT:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2 bg-idl-light border-2 border-gray-300 rounded-lg focus:border-idl-accent focus:ring-2 focus:ring-idl-accent outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400";
  const selectClasses =
    "w-full px-4 py-2 bg-idl-light border-2 border-gray-300 rounded-lg focus:border-idl-accent focus:ring-2 focus:ring-idl-accent outline-none transition-colors duration-200 text-gray-900";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-idl-gray rounded-lg shadow-lg p-8 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-idl-light">Register as Looking for Team</h2>

        {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">Steam Profile URL</label>
            <input
              type="url"
              value={formData.steamProfile}
              onChange={(e) => handleChange("steamProfile", e.target.value)}
              className={inputClasses}
              placeholder="https://steamcommunity.com/id/..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">Rank</label>
            <div className="relative">
              <select value={formData.rank} onChange={(e) => handleChange("rank", e.target.value)} className={selectClasses} required>
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

          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">Preferred Roles</label>
            <div className="space-y-2">
              {ROLES.map((role) => (
                <label key={role} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role)}
                    onChange={() => handleRoleToggle(role)}
                    className="h-4 w-4 text-idl-accent focus:ring-idl-accent border-gray-300 rounded"
                  />
                  <span className="text-sm text-idl-light">{role}</span>
                </label>
              ))}
            </div>
            {formData.roles.length === 0 && <p className="mt-1 text-sm text-red-500">Please select at least one role</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-idl-light mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className={inputClasses}
              rows={4}
              placeholder="Add any additional information (availability, star sign, etc.)"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || formData.roles.length === 0}
              className="w-full bg-idl-accent text-white py-4 px-6 rounded-lg hover:bg-idl-accent/80 focus:outline-none focus:ring-4 focus:ring-idl-accent focus:ring-opacity-50 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register as LFT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
