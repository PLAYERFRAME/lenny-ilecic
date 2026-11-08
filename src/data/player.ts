/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LENNY ILEČIĆ — SINGLE SOURCE OF TRUTH
 *  Every fact on the site comes from this file. Update figures, add media
 *  articles, videos or career entries here; the interface updates itself.
 *
 *  Rules for this file:
 *   • Only verified / supplied information. Never invent stats, quotes or links.
 *   • `verified: false` or `source: 'player-provided'` keeps the on-site labels honest.
 *   • Fields left `null` render as clearly marked placeholders.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import heroNight from '../assets/photos/hero-night.webp';
import portraitCrowd from '../assets/photos/portrait-crowd.webp';
import portraitFloodlight from '../assets/photos/portrait-floodlight.webp';
import dribbleRed from '../assets/photos/dribble-red.webp';
import duelRed from '../assets/photos/duel-red.webp';
import duelMaksimir from '../assets/photos/duel-maksimir.webp';
import aerialRed from '../assets/photos/aerial-red.webp';
import runBlue from '../assets/photos/run-blue.webp';
import strikeBlue from '../assets/photos/strike-blue.webp';

export const photos = {
  heroNight,
  portraitCrowd,
  portraitFloodlight,
  dribbleRed,
  duelRed,
  duelMaksimir,
  aerialRed,
  runBlue,
  strikeBlue,
};

/* ── Identity ─────────────────────────────────────────────────────────────── */

export const profile = {
  firstName: 'Lenny',
  lastName: 'Ilečić',
  /** Surname as shown in the large display headline (no diacritics, by choice). */
  displayLastName: 'Ilecic',
  fullName: 'Lenny Ilečić',
  nationality: 'Croatia',
  dateOfBirth: '2004-06-10',
  dateOfBirthLabel: '10 June 2004',
  heightCm: 180,
  preferredFoot: 'Left',
  primaryPosition: { code: 'RW', name: 'Right Winger' },
  secondaryPositions: [
    { code: 'LW', name: 'Left Winger' },
    { code: 'CF', name: 'Centre-Forward' },
  ],
  currentClub: 'NK Rudeš',
  league: 'SuperSport HNL',
  leagueDescription: 'Croatian First Division',
  contractExpiry: '31 May 2028',
  marketValue: { display: '€350K', full: '€350,000', source: 'Transfermarkt', date: '30 September 2026' },
  topSpeed: { value: 36.2, unit: 'km/h', source: 'player-provided' as const },
  academy: 'GNK Dinamo Zagreb',
  playingStyle: [
    'Explosive pace',
    'Attacking depth',
    'Direct vertical movement',
    'Close ball control',
    'Intelligent off-ball runs',
    'Clinical finishing',
  ],
};

/** Age is calculated from date of birth so it never goes stale. */
export function getAge(dob = profile.dateOfBirth, today = new Date()): number {
  const d = new Date(dob);
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

/* ── Navigation ───────────────────────────────────────────────────────────── */

export const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'academy', label: 'Academy' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'performance', label: 'Performance' },
  { id: 'career', label: 'Career' },
  { id: 'media', label: 'Media' },
  { id: 'highlights', label: 'Highlights' },
] as const;

/* ── Dinamo Zagreb Academy ───────────────────────────────────────────────── */

export const academy = {
  club: 'GNK Dinamo Zagreb',
  summary:
    'Lenny developed through the GNK Dinamo Zagreb youth system, progressing through the academy and competing at domestic and international youth level.',
  /** Pathway milestones. Order is thematic, not dated, except where a season is supplied. */
  milestones: [
    { label: 'Academy development', detail: 'Progressed through the GNK Dinamo Zagreb youth system.', season: null },
    { label: 'Dinamo Zagreb U18 — Top scorer', detail: 'Finished as the U18 side’s leading goalscorer.', season: null },
    { label: 'International youth tournaments', detail: 'Top scorer at the Mladen Ramljak Memorial and the Zlatibor International Tournament.', season: '2022' },
    { label: 'Croatian U19 Champions', detail: 'National U19 title with GNK Dinamo Zagreb.', season: '2022/23' },
    { label: 'UEFA Youth League', detail: 'Appearances in Europe’s elite club youth competition.', season: null },
    { label: 'Premier League International Cup', detail: 'Appearances in the U21 competition against English academy sides.', season: null },
  ],
  honours: [
    { value: 'U19', label: 'Croatian Champion', sub: '2022/23' },
    { value: 'U18', label: 'Top scorer', sub: 'Dinamo Zagreb' },
    { value: 'UYL', label: 'UEFA Youth League', sub: 'Appearances' },
    { value: 'PLIC', label: 'PL International Cup', sub: 'U21 appearances' },
  ],
};

/* ── Achievements ─────────────────────────────────────────────────────────── */

export type Achievement = {
  id: string;
  year: string | null;
  title: string;
  award: string;
  description: string;
  category: 'Individual award' | 'Team title' | 'Match performance' | 'Competition';
  stat?: { value: string; label: string };
  /** Future assets — leave null until authentic material is supplied. */
  media: { photo: string | null; footageUrl: string | null; pressUrl: string | null };
};

export const achievements: Achievement[] = [
  {
    id: 'ramljak',
    year: '2022',
    title: 'Mladen Ramljak Memorial Tournament',
    award: 'Top Scorer',
    description: 'Finished as the tournament’s leading goalscorer at one of Croatia’s established international youth tournaments.',
    category: 'Individual award',
    stat: { value: '01', label: 'Golden boot' },
    media: { photo: null, footageUrl: null, pressUrl: null },
  },
  {
    id: 'zlatibor',
    year: '2022',
    title: 'Zlatibor International Tournament',
    award: 'Top Scorer',
    description: 'Leading goalscorer at the Zlatibor international youth tournament, the second tournament scoring award of 2022.',
    category: 'Individual award',
    stat: { value: '02', label: 'Golden boots in 2022' },
    media: { photo: null, footageUrl: null, pressUrl: null },
  },
  {
    id: 'red-star',
    year: null,
    title: 'Hat-trick against Red Star Belgrade',
    award: 'Three goals',
    description: 'A three-goal performance against Crvena zvezda.',
    category: 'Match performance',
    stat: { value: '3', label: 'Goals in one match' },
    media: { photo: null, footageUrl: null, pressUrl: null },
  },
  {
    id: 'u19',
    year: '2022/23',
    title: 'Croatian U19 Championship',
    award: 'Champions',
    description: 'National U19 champions with GNK Dinamo Zagreb.',
    category: 'Team title',
    stat: { value: 'U19', label: 'National title' },
    media: { photo: null, footageUrl: null, pressUrl: null },
  },
  {
    id: 'uyl',
    year: null,
    title: 'UEFA Youth League',
    award: 'International experience',
    description: 'Appearances in UEFA’s club youth competition, against the academies of Europe’s leading clubs.',
    category: 'Competition',
    stat: { value: 'UYL', label: 'European youth football' },
    media: { photo: null, footageUrl: null, pressUrl: null },
  },
];

/* ── Current season ───────────────────────────────────────────────────────── */

export type StatLine = { appearances: number; goals: number; assists: number; minutes: number };

export const season = {
  label: '2026/27',
  club: 'NK Rudeš',
  note: 'Season in progress',
  competitions: [
    { id: 'hnl', name: 'SuperSport HNL', short: 'HNL', stats: { appearances: 11, goals: 2, assists: 2, minutes: 523 } },
    { id: 'cup', name: 'Croatian Cup', short: 'Cup', stats: { appearances: 1, goals: 1, assists: 0, minutes: 30 } },
  ] as { id: string; name: string; short: string; stats: StatLine }[],
};

export function combinedStats(): StatLine {
  return season.competitions.reduce(
    (acc, c) => ({
      appearances: acc.appearances + c.stats.appearances,
      goals: acc.goals + c.stats.goals,
      assists: acc.assists + c.stats.assists,
      minutes: acc.minutes + c.stats.minutes,
    }),
    { appearances: 0, goals: 0, assists: 0, minutes: 0 },
  );
}

/* ── Scouting attributes (player-provided) ───────────────────────────────── */

export const attributes = {
  source: 'Player-provided scouting assessment',
  disclaimer: 'Shown for orientation only. These are not independently verified or official ratings.',
  items: [
    { name: 'Finishing', short: 'Finishing', score: 9 },
    { name: 'Ball Control', short: 'Ball control', score: 9 },
    { name: 'Runs Into Space', short: 'Runs', score: 9 },
    { name: 'Vertical Space Progression', short: 'Vertical prog.', score: 9 },
    { name: 'Combination Play', short: 'Combination', score: 7 },
    { name: 'Defensive Contribution', short: 'Defending', score: 6 },
  ],
};

/* ── Career ───────────────────────────────────────────────────────────────── */

export type CareerEntry = {
  id: string;
  club: string;
  monogram: string;
  period: string;
  level: string;
  competition: string;
  summary: string;
  points: string[];
  current?: boolean;
  photo?: string;
};

export const career: CareerEntry[] = [
  {
    id: 'dinamo',
    club: 'GNK Dinamo Zagreb Academy',
    monogram: 'DZ',
    period: 'Youth',
    level: 'Academy',
    competition: 'Croatian youth leagues · UEFA Youth League · Premier League International Cup',
    summary: 'Youth development, international competitions and individual achievements.',
    points: [
      'Croatian U19 Champion 2022/23',
      'Dinamo Zagreb U18 top scorer',
      'Top scorer: Mladen Ramljak Memorial and Zlatibor tournaments (2022)',
      'UEFA Youth League and Premier League International Cup U21 appearances',
    ],
  },
  {
    id: 'gorica',
    club: 'HNK Gorica',
    monogram: 'HG',
    period: '2023 – 2024',
    level: 'Senior',
    competition: 'Croatian First Division',
    summary: 'First senior steps, with Croatian First Division experience.',
    points: ['Croatian First Division experience'],
  },
  {
    id: 'rudes',
    club: 'NK Rudeš',
    monogram: 'RU',
    period: '2026 – Present',
    level: 'Senior',
    competition: 'SuperSport HNL',
    summary: 'Promotion to the Croatian First Division and continued professional development.',
    points: [
      '2026/27: 12 appearances, 3 goals, 2 assists in all competitions',
      'Contract until 31 May 2028',
    ],
    current: true,
    photo: duelRed,
  },
];

/* ── Media ────────────────────────────────────────────────────────────────── */

export type MediaItem = {
  id: string;
  topic: 'Tournaments' | 'Academy' | 'Professional';
  /** What the story is about — used only while the item is a placeholder. */
  storyBrief: string;
  publisher: string | null;
  publisherLogo: string | null;
  headline: string | null;
  date: string | null;
  image: string | null;
  excerpt: string | null;
  url: string | null;
};

const emptyArticle = { publisher: null, publisherLogo: null, headline: null, date: null, image: null, excerpt: null, url: null };

export const media: MediaItem[] = [
  { id: 'm-ramljak', topic: 'Tournaments', storyBrief: 'Mladen Ramljak Tournament — top-scorer coverage', ...emptyArticle },
  { id: 'm-zlatibor', topic: 'Tournaments', storyBrief: 'Zlatibor Tournament — top-scorer coverage', ...emptyArticle },
  { id: 'm-redstar', topic: 'Academy', storyBrief: 'Hat-trick against Red Star Belgrade', ...emptyArticle },
  { id: 'm-zidane', topic: 'Academy', storyBrief: 'Media comparison involving Zinedine Zidane and goalscoring statistics', ...emptyArticle },
  { id: 'm-dinamo', topic: 'Academy', storyBrief: 'Dinamo Zagreb academy performances', ...emptyArticle },
  { id: 'm-rudes', topic: 'Professional', storyBrief: 'Professional career and NK Rudeš coverage', ...emptyArticle },
];

/* ── Video highlights ─────────────────────────────────────────────────────── */

export type VideoItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  /** Poster is an authentic photograph of Lenny, used only as a cover. */
  poster: string;
  /** Video file URL (mp4) or null until authentic footage is supplied. */
  src: string | null;
  duration: string | null;
};

export const videos: VideoItem[] = [
  { id: 'reel', category: 'Main reel', title: 'Professional highlight reel', description: 'The complete showreel: goals, assists, pace and decisive actions.', poster: heroNight, src: null, duration: null },
  { id: 'goals', category: 'Goals', title: 'Goals', description: 'Every goal, with build-up and finish.', poster: strikeBlue, src: null, duration: null },
  { id: 'assists', category: 'Assists', title: 'Assists', description: 'Final passes and cut-backs leading to goals.', poster: duelRed, src: null, duration: null },
  { id: 'speed', category: 'Speed & acceleration', title: 'Speed & acceleration', description: 'Sprints in behind, recovery runs and transitions.', poster: portraitFloodlight, src: null, duration: null },
  { id: 'dribbling', category: 'Dribbling & control', title: 'Dribbling & ball control', description: 'Close control in tight spaces and 1v1 situations.', poster: dribbleRed, src: null, duration: null },
  { id: 'runs', category: 'Off-ball runs', title: 'Off-ball attacking runs', description: 'Movement to attack depth and the far post.', poster: runBlue, src: null, duration: null },
  { id: 'finishing', category: 'Finishing', title: 'Finishing', description: 'Shots and finishes from inside and outside the box.', poster: aerialRed, src: null, duration: null },
  { id: 'matches', category: 'Match highlights', title: 'Match-specific highlights', description: 'Full-match cut-downs, game by game.', poster: duelMaksimir, src: null, duration: null },
];

/* ── Contact / representation ─────────────────────────────────────────────── */

export const contact = {
  /** Add verified representation details when available. */
  agent: null as null | { name: string; email: string; phone?: string },
};
