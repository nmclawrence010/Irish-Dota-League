import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { LFTForm } from "../components/LFTForm";
import { useLFTPlayers } from "../hooks/useLFTPlayers";
import { useAuth } from "../hooks/useAuth";
import { ChevronDown, ChevronUp } from "lucide-react";

export const LFTPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { players, loading, error } = useLFTPlayers();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <div className="text-center text-gray-500 dark:text-gray-400 py-8">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center space-x-2 bg-[#169B62] hover:bg-[#128152]/80 dark:bg-[#0A2F51] dark:hover:bg-[#0E4D64] text-white py-3 px-6 rounded-lg transition-colors text-lg font-medium"
        >
          <span>{showForm ? "Hide Registration Form" : "Register as LFT"}</span>
          {showForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div className={`transition-all duration-300 ease-in-out ${showForm ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
          <LFTForm onSubmitSuccess={() => setShowForm(false)} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Players Looking for Team</h2>

        {error ? (
          <div className="text-center text-red-500 dark:text-red-400 py-4">Error loading players: {error}</div>
        ) : loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">Loading players...</div>
        ) : players.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">No players currently looking for team</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Steam Profile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {players.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-white">
                      <a
                        href={player.steamProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Steam Profile
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-white">{player.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-white">
                      <div className="flex flex-wrap gap-1">
                        {player.roles.map((role) => (
                          <span
                            key={role}
                            className="px-2 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-base text-gray-900 dark:text-white">{player.notes}</td>
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
