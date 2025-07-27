interface Player {
  account_id: number;
  account_name: string;
  team: {
    team_id: number;
    team_name: string;
    team_logo_src: string;
  };
  position: number;
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

interface HeroFacet {
  name: string;
  icon_src: string;
  gradient: {
    left_colour: string;
    right_colour: string;
  };
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_imprint_rating: number;
}

interface HeroPosition {
  position: number;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_imprint_rating: number;
}

interface Hero {
  name: string;
  raw_name: string;
  live_portrait_src: string;
  icon_src: string;
  static_portrait_src: string;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_kills: number;
  average_deaths: number;
  average_assists: number;
  average_net_worth: number;
  average_hero_damage: number;
  average_gpm: number;
  average_xpm: number;
  average_imprint_rating: number;
  facet_tally: HeroFacet[];
  position_tally: HeroPosition[];
}

interface HeroStatisticsResponse {
  league_id: number;
  league_name: string;
  hero_statistics: {
    match_count: number;
    hero_count: number;
    heroes: Hero[];
  };
}

interface TeamPlayer {
  account_id: number;
  account_name: string;
  position: number;
}

interface Team {
  team_id: number;
  team_name: string;
  team_logo_src: string;
  players: TeamPlayer[];
  wins: number;
  losses: number;
  win_rate: string;
  match_count: number;
  average_team_imprint_rating: number;
}

interface TeamsResponse {
  league_id: number;
  league_name: string;
  team_count: number;
  teams: Team[];
}

const API_TOKEN = import.meta.env.VITE_IMPRINT_API_TOKEN;
const API_URL_LEADERBOARD = "/api/league/players";
const API_URL_HERO_STATS = "/api/league/statistics/hero";
const API_URL_TEAMS = "/api/league/teams";

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

export const fetchHeroStatistics = async (): Promise<HeroStatisticsResponse> => {
  try {
    const response = await fetch(API_URL_HERO_STATS, {
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
      throw new Error(errorData.message || "Failed to fetch hero statistics data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching hero statistics:", error);
    throw error;
  }
};

export const fetchTeams = async (): Promise<TeamsResponse> => {
  try {
    const response = await fetch(API_URL_TEAMS, {
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
      throw new Error(errorData.message || "Failed to fetch teams data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const fetchImprintTeams = async (): Promise<TeamsResponse> => {
  try {
    const response = await fetch(API_URL_TEAMS, {
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
      throw new Error(errorData.message || "Failed to fetch Imprint teams data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Imprint teams:", error);
    throw error;
  }
};

// Hero statistics interfaces
interface HeroFacetTally {
  name: string;
  icon_src: string;
  gradient: {
    left_colour: string;
    right_colour: string;
  };
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_imprint_rating: number;
}

interface HeroPositionTally {
  position: number;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_imprint_rating: number;
}

interface HeroStatistic {
  name: string;
  raw_name: string;
  live_portrait_src: string;
  icon_src: string;
  static_portrait_src: string;
  match_count: number;
  wins: number;
  losses: number;
  win_rate: string;
  average_kills: number;
  average_deaths: number;
  average_assists: number;
  average_net_worth: number;
  average_hero_damage: number;
  average_gpm: number;
  average_xpm: number;
  average_imprint_rating: number;
  facet_tally: HeroFacetTally[];
  position_tally: HeroPositionTally[];
}

interface HeroStatistics {
  match_count: number;
  hero_count: number;
  heroes: HeroStatistic[];
}

interface TeamHeroStatisticsResponse {
  league_id: number;
  league_name: string;
  team_id: number;
  team_name: string;
  team_logo_src: string;
  hero_statistics: HeroStatistics;
}

const API_URL_TEAM_HERO_STATS = "/api/league/team/statistics/hero";

export const fetchTeamHeroStatistics = async (teamId: number): Promise<TeamHeroStatisticsResponse> => {
  try {
    const response = await fetch(API_URL_TEAM_HERO_STATS, {
      method: "POST",
      headers: {
        token: API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        league_id: 18171,
        team_id: teamId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch team hero statistics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching team hero statistics:", error);
    throw error;
  }
};

// Player hero statistics interfaces
interface PlayerHeroStatisticsResponse {
  league_id: number;
  league_name: string;
  account_id: number;
  account_name: string;
  position: number;
  team_id: number;
  team_name: string;
  team_logo_src: string;
  hero_statistics: HeroStatistics;
}

const API_URL_PLAYER_HERO_STATS = "/api/league/player/statistics/hero";

export const fetchPlayerHeroStatistics = async (accountId: number): Promise<PlayerHeroStatisticsResponse> => {
  try {
    const response = await fetch(API_URL_PLAYER_HERO_STATS, {
      method: "POST",
      headers: {
        token: API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        league_id: 18171,
        account_id: accountId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch player hero statistics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching player hero statistics:", error);
    throw error;
  }
};
