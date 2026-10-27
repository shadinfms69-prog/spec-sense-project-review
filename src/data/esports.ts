// Sample (demo) data. Replace these accessors with real API calls later.
export type Game = { slug: string; name: string; category: string; description: string; overview: string; hue: number };
export type Tournament = { id: string; name: string; game: string; start: string; end: string; status: "Upcoming" | "Live" | "Completed"; prize: string; teams: string[]; location: string };
export type Match = { id: string; game: string; tournament: string; teamA: string; teamB: string; scoreA?: number; scoreB?: number; date: string; status: "Upcoming" | "Live" | "Completed" };
export type Team = { id: string; name: string; tag: string; game: string; region: string; achievements: string[] };
export type Player = { id: string; name: string; realName: string; team: string; game: string; role: string; achievements: string[] };
export type Article = { id: string; title: string; category: string; date: string; summary: string; body: string[]; game?: string };

export const games: Game[] = [
  { slug: "efootball", name: "eFootball", category: "Sports", hue: 150, description: "Konami's free-to-play football simulation with a thriving 1v1 competitive scene.", overview: "eFootball brings realistic football to competitive play. Players face off one-on-one in league and knockout formats, with strong communities across South Asia, Europe and Latin America." },
  { slug: "pubg-mobile", name: "PUBG Mobile", category: "Battle Royale", hue: 45, description: "Squad-based battle royale where 100 players fight to be the last team standing.", overview: "PUBG Mobile is one of the most-played mobile esports titles. Squads of four compete across multiple maps, earning points for placement and eliminations." },
  { slug: "free-fire", name: "Free Fire", category: "Battle Royale", hue: 25, description: "Fast 10-minute battle royale matches built for mobile devices.", overview: "Garena Free Fire delivers short, intense matches with 50 players. Its accessibility has made it a major esport in South Asia, Southeast Asia and Brazil." },
  { slug: "valorant", name: "Valorant", category: "Tactical Shooter", hue: 0, description: "5v5 tactical shooter combining precise gunplay with unique agent abilities.", overview: "Riot Games' Valorant pits two teams of five against each other in attack and defense rounds. The VCT circuit is among the most-watched esports ecosystems." },
  { slug: "counter-strike-2", name: "Counter-Strike 2", category: "Tactical Shooter", hue: 60, description: "The legendary tactical FPS, rebuilt on the Source 2 engine.", overview: "Counter-Strike 2 continues decades of competitive history with bomb-defusal matches, Majors and a deep global tier system." },
  { slug: "league-of-legends", name: "League of Legends", category: "MOBA", hue: 210, description: "5v5 strategy MOBA with over 160 champions and a global league system.", overview: "League of Legends is a team strategy game where two teams of five destroy the enemy Nexus. Its World Championship is one of esports' largest events." },
  { slug: "dota-2", name: "Dota 2", category: "MOBA", hue: 340, description: "Deep, complex MOBA known for The International and huge prize pools.", overview: "Dota 2 is Valve's flagship MOBA with near-limitless strategic depth. Teams draft heroes and battle to destroy the opposing Ancient." },
];

export const teams: Team[] = [
  { id: "nova-strikers", name: "Nova Strikers", tag: "NVS", game: "valorant", region: "Asia-Pacific", achievements: ["Demo Masters 2026 — Champions", "Regional League — 2nd"] },
  { id: "cyan-wolves", name: "Cyan Wolves", tag: "CYW", game: "valorant", region: "Europe", achievements: ["Demo Cup Spring — Champions"] },
  { id: "iron-phoenix", name: "Iron Phoenix", tag: "IPX", game: "counter-strike-2", region: "Europe", achievements: ["Demo Major — Semifinalist", "Winter Invitational — Champions"] },
  { id: "volt-gaming", name: "Volt Gaming", tag: "VLT", game: "counter-strike-2", region: "Americas", achievements: ["Americas Open — Champions"] },
  { id: "dhaka-dynamos", name: "Dhaka Dynamos", tag: "DHD", game: "pubg-mobile", region: "South Asia", achievements: ["South Asia Series — Champions", "Pro League S3 — 3rd"] },
  { id: "royal-raptors", name: "Royal Raptors", tag: "RRP", game: "pubg-mobile", region: "Southeast Asia", achievements: ["SEA Championship — 2nd"] },
  { id: "blaze-squad", name: "Blaze Squad", tag: "BLZ", game: "free-fire", region: "South Asia", achievements: ["FF National Cup — Champions"] },
  { id: "storm-titans", name: "Storm Titans", tag: "STT", game: "free-fire", region: "Brazil", achievements: ["Latin Clash — Champions"] },
  { id: "arcane-five", name: "Arcane Five", tag: "AR5", game: "league-of-legends", region: "Korea", achievements: ["Demo Worlds — Finalist"] },
  { id: "shadow-legion", name: "Shadow Legion", tag: "SHL", game: "dota-2", region: "CIS", achievements: ["Demo Invitational — Champions"] },
  { id: "golden-boots", name: "Golden Boots FC", tag: "GBF", game: "efootball", region: "South Asia", achievements: ["eFootball Bangla League — Champions"] },
];

