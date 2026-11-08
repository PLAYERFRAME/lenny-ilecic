# Lenny Ilečić — PLAYERFRAME Player Dossier

Interactive digital football CV for **Lenny Ilečić** (RW / LW / CF · NK Rudeš · GNK Dinamo Zagreb Academy).

**Live:** https://playerframe.github.io/lenny-ilecic/

Single-page, static, no backend. React · TypeScript · Tailwind CSS · Motion · Lucide · Recharts.

## Updating the dossier

Almost every update is a change to **one file**: `src/data/player.ts`.

| What | Where in `player.ts` |
|---|---|
| Season statistics | `season.competitions` |
| Market value, contract, profile | `profile` |
| Achievements | `achievements` |
| Career entries | `career` |
| Media articles | `media` — fill `publisher`, `headline`, `date`, `excerpt`, `url`, `image` |
| Video highlights | `videos` — set `src` to the video file URL and `duration` |
| Representation contact | `contact.agent` |

Placeholders disappear automatically when a field is filled. Never add unverified facts, quotes or links.

**New photos:** put the original in `photos-source/`, add a line to `scripts/optimise-images.mjs`, run `npm run images`, then import it at the top of `player.ts`.

**Videos:** keep reels small (H.264 MP4, 1080p, under ~50 MB) in `public/videos/` and reference them as `./videos/name.mp4`, or link to externally hosted MP4 files.

## Publishing

Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`). The URL never changes.

## Local development

```bash
npm install
npm run dev          # local preview
npm run build        # production build -> dist/
npm run build:single # one self-contained HTML file -> dist-single/
```

## Additional players (PLAYERFRAME)

Each player gets their own repository under the PLAYERFRAME organization, so each has a permanent URL of the form `https://playerframe.github.io/<player-slug>/`.
To add a player: create a new repo from this one (mark this repo as a GitHub *template*), replace `src/data/player.ts` and `photos-source/`, and push. Design, components and deployment carry over unchanged.
