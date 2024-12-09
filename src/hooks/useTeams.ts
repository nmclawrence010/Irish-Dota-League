import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Team } from '../types/tournament';

export const useTeams = (divisionId: number) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .eq('division_id', divisionId)
          .order('points', { ascending: false });

        if (error) throw error;
        
        setTeams(data || []);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [divisionId]);

  return { teams, loading, error };
}; 