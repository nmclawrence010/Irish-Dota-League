import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Team } from "../types/tournament";

export const useSeasonFiveTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTeams = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from("teams")
          .select("*")
          .order("division_id", { ascending: true })
          .order("name", { ascending: true });

        if (supabaseError) {
          throw supabaseError;
        }

        if (!data) {
          if (isMounted) {
            setTeams([]);
            setLoading(false);
          }
          return;
        }

        try {
          const parsedTeams = data.map((team) => ({
            ...team,
            players: team.players.map((player: string) => JSON.parse(player)),
          }));

          if (isMounted) {
            setTeams(parsedTeams);
            setLoading(false);
          }
        } catch (parseError) {
          if (isMounted) {
            setError("Error parsing team data");
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setLoading(false);
        }
      }
    };

    fetchTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return { teams, loading, error };
};
