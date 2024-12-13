import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { Team } from "../types/tournament";
import { useAuth } from "./useAuth";

export const useMyTeam = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTeam = useCallback(async () => {
    if (!user?.sub) return;

    try {
      const { data, error } = await supabase.from("teams").select("*");

      if (error) throw error;

      if (data) {
        const parsedTeams = data.map((team) => ({
          ...team,
          players: team.players.map((player: string) => JSON.parse(player)),
        }));

        const myTeam = parsedTeams.find((team) => team.players.some((player: { auth_id: string }) => player.auth_id === user.sub));

        setTeam(myTeam || null);
      }
    } catch (err) {
      console.error("Error fetching team:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [user?.sub]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  return {
    team,
    loading,
    error,
    mutate: fetchTeam,
  };
};
