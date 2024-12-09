import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Player } from '../types/tournament';

interface PlayerFormData {
  name: string;
  steamProfile: string;
  rank: string;
  auth_id?: string;
}

const initialPlayerState: PlayerFormData = {
  name: '',
  steamProfile: '',
  rank: '',
};

export const JoinTeamForm: React.FC = () => {
  const [teamId, setTeamId] = useState('');
  const [player, setPlayer] = useState<PlayerFormData>(initialPlayerState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePlayerChange = (field: keyof PlayerFormData, value: string) => {
    setPlayer(currentPlayer => ({
      ...currentPlayer,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user?.sub) return;
    setError(null);
    setIsSubmitting(true);

    try {
      // First, fetch the current team data
      const { data: teamData, error: fetchError } = await supabase
        .from('teams')
        .select('players')
        .eq('id', teamId)
        .single();

      if (fetchError) throw fetchError;
      if (!teamData) throw new Error('Team not found');

      // Parse existing players
      const currentPlayers = teamData.players.map((p: string) => JSON.parse(p));

      // Check if team is full
      if (currentPlayers.length >= 5) {
        throw new Error('Team is already full');
      }

      // Add new player
      const playerWithAuthId = {
        ...player,
        auth_id: user.sub
      };

      // Create new array with stringified player objects
      const updatedPlayers = [
        ...currentPlayers.map((p: Player) => JSON.stringify(p)),
        JSON.stringify(playerWithAuthId)
      ];

      // Update the team with the new player
      const { error: updateError } = await supabase
        .from('teams')
        .update({ 
          players: updatedPlayers // Now sending array of stringified objects
        })
        .eq('id', teamId);

      if (updateError) throw updateError;

      // Reset form on success
      setTeamId('');
      setPlayer(initialPlayerState);
      alert('Successfully joined team!');
    } catch (err) {
      console.error('Error joining team:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ranks = [
    'Herald',
    'Guardian',
    'Crusader',
    'Archon',
    'Legend',
    'Ancient',
    'Divine',
    'Immortal'
  ];

  const inputClasses = "w-full px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-300 outline-none transition-colors duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";
  const selectClasses = "w-full px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-300 outline-none transition-colors duration-200 text-gray-900 dark:text-white appearance-none";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Join a Team</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Team ID
            </label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className={inputClasses}
              required
              placeholder="Enter the team's unique ID"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Player Information</h3>
            <div className="bg-gray-50 dark:bg-gray-750 p-6 rounded-lg space-y-4 border-2 border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handlePlayerChange('name', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Steam Profile URL
                  </label>
                  <input
                    type="url"
                    value={player.steamProfile}
                    onChange={(e) => handlePlayerChange('steamProfile', e.target.value)}
                    className={inputClasses}
                    placeholder="https://steamcommunity.com/id/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rank
                  </label>
                  <div className="relative">
                    <select
                      value={player.rank}
                      onChange={(e) => handlePlayerChange('rank', e.target.value)}
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
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
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
              disabled={isSubmitting}
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-opacity-50 transition-colors text-lg font-medium"
            >
              {isSubmitting ? 'Joining Team...' : 'Join Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 