import { Match } from "../types/tournament";

export const divisionMatches: Record<1 | 2 | 3, Match[]> = {
  1: [
    // Week 1
    {
      id: "d1w1m1",
      team1Id: "joonsquad",
      team2Id: "mms",
      date: "2025-06-09",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d1w1m2",
      team1Id: "mouseys_fierce_warriors",
      team2Id: "sentinel_island_esports",
      date: "2025-06-09",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "sentinel_island_esports", dota2MatchId: "8329563842" },
        game2: { played: true, winner: "mouseys_fierce_warriors", dota2MatchId: "8329640830" },
      },
      score: [1, 1],
    },
    {
      id: "d1w1bye",
      team1Id: "wongs_bakery",
      team2Id: "bye_week",
      date: "2025-06-09",
      completed: false,
      week: 1,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 2
    {
      id: "d1w2m1",
      team1Id: "joonsquad",
      team2Id: "mouseys_fierce_warriors",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "mouseys_fierce_warriors", dota2MatchId: "8345729571" },
        game2: { played: true, winner: "mouseys_fierce_warriors", dota2MatchId: "8345797677" },
      },
      score: [0, 2],
    },
    {
      id: "d1w2m2",
      team1Id: "mms",
      team2Id: "wongs_bakery",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "wongs_bakery", dota2MatchId: "8344136968" },
        game2: { played: true, winner: "wongs_bakery", dota2MatchId: "8344223717" },
      },
      score: [0, 2],
    },
    {
      id: "d1w2bye",
      team1Id: "sentinel_island_esports",
      team2Id: "bye_week",
      date: "2025-06-16",
      completed: false,
      week: 2,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 3
    {
      id: "d1w3m1",
      team1Id: "joonsquad",
      team2Id: "sentinel_island_esports",
      date: "2025-06-23",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "sentinel_island_esports", dota2MatchId: "8350857142" },
        game2: { played: true, winner: "sentinel_island_esports", dota2MatchId: "8350912216" },
      },
      score: [0, 2],
    },
    {
      id: "d1w3m2",
      team1Id: "mouseys_fierce_warriors",
      team2Id: "wongs_bakery",
      date: "2025-06-23",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "wongs_bakery", dota2MatchId: "8357468161" },
        game2: { played: true, winner: "wongs_bakery", dota2MatchId: "8357554680" },
      },
      score: [0, 2],
    },
    {
      id: "d1w3bye",
      team1Id: "mms",
      team2Id: "bye_week",
      date: "2025-06-23",
      completed: false,
      week: 3,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 4
    {
      id: "d1w4m1",
      team1Id: "joonsquad",
      team2Id: "wongs_bakery",
      date: "2025-06-30",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d1w4m2",
      team1Id: "mms",
      team2Id: "sentinel_island_esports",
      date: "2025-06-30",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d1w4bye",
      team1Id: "mouseys_fierce_warriors",
      team2Id: "bye_week",
      date: "2025-06-30",
      completed: false,
      week: 4,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 5
    {
      id: "d1w5m1",
      team1Id: "mms",
      team2Id: "mouseys_fierce_warriors",
      date: "2025-07-07",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d1w5m2",
      team1Id: "sentinel_island_esports",
      team2Id: "wongs_bakery",
      date: "2025-07-07",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d1w5bye",
      team1Id: "joonsquad",
      team2Id: "bye_week",
      date: "2025-07-07",
      completed: false,
      week: 5,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
  ],
  2: [
    // Week 1 - Group A
    {
      id: "d2w1m1",
      team1Id: "bdc",
      team2Id: "creep_enjoyers",
      date: "2025-06-09",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "bdc", dota2MatchId: "8336326239" },
        game2: { played: true, winner: "bdc", dota2MatchId: "8336435474" },
      },
      score: [2, 0],
    },
    {
      id: "d2w1m2",
      team1Id: "fear_the_samurai",
      team2Id: "lughs_last_hitters",
      date: "2025-06-09",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w1bye1",
      team1Id: "mikes_army",
      team2Id: "bye_week",
      date: "2025-06-09",
      completed: false,
      week: 1,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 1 - Group B
    {
      id: "d2w1m3",
      team1Id: "team_lft",
      team2Id: "cavan_champions",
      date: "2025-06-09",
      completed: false,
      week: 1,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w1m4",
      team1Id: "cavan_chumpions",
      team2Id: "ausgang",
      date: "2025-06-09",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "cavan_chumpions", dota2MatchId: "8340294728" },
        game2: { played: true, winner: "cavan_chumpions", dota2MatchId: "8340367108" },
      },
      score: [2, 0],
    },
    // Week 2 - Group A
    {
      id: "d2w2m1",
      team1Id: "bdc",
      team2Id: "fear_the_samurai",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "bdc", dota2MatchId: "8345738036" },
        game2: { played: true, winner: "bdc", dota2MatchId: "8345834114" },
      },
      score: [2, 0],
    },
    {
      id: "d2w2m2",
      team1Id: "creep_enjoyers",
      team2Id: "mikes_army",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8342775823" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8342861623" },
      },
      score: [2, 0],
    },
    {
      id: "d2w2bye1",
      team1Id: "lughs_last_hitters",
      team2Id: "bye_week",
      date: "2025-06-16",
      completed: false,
      week: 2,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 2 - Group B
    {
      id: "d2w2m3",
      team1Id: "team_lft",
      team2Id: "cavan_chumpions",
      date: "2025-06-16",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w2m4",
      team1Id: "cavan_champions",
      team2Id: "ausgang",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "ausgang", dota2MatchId: "8341510453" },
        game2: { played: true, winner: "ausgang", dota2MatchId: "8341581752" },
      },
      score: [0, 2],
    },
    // Week 3 - Group A
    {
      id: "d2w3m1",
      team1Id: "bdc",
      team2Id: "lughs_last_hitters",
      date: "2025-06-23",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w3m2",
      team1Id: "fear_the_samurai",
      team2Id: "mikes_army",
      date: "2025-06-23",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "mikes_army", dota2MatchId: "8349537420" },
        game2: { played: true, winner: "fear_the_samurai", dota2MatchId: "8349612025" },
      },
      score: [1, 1],
    },
    {
      id: "d2w3bye1",
      team1Id: "creep_enjoyers",
      team2Id: "bye_week",
      date: "2025-06-23",
      completed: false,
      week: 3,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 3 - Group B
    {
      id: "d2w3m3",
      team1Id: "team_lft",
      team2Id: "ausgang",
      date: "2025-06-23",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w3m4",
      team1Id: "cavan_champions",
      team2Id: "cavan_chumpions",
      date: "2025-06-23",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "cavan_champions", dota2MatchId: "8350824276" },
        game2: { played: true, winner: "cavan_champions", dota2MatchId: "8350918690" },
      },
      score: [2, 0],
    },
    // Week 4 - Group A
    {
      id: "d2w4m1",
      team1Id: "bdc",
      team2Id: "mikes_army",
      date: "2025-06-30",
      completed: false,
      week: 4,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w4m2",
      team1Id: "creep_enjoyers",
      team2Id: "lughs_last_hitters",
      date: "2025-06-30",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8357607606" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8357669066" },
      },
      score: [2, 0],
    },
    {
      id: "d2w4bye1",
      team1Id: "fear_the_samurai",
      team2Id: "bye_week",
      date: "2025-06-30",
      completed: false,
      week: 4,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 5 - Group A
    {
      id: "d2w5m1",
      team1Id: "creep_enjoyers",
      team2Id: "fear_the_samurai",
      date: "2025-07-07",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w5m2",
      team1Id: "lughs_last_hitters",
      team2Id: "mikes_army",
      date: "2025-07-07",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d2w5bye1",
      team1Id: "bdc",
      team2Id: "bye_week",
      date: "2025-07-07",
      completed: false,
      week: 5,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
  ],
  3: [
    // Week 1
    {
      id: "d3w1m1",
      team1Id: "imprint_esports",
      team2Id: "border_control",
      date: "2025-06-09",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "border_control", dota2MatchId: "8342837450" },
        game2: { played: true, winner: "imprint_esports", dota2MatchId: "8342910912" },
      },
      score: [1, 1],
    },
    {
      id: "d3w1m2",
      team1Id: "passport_issues",
      team2Id: "ratatataouille",
      date: "2025-06-09",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "passport_issues", dota2MatchId: "8345790340" },
        game2: { played: true, winner: "passport_issues", dota2MatchId: "8345874463" },
      },
      score: [2, 0],
    },
    // Week 2
    {
      id: "d3w2m1",
      team1Id: "imprint_esports",
      team2Id: "passport_issues",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "passport_issues", dota2MatchId: "8348297765" },
        game2: { played: true, winner: "passport_issues", dota2MatchId: "8348405990" },
      },
      score: [0, 2],
    },
    {
      id: "d3w2m2",
      team1Id: "border_control",
      team2Id: "ratatataouille",
      date: "2025-06-16",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8357550214" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8357637411" },
      },
      score: [1, 1],
    },
    // Week 3
    {
      id: "d3w3m1",
      team1Id: "imprint_esports",
      team2Id: "ratatataouille",
      date: "2025-06-23",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
    {
      id: "d3w3m2",
      team1Id: "border_control",
      team2Id: "passport_issues",
      date: "2025-06-23",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [0, 0],
    },
  ],
};
