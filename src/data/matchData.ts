import { Match } from "../types/tournament";

export const divisionMatches: Record<1 | 2, Match[]> = {
  1: [
    // Week 1
    {
      id: "d1w1m1",
      team1Id: "team_ancient_guardians",
      team2Id: "team_celtic_warriors",
      date: "2025-01-20",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "team_ancient_guardians", dota2MatchId: "8016509410" },
        game2: { played: true, winner: "team_ancient_guardians", dota2MatchId: "8041600384" },
      },
      score: [2, 0],
    },
    {
      id: "d1w1m2",
      team1Id: "team_emerald_raiders",
      team2Id: "team_dublin_dragons",
      date: "2025-01-20",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "team_dublin_dragons", dota2MatchId: "8016022641" },
        game2: { played: true, winner: "team_dublin_dragons", dota2MatchId: "8015753640" },
      },
      score: [0, 2],
    },
    {
      id: "d1w1m3",
      team1Id: "team_shannon_slayers",
      team2Id: "team_northern_knights",
      date: "2025-01-20",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 2
    {
      id: "d1w2m1",
      team1Id: "team_ancient_guardians",
      team2Id: "team_emerald_raiders",
      date: "2025-01-27",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w2m2",
      team1Id: "team_celtic_warriors",
      team2Id: "team_shannon_slayers",
      date: "2025-01-27",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w2m3",
      team1Id: "team_dublin_dragons",
      team2Id: "team_northern_knights",
      date: "2025-01-27",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 3
    {
      id: "d1w3m1",
      team1Id: "team_ancient_guardians",
      team2Id: "team_shannon_slayers",
      date: "2025-02-03",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w3m2",
      team1Id: "team_celtic_warriors",
      team2Id: "team_dublin_dragons",
      date: "2025-02-03",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w3m3",
      team1Id: "team_emerald_raiders",
      team2Id: "team_northern_knights",
      date: "2025-02-03",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 4
    {
      id: "d1w4m1",
      team1Id: "team_ancient_guardians",
      team2Id: "team_dublin_dragons",
      date: "2025-02-10",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w4m2",
      team1Id: "team_celtic_warriors",
      team2Id: "team_northern_knights",
      date: "2025-02-10",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w4m3",
      team1Id: "team_emerald_raiders",
      team2Id: "team_shannon_slayers",
      date: "2025-02-10",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 5
    {
      id: "d1w5m1",
      team1Id: "team_ancient_guardians",
      team2Id: "team_northern_knights",
      date: "2025-02-17",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w5m2",
      team1Id: "team_celtic_warriors",
      team2Id: "team_shannon_slayers",
      date: "2025-02-17",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w5m3",
      team1Id: "team_dublin_dragons",
      team2Id: "team_emerald_raiders",
      date: "2025-02-17",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
  ],
  2: [
    // Week 1
    {
      id: "d2w1m1",
      team1Id: "team_galway_giants",
      team2Id: "team_cork_crusaders",
      date: "2024-03-20",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w1m2",
      team1Id: "team_limerick_legends",
      team2Id: "team_wicklow_wolves",
      date: "2024-03-20",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w1m3",
      team1Id: "team_kilkenny_kings",
      team2Id: "team_mayo_marauders",
      date: "2024-03-20",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 2
    {
      id: "d2w2m1",
      team1Id: "team_galway_giants",
      team2Id: "team_limerick_legends",
      date: "2024-03-27",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w2m2",
      team1Id: "team_cork_crusaders",
      team2Id: "team_wicklow_wolves",
      date: "2024-03-27",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w2m3",
      team1Id: "team_kilkenny_kings",
      team2Id: "team_mayo_marauders",
      date: "2024-03-27",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 3
    {
      id: "d2w3m1",
      team1Id: "team_galway_giants",
      team2Id: "team_mayo_marauders",
      date: "2024-04-03",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w3m2",
      team1Id: "team_cork_crusaders",
      team2Id: "team_wicklow_wolves",
      date: "2024-04-03",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w3m3",
      team1Id: "team_kilkenny_kings",
      team2Id: "team_limerick_legends",
      date: "2024-04-03",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 4
    {
      id: "d2w4m1",
      team1Id: "team_galway_giants",
      team2Id: "team_wicklow_wolves",
      date: "2024-04-10",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w4m2",
      team1Id: "team_cork_crusaders",
      team2Id: "team_mayo_marauders",
      date: "2024-04-10",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w4m3",
      team1Id: "team_kilkenny_kings",
      team2Id: "team_limerick_legends",
      date: "2024-04-10",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 5
    {
      id: "d2w5m1",
      team1Id: "team_galway_giants",
      team2Id: "team_mayo_marauders",
      date: "2024-04-17",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w5m2",
      team1Id: "team_cork_crusaders",
      team2Id: "team_limerick_legends",
      date: "2024-04-17",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d2w5m3",
      team1Id: "team_kilkenny_kings",
      team2Id: "team_wicklow_wolves",
      date: "2024-04-17",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
  ],
};
