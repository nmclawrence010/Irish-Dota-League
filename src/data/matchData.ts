import { Match } from "../types/tournament";

export const divisionMatches: Record<1 | 2 | 3, Match[]> = {
  1: [
    // Week 1
    {
      id: "d1w1m1",
      team1Id: "monkey_kings",
      team2Id: "wongs_bakery",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "wongs_bakery", dota2MatchId: "8126614859" },
        game2: { played: true, winner: "wongs_bakery", dota2MatchId: "8126674965" },
      },
      score: [0, 2],
    },
    {
      id: "d1w1m2",
      team1Id: "the_standins",
      team2Id: "joonsquad",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "the_standins", dota2MatchId: "8130754095" },
        game2: { played: true, winner: "joonsquad", dota2MatchId: "8130837909" },
      },
      score: [1, 1],
    },
    {
      id: "d1w1bye",
      team1Id: "team_secret",
      team2Id: "bye_week",
      date: "2025-01-13",
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
      team1Id: "wongs_bakery",
      team2Id: "the_standins",
      date: "2025-01-20",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "wongs_bakery", dota2MatchId: "8147084430" },
        game2: { played: true, winner: "wongs_bakery", dota2MatchId: "8147194627" },
      },
      score: [2, 0],
    },
    {
      id: "d1w2m2",
      team1Id: "team_secret",
      team2Id: "joonsquad",
      date: "2025-01-20",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "team_secret", dota2MatchId: "8177227513" },
        game2: { played: true, winner: "joonsquad", dota2MatchId: "8177315650" },
      },
      score: [1, 1],
    },
    {
      id: "d1w2bye",
      team1Id: "monkey_kings",
      team2Id: "bye_week",
      date: "2025-01-20",
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
      team1Id: "the_standins",
      team2Id: "team_secret",
      date: "2025-01-27",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "team_secret", dota2MatchId: "8178396151" },
        game2: { played: true, winner: "the_standins", dota2MatchId: "8178486221" },
      },
      score: [1, 1],
    },
    {
      id: "d1w3m2",
      team1Id: "joonsquad",
      team2Id: "monkey_kings",
      date: "2025-01-27",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "joonsquad", dota2MatchId: "8153887341" },
        game2: { played: true, winner: "monkey_kings", dota2MatchId: "8153975219" },
      },
      score: [1, 1],
    },
    {
      id: "d1w3bye",
      team1Id: "wongs_bakery",
      team2Id: "bye_week",
      date: "2025-01-27",
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
      team1Id: "monkey_kings",
      team2Id: "team_secret",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "monkey_kings", dota2MatchId: "8187879467" },
        game2: { played: true, winner: "monkey_kings", dota2MatchId: "8187961300" },
      },
      score: [2, 0],
    },
    {
      id: "d1w4m2",
      team1Id: "wongs_bakery",
      team2Id: "joonsquad",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "wongs_bakery", dota2MatchId: "8167151922" },
        game2: { played: true, winner: "wongs_bakery", dota2MatchId: "8167259598" },
      },
      score: [1, 1],
    },
    {
      id: "d1w4bye",
      team1Id: "the_standins",
      team2Id: "bye_week",
      date: "2025-02-03",
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
      team1Id: "wongs_bakery",
      team2Id: "team_secret",
      date: "2025-02-10",
      completed: true,
      week: 5,
      games: {
        game1: { played: true, winner: "wongs_bakery", dota2MatchId: "8156904867" },
        game2: { played: true, winner: "wongs_bakery", dota2MatchId: "8156998056" },
      },
      score: [2, 0],
    },
    {
      id: "d1w5m2",
      team1Id: "the_standins",
      team2Id: "monkey_kings",
      date: "2025-02-10",
      completed: true,
      week: 5,
      games: {
        game1: { played: true, winner: "monkey_kings", dota2MatchId: "8173887380" },
        game2: { played: true, winner: "monkey_kings", dota2MatchId: "8173973898" },
      },
      score: [0, 2],
    },
    {
      id: "d1w5bye",
      team1Id: "joonsquad",
      team2Id: "bye_week",
      date: "2025-02-10",
      completed: false,
      week: 5,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 6
    {
      id: "d1w6m1",
      team1Id: "the_standins",
      team2Id: "team_secret",
      date: "2025-02-24",
      completed: true,
      week: 6,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
      score: [2, 0],
    },
    // Week 7
    {
      id: "d1w7m1",
      team1Id: "monkey_kings",
      team2Id: "joonsquad",
      date: "2025-03-03",
      completed: false,
      week: 7,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d1w7m2",
      team1Id: "wongs_bakery",
      team2Id: "the_standins",
      date: "2025-03-03",
      completed: false,
      week: 7,
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
      team1Id: "taylors_angels",
      team2Id: "kobold_camp",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "kobold_camp", dota2MatchId: "8136920222" },
        game2: { played: true, winner: "taylors_angels", dota2MatchId: "8136982676" },
      },
      score: [1, 1],
    },
    {
      id: "d2w1m2",
      team1Id: "cavan_champions",
      team2Id: "stinky_steve",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "cavan_champions", dota2MatchId: "8132075875" },
        game2: { played: true, winner: "cavan_champions", dota2MatchId: "8132135770" },
      },
      score: [2, 0],
    },
    {
      id: "d2w1m3",
      team1Id: "creep_enjoyers",
      team2Id: "void",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8132144432" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8132212650" },
      },
      score: [2, 0],
    },
    // Week 2
    {
      id: "d2w2m1",
      team1Id: "kobold_camp",
      team2Id: "cavan_champions",
      date: "2025-01-20",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "kobold_camp", dota2MatchId: "8138279209" },
        game2: { played: true, winner: "cavan_champions", dota2MatchId: "8138363577" },
      },
      score: [1, 1],
    },
    {
      id: "d2w2m2",
      team1Id: "stinky_steve",
      team2Id: "creep_enjoyers",
      date: "2025-01-20",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8146342240" },
        game2: { played: true, winner: "stinky_steve", dota2MatchId: "8146422026" },
      },
      score: [1, 1],
    },
    {
      id: "d2w2m3",
      team1Id: "void",
      team2Id: "taylors_angels",
      date: "2025-01-20",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "void", dota2MatchId: "8142421447" },
        game2: { played: true, winner: "taylors_angels", dota2MatchId: "8142495553" },
      },
      score: [1, 1],
    },
    // Week 3
    {
      id: "d2w3m1",
      team1Id: "kobold_camp",
      team2Id: "creep_enjoyers",
      date: "2025-01-27",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8152483877" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8152569420" },
      },
      score: [0, 2],
    },
    {
      id: "d2w3m2",
      team1Id: "void",
      team2Id: "stinky_steve",
      date: "2025-01-27",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "stinky_steve", dota2MatchId: "8151222752" },
        game2: { played: true, winner: "void", dota2MatchId: "8151317170" },
      },
      score: [1, 1],
    },
    {
      id: "d2w3m3",
      team1Id: "taylors_angels",
      team2Id: "cavan_champions",
      date: "2025-01-27",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "cavan_champions", dota2MatchId: "8162401470" },
        game2: { played: true, winner: "cavan_champions", dota2MatchId: "8162484000" },
      },
      score: [0, 2],
    },
    // Week 4
    {
      id: "d2w4m1",
      team1Id: "creep_enjoyers",
      team2Id: "taylors_angels",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8179874787" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8179925206" },
      },
      score: [2, 0],
    },
    {
      id: "d2w4m2",
      team1Id: "stinky_steve",
      team2Id: "kobold_camp",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "kobold_camp", dota2MatchId: "8158417286" },
        game2: { played: true, winner: "stinky_steve", dota2MatchId: "8158489406" },
      },
      score: [1, 1],
    },
    {
      id: "d2w4m3",
      team1Id: "void",
      team2Id: "cavan_champions",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "cavan_champions", dota2MatchId: "8161132062" },
        game2: { played: true, winner: "void", dota2MatchId: "8161207781" },
      },
      score: [1, 1],
    },
    // Week 5
    {
      id: "d2w5m1",
      team1Id: "creep_enjoyers",
      team2Id: "cavan_champions",
      date: "2025-02-10",
      completed: true,
      week: 5,
      games: {
        game1: { played: true, winner: "creep_enjoyers", dota2MatchId: "8169846368" },
        game2: { played: true, winner: "creep_enjoyers", dota2MatchId: "8169926215" },
      },
      score: [2, 0],
    },
    {
      id: "d2w5m2",
      team1Id: "kobold_camp",
      team2Id: "void",
      date: "2025-02-10",
      completed: true,
      week: 5,
      games: {
        game1: { played: true, winner: "void", dota2MatchId: "8177119217" },
        game2: { played: true, winner: "kobold_camp", dota2MatchId: "8177208276" },
      },
      score: [1, 1],
    },
    {
      id: "d2w5m3",
      team1Id: "taylors_angels",
      team2Id: "stinky_steve",
      date: "2025-02-10",
      completed: true,
      week: 5,
      games: {
        game1: { played: true, winner: "stinky_steve", dota2MatchId: "8162565545" },
        game2: { played: true, winner: "stinky_steve", dota2MatchId: "8162641620" },
      },
      score: [0, 2],
    },
    // Week 6
    {
      id: "d2w6m1",
      team1Id: "stinky_steve",
      team2Id: "taylors_angels",
      date: "2025-02-24",
      completed: false,
      week: 6,
      isKnockout: true,
      games: {
        game1: { played: false },
        game2: { played: false },
        game3: { played: false },
      },
    },
    {
      id: "d2w6m2",
      team1Id: "kobold_camp",
      team2Id: "void",
      date: "2025-02-24",
      completed: true,
      week: 6,
      isKnockout: true,
      games: {
        game1: { played: true, winner: "kobold_camp", dota2MatchId: "8197942156" },
        game2: { played: true, winner: "void", dota2MatchId: "8198045818" },
        game3: { played: true, winner: "kobold_camp", dota2MatchId: "8198110183" },
      },
      score: [2, 1],
    },
    // Week 7
    {
      id: "d2w7m1",
      team1Id: "creep_enjoyers",
      team2Id: "kobold_camp",
      date: "2025-03-03",
      completed: false,
      week: 7,
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
      team1Id: "dans_crusty_socks",
      team2Id: "imprint_esports",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "imprint_esports", dota2MatchId: "8132210295" },
        game2: { played: true, winner: "imprint_esports", dota2MatchId: "8132274119" },
      },
      score: [0, 2],
    },
    {
      id: "d3w1m2",
      team1Id: "passport_issues",
      team2Id: "andy_archons",
      date: "2025-01-13",
      completed: true,
      week: 1,
      games: {
        game1: { played: true, winner: "passport_issues", dota2MatchId: "8132140934" },
        game2: { played: true, winner: "passport_issues", dota2MatchId: "8132197696" },
      },
      score: [2, 0],
    },
    {
      id: "d3w1bye",
      team1Id: "no_discord",
      team2Id: "bye_week",
      date: "2025-01-13",
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
      id: "d3w2m1",
      team1Id: "imprint_esports",
      team2Id: "passport_issues",
      date: "2025-01-20",
      completed: false,
      week: 2,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d3w2m2",
      team1Id: "no_discord",
      team2Id: "andy_archons",
      date: "2025-01-20",
      completed: true,
      week: 2,
      games: {
        game1: { played: true, winner: "andy_archons", dota2MatchId: "8142460519" },
        game2: { played: true, winner: "andy_archons", dota2MatchId: "8148675158" },
      },
      score: [0, 2],
    },
    {
      id: "d3w2bye",
      team1Id: "dans_crusty_socks",
      team2Id: "bye_week",
      date: "2025-01-20",
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
      id: "d3w3m1",
      team1Id: "passport_issues",
      team2Id: "no_discord",
      date: "2025-01-27",
      completed: false,
      week: 3,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d3w3m2",
      team1Id: "andy_archons",
      team2Id: "dans_crusty_socks",
      date: "2025-01-27",
      completed: true,
      week: 3,
      games: {
        game1: { played: true, winner: "andy_archons", dota2MatchId: "8177266539" },
        game2: { played: true, winner: "dans_crusty_socks", dota2MatchId: "8177324537" },
      },
      score: [1, 1],
    },
    {
      id: "d3w3bye",
      team1Id: "imprint_esports",
      team2Id: "bye_week",
      date: "2025-01-27",
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
      id: "d3w4m1",
      team1Id: "dans_crusty_socks",
      team2Id: "no_discord",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "no_discord", dota2MatchId: "8184585420" },
        game2: { played: true, winner: "no_discord", dota2MatchId: "8184677662" },
      },
      score: [0, 2],
    },
    {
      id: "d3w4m2",
      team1Id: "imprint_esports",
      team2Id: "andy_archons",
      date: "2025-02-03",
      completed: true,
      week: 4,
      games: {
        game1: { played: true, winner: "imprint_esports", dota2MatchId: "8162553790" },
        game2: { played: true, winner: "imprint_esports", dota2MatchId: "8162649481" },
      },
      score: [2, 0],
    },
    {
      id: "d3w4bye",
      team1Id: "passport_issues",
      team2Id: "bye_week",
      date: "2025-02-03",
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
      id: "d3w5m1",
      team1Id: "no_discord",
      team2Id: "imprint_esports",
      date: "2025-02-10",
      completed: true,
      week: 5,
      games: {
        game1: { played: true, winner: "imprint_esports", dota2MatchId: "8171316799" },
        game2: { played: true, winner: "imprint_esports", dota2MatchId: "8171378509" },
      },
      score: [0, 2],
    },
    {
      id: "d3w5m2",
      team1Id: "passport_issues",
      team2Id: "dans_crusty_socks",
      date: "2025-02-10",
      completed: false,
      week: 5,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    {
      id: "d3w5bye",
      team1Id: "andy_archons",
      team2Id: "bye_week",
      date: "2025-02-10",
      completed: false,
      week: 5,
      isByeWeek: true,
      games: {
        game1: { played: false },
        game2: { played: false },
      },
    },
    // Week 6
    {
      id: "d3w6m1",
      team1Id: "dans_crusty_socks",
      team2Id: "imprint_esports",
      date: "2025-02-24",
      completed: false,
      week: 6,
      isKnockout: true,
      games: {
        game1: { played: false },
        game2: { played: false },
        game3: { played: false },
      },
    },
    {
      id: "d3w6m2",
      team1Id: "andy_archons",
      team2Id: "no_discord",
      date: "2025-02-24",
      completed: true,
      week: 6,
      isKnockout: true,
      games: {
        game1: { played: true, winner: "no_discord", dota2MatchId: "8193399920" },
        game2: { played: true, winner: "no_discord", dota2MatchId: "8193464930" },
        game3: { played: false },
      },
      score: [0, 2],
    },
  ],
};

// Update all bye week matches to include games field
const byeWeekGames = {
  game1: { played: false },
  game2: { played: false },
};

// Find all matches with isByeWeek: true and add games field
divisionMatches[1].forEach((match) => {
  if (match.isByeWeek) {
    match.games = byeWeekGames;
  }
});

divisionMatches[3].forEach((match) => {
  if (match.isByeWeek) {
    match.games = byeWeekGames;
  }
});
