interface Player {
  account_id: number;
  account_name: string;
  primary_team: {
    team_id: number;
    team_name: string;
    team_logo_src: string;
  };
  primary_position: number;
  wins: number;
  losses: number;
  win_rate: string;
  match_count: number;
  average_imprint_rating: number;
}

interface LeaderboardResponse {
  league_id: number;
  league_name: string;
  player_count: number;
  players: Player[];
}

const API_TOKEN = import.meta.env.VITE_IMPRINT_API_TOKEN;
const API_URL_LEADERBOARD = "/api/league/players";

export const fetchLeaderboard = async (): Promise<LeaderboardResponse> => {
  try {
    const response = await fetch(API_URL_LEADERBOARD, {
      method: "POST",
      headers: {
        token: API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        league_id: 18171,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch leaderboard data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
