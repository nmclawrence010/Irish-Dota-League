// import { Team } from '../types/tournament';

// export const dummyTeams: Record<1 | 2, Team[]> = {
//   1: [
//     {
//       id: '1',
//       name: 'Dublin Defenders',
//       players: [
//         { name: 'Player1', steamProfile: 'https://steamcommunity.com/id/player1', rank: 'Divine' },
//         { name: 'Player2', steamProfile: 'https://steamcommunity.com/id/player2', rank: 'Ancient' },
//         { name: 'Player3', steamProfile: 'https://steamcommunity.com/id/player3', rank: 'Divine' },
//         { name: 'Player4', steamProfile: 'https://steamcommunity.com/id/player4', rank: 'Immortal' },
//         { name: 'Player5', steamProfile: 'https://steamcommunity.com/id/player5', rank: 'Divine' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '2',
//       name: 'Cork Crushers',
//       players: [
//         { name: 'Player6', steamProfile: 'https://steamcommunity.com/id/player6', rank: 'Ancient' },
//         { name: 'Player7', steamProfile: 'https://steamcommunity.com/id/player7', rank: 'Divine' },
//         { name: 'Player8', steamProfile: 'https://steamcommunity.com/id/player8', rank: 'Ancient' },
//         { name: 'Player9', steamProfile: 'https://steamcommunity.com/id/player9', rank: 'Divine' },
//         { name: 'Player10', steamProfile: 'https://steamcommunity.com/id/player10', rank: 'Ancient' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '3',
//       name: 'Galway Guardians',
//       players: [
//         { name: 'Player11', steamProfile: 'https://steamcommunity.com/id/player11', rank: 'Divine' },
//         { name: 'Player12', steamProfile: 'https://steamcommunity.com/id/player12', rank: 'Ancient' },
//         { name: 'Player13', steamProfile: 'https://steamcommunity.com/id/player13', rank: 'Divine' },
//         { name: 'Player14', steamProfile: 'https://steamcommunity.com/id/player14', rank: 'Ancient' },
//         { name: 'Player15', steamProfile: 'https://steamcommunity.com/id/player15', rank: 'Divine' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '4',
//       name: 'Belfast Battlers',
//       players: [
//         { name: 'Player16', steamProfile: 'https://steamcommunity.com/id/player16', rank: 'Ancient' },
//         { name: 'Player17', steamProfile: 'https://steamcommunity.com/id/player17', rank: 'Divine' },
//         { name: 'Player18', steamProfile: 'https://steamcommunity.com/id/player18', rank: 'Ancient' },
//         { name: 'Player19', steamProfile: 'https://steamcommunity.com/id/player19', rank: 'Divine' },
//         { name: 'Player20', steamProfile: 'https://steamcommunity.com/id/player20', rank: 'Ancient' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '5',
//       name: 'Limerick Lions',
//       players: [
//         { name: 'Player21', steamProfile: 'https://steamcommunity.com/id/player21', rank: 'Divine' },
//         { name: 'Player22', steamProfile: 'https://steamcommunity.com/id/player22', rank: 'Ancient' },
//         { name: 'Player23', steamProfile: 'https://steamcommunity.com/id/player23', rank: 'Divine' },
//         { name: 'Player24', steamProfile: 'https://steamcommunity.com/id/player24', rank: 'Ancient' },
//         { name: 'Player25', steamProfile: 'https://steamcommunity.com/id/player25', rank: 'Divine' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '6',
//       name: 'Waterford Warriors',
//       players: [
//         { name: 'Player26', steamProfile: 'https://steamcommunity.com/id/player26', rank: 'Ancient' },
//         { name: 'Player27', steamProfile: 'https://steamcommunity.com/id/player27', rank: 'Divine' },
//         { name: 'Player28', steamProfile: 'https://steamcommunity.com/id/player28', rank: 'Ancient' },
//         { name: 'Player29', steamProfile: 'https://steamcommunity.com/id/player29', rank: 'Divine' },
//         { name: 'Player30', steamProfile: 'https://steamcommunity.com/id/player30', rank: 'Ancient' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     }
//   ],
//   2: [
//     {
//       id: '7',
//       name: 'Sligo Strikers',
//       players: [
//         { name: 'Player31', steamProfile: 'https://steamcommunity.com/id/player31', rank: 'Legend' },
//         { name: 'Player32', steamProfile: 'https://steamcommunity.com/id/player32', rank: 'Ancient' },
//         { name: 'Player33', steamProfile: 'https://steamcommunity.com/id/player33', rank: 'Legend' },
//         { name: 'Player34', steamProfile: 'https://steamcommunity.com/id/player34', rank: 'Ancient' },
//         { name: 'Player35', steamProfile: 'https://steamcommunity.com/id/player35', rank: 'Legend' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '8',
//       name: 'Kilkenny Knights',
//       players: [
//         { name: 'Player36', steamProfile: 'https://steamcommunity.com/id/player36', rank: 'Legend' },
//         { name: 'Player37', steamProfile: 'https://steamcommunity.com/id/player37', rank: 'Ancient' },
//         { name: 'Player38', steamProfile: 'https://steamcommunity.com/id/player38', rank: 'Legend' },
//         { name: 'Player39', steamProfile: 'https://steamcommunity.com/id/player39', rank: 'Ancient' },
//         { name: 'Player40', steamProfile: 'https://steamcommunity.com/id/player40', rank: 'Legend' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '9',
//       name: 'Dundalk Dragons',
//       players: [
//         { name: 'Player41', steamProfile: 'https://steamcommunity.com/id/player41', rank: 'Legend' },
//         { name: 'Player42', steamProfile: 'https://steamcommunity.com/id/player42', rank: 'Ancient' },
//         { name: 'Player43', steamProfile: 'https://steamcommunity.com/id/player43', rank: 'Legend' },
//         { name: 'Player44', steamProfile: 'https://steamcommunity.com/id/player44', rank: 'Ancient' },
//         { name: 'Player45', steamProfile: 'https://steamcommunity.com/id/player45', rank: 'Legend' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '10',
//       name: 'Athlone Ancients',
//       players: [
//         { name: 'Player46', steamProfile: 'https://steamcommunity.com/id/player46', rank: 'Legend' },
//         { name: 'Player47', steamProfile: 'https://steamcommunity.com/id/player47', rank: 'Ancient' },
//         { name: 'Player48', steamProfile: 'https://steamcommunity.com/id/player48', rank: 'Legend' },
//         { name: 'Player49', steamProfile: 'https://steamcommunity.com/id/player49', rank: 'Ancient' },
//         { name: 'Player50', steamProfile: 'https://steamcommunity.com/id/player50', rank: 'Legend' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '11',
//       name: 'Drogheda Demons',
//       players: [
//         { name: 'Player51', steamProfile: 'https://steamcommunity.com/id/player51', rank: 'Legend' },
//         { name: 'Player52', steamProfile: 'https://steamcommunity.com/id/player52', rank: 'Ancient' },
//         { name: 'Player53', steamProfile: 'https://steamcommunity.com/id/player53', rank: 'Legend' },
//         { name: 'Player54', steamProfile: 'https://steamcommunity.com/id/player54', rank: 'Ancient' },
//         { name: 'Player55', steamProfile: 'https://steamcommunity.com/id/player55', rank: 'Legend' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     },
//     {
//       id: '12',
//       name: 'Wexford Wizards',
//       players: [
//         { name: 'Player56', steamProfile: 'https://steamcommunity.com/id/player56', rank: 'Legend' },
//         { name: 'Player57', steamProfile: 'https://steamcommunity.com/id/player57', rank: 'Ancient' },
//         { name: 'Player58', steamProfile: 'https://steamcommunity.com/id/player58', rank: 'Legend' },
//         { name: 'Player59', steamProfile: 'https://steamcommunity.com/id/player59', rank: 'Ancient' },
//         { name: 'Player60', steamProfile: 'https://steamcommunity.com/id/player60', rank: 'Legend' }
//       ],
//       points: 0,
//       wins: 0,
//       draws: 0,
//       losses: 0,
//     }
//   ]
// };