export const players: Player[] = [
  { id: "phantom", name: "Phantom", realName: "Arif Rahman", team: "nova-strikers", game: "valorant", role: "Duelist", achievements: ["Demo Masters MVP"] },
  { id: "frostbyte", name: "Frostbyte", realName: "Lena Koch", team: "cyan-wolves", game: "valorant", role: "Controller", achievements: ["Spring Cup MVP"] },
  { id: "rift", name: "Rift", realName: "Mateo Silva", team: "volt-gaming", game: "counter-strike-2", role: "AWPer", achievements: ["Americas Open MVP"] },
  { id: "anvil", name: "Anvil", realName: "Piotr Nowak", team: "iron-phoenix", game: "counter-strike-2", role: "In-game Leader", achievements: ["Winter Invitational MVP"] },
  { id: "tiger", name: "Tiger", realName: "Sakib Hasan", team: "dhaka-dynamos", game: "pubg-mobile", role: "Fragger", achievements: ["Most eliminations — South Asia Series"] },
  { id: "viper", name: "Viper", realName: "Nadia Islam", team: "blaze-squad", game: "free-fire", role: "Rusher", achievements: ["National Cup MVP"] },
  { id: "sage", name: "Sage", realName: "Min-jun Park", team: "arcane-five", game: "league-of-legends", role: "Mid Laner", achievements: ["Demo Worlds All-Pro"] },
  { id: "nightfall", name: "Nightfall", realName: "Ivan Petrov", team: "shadow-legion", game: "dota-2", role: "Carry", achievements: ["Invitational MVP"] },
  { id: "striker10", name: "Striker10", realName: "Tanvir Ahmed", team: "golden-boots", game: "efootball", role: "Solo Player", achievements: ["Bangla League top scorer"] },
];

export const tournaments: Tournament[] = [
  { id: "demo-masters-2026", name: "Demo Masters 2026", game: "valorant", start: "2026-11-10", end: "2026-11-22", status: "Upcoming", prize: "$500,000", teams: ["nova-strikers", "cyan-wolves"], location: "Singapore" },
  { id: "winter-major", name: "Winter Major", game: "counter-strike-2", start: "2026-10-20", end: "2026-11-02", status: "Live", prize: "$1,250,000", teams: ["iron-phoenix", "volt-gaming"], location: "Cologne" },
  { id: "south-asia-series", name: "South Asia Series", game: "pubg-mobile", start: "2026-09-01", end: "2026-09-14", status: "Completed", prize: "$150,000", teams: ["dhaka-dynamos", "royal-raptors"], location: "Dhaka" },
  { id: "ff-national-cup", name: "Free Fire National Cup", game: "free-fire", start: "2026-11-05", end: "2026-11-09", status: "Upcoming", prize: "$60,000", teams: ["blaze-squad", "storm-titans"], location: "Online" },
  { id: "efootball-league", name: "eFootball Bangla League", game: "efootball", start: "2026-10-15", end: "2026-11-15", status: "Live", prize: "$10,000", teams: ["golden-boots"], location: "Online" },
  { id: "demo-worlds", name: "Demo Worlds", game: "league-of-legends", start: "2026-08-01", end: "2026-09-02", status: "Completed", prize: "$2,000,000", teams: ["arcane-five"], location: "Seoul" },
  { id: "dota-invitational", name: "Demo Invitational", game: "dota-2", start: "2026-12-01", end: "2026-12-12", status: "Upcoming", prize: "$800,000", teams: ["shadow-legion"], location: "Riyadh" },
];

