import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Team } from "../types/tournament";

export const useAllTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error } = await supabase
          .from("teams")
          .select("*")
          .order("division_id", { ascending: true })
          .order("name", { ascending: true });

        if (error) {
          console.error("Error:", error);
          throw error;
        }

        if (data) {
          // Parse the players JSON string for each team
          const parsedTeams = data.map((team) => ({
            ...team,
            players: team.players.map((player: string) => JSON.parse(player)),
          }));

          // console.log('Parsed teams:', parsedTeams); // Debug log
          setTeams(parsedTeams);
        }
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, error };
};
