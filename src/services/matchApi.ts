interface MatchResponse {
  match_id: number;
  league_id: number;
  duration: string;
  teams: {
    team_name: string;
    win: boolean;
    is_radiant: boolean;
    team_imprint_rating: number;
    kills: number;
    players: {
      account_id: number;
      account_name: string;
      hero: {
        Name: string;
        live_portrait_src: string;
        icon_src: string;
        static_portrait_src: string;
      };
      position: string;
      kills: number;
      assists: number;
      deaths: number;
      gpm: number;
      net_worth: number;
      hero_damage: number;
      kill_participation: string;
      support_gold_spent: number;
      imprint_rating: number;
      items: {
        Name: string;
        icon_src: string;
      }[];
    }[];
  }[];
  replay_available: boolean;
}

const API_TOKEN = import.meta.env.VITE_IMPRINT_API_TOKEN;
const API_URL = "/api/match";

export const fetchMatchDetails = async (matchId: string): Promise<MatchResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        token: API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        match_id: parseInt(matchId, 10),
      }),
    });

    if (response.status === 503) {
      throw new Error("API service is temporarily unavailable");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch match data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};