export const matches: Match[] = [
  { id: "m1", game: "counter-strike-2", tournament: "winter-major", teamA: "iron-phoenix", teamB: "volt-gaming", scoreA: 1, scoreB: 1, date: "2026-10-27T15:00", status: "Live" },
  { id: "m2", game: "valorant", tournament: "demo-masters-2026", teamA: "nova-strikers", teamB: "cyan-wolves", date: "2026-11-10T12:00", status: "Upcoming" },
  { id: "m3", game: "pubg-mobile", tournament: "south-asia-series", teamA: "dhaka-dynamos", teamB: "royal-raptors", scoreA: 142, scoreB: 118, date: "2026-09-14T18:00", status: "Completed" },
  { id: "m4", game: "free-fire", tournament: "ff-national-cup", teamA: "blaze-squad", teamB: "storm-titans", date: "2026-11-05T16:00", status: "Upcoming" },
  { id: "m5", game: "counter-strike-2", tournament: "winter-major", teamA: "volt-gaming", teamB: "iron-phoenix", scoreA: 16, scoreB: 12, date: "2026-10-22T19:00", status: "Completed" },
  { id: "m6", game: "valorant", tournament: "demo-masters-2026", teamA: "cyan-wolves", teamB: "nova-strikers", scoreA: 11, scoreB: 13, date: "2026-10-01T14:00", status: "Completed" },
  { id: "m7", game: "free-fire", tournament: "ff-national-cup", teamA: "storm-titans", teamB: "blaze-squad", scoreA: 87, scoreB: 95, date: "2026-10-10T14:00", status: "Completed" },
];

export const articles: Article[] = [
  { id: "masters-preview", title: "Demo Masters 2026: What to Expect", category: "Tournaments", game: "valorant", date: "2026-10-25", summary: "A sample preview of the teams and storylines heading into the season's biggest Valorant event.", body: ["This is a sample article for demonstration purposes.", "Nova Strikers enter as favourites after a dominant regional season, while Cyan Wolves bring a refreshed roster and a new coach.", "Group stage matches begin on November 10 with a double-elimination playoff bracket to follow."] },
  { id: "efootball-rise", title: "The Rise of eFootball in South Asia", category: "Community", game: "efootball", date: "2026-10-20", summary: "Sample feature: how grassroots leagues are building a competitive eFootball scene.", body: ["This is a sample article for demonstration purposes.", "Local leagues and university tournaments have grown rapidly, giving solo players a clear path from casual play to organised competition."] },
  { id: "pubg-recap", title: "South Asia Series Recap: Dhaka Dynamos Take the Crown", category: "Results", game: "pubg-mobile", date: "2026-09-15", summary: "A sample recap of the final day of the South Asia Series.", body: ["This is a sample article for demonstration purposes.", "Dhaka Dynamos secured the title with 142 total points, driven by consistent placement and aggressive late-game rotations."] },
  { id: "free-fire-guide", title: "Beginner's Guide to Competitive Free Fire", category: "Guides", game: "free-fire", date: "2026-10-12", summary: "Sample guide covering roles, rotations and how to join your first tournament.", body: ["This is a sample article for demonstration purposes.", "Start by learning one role well, practice with a fixed squad and register for local online cups to gain experience."] },
  { id: "cs2-major-live", title: "Winter Major Playoffs Underway", category: "Tournaments", game: "counter-strike-2", date: "2026-10-26", summary: "Sample coverage: the Winter Major has reached its playoff stage.", body: ["This is a sample article for demonstration purposes.", "Iron Phoenix and Volt Gaming meet again in a rematch of their group stage series."] },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
export const getTeam = (id: string) => teams.find((t) => t.id === id);
export const getPlayer = (id: string) => players.find((p) => p.id === id);
export const getTournament = (id: string) => tournaments.find((t) => t.id === id);
export const getArticle = (id: string) => articles.find((a) => a.id === id);
export const gameName = (slug: string) => getGame(slug)?.name ?? slug;
export const teamName = (id: string) => getTeam(id)?.name ?? id;
export const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
