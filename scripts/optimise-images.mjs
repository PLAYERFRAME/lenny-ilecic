// Converts the original photographs in /photos-source into optimised WebP files
// used by the site. Add a new photo: drop it in photos-source, add a line below, run `npm run images`.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/assets/photos';
mkdirSync(OUT, { recursive: true });

const jobs = [
  ['IMG_3387.jpg', 'hero-night', 1500],
  ['IMG_2813.jpg', 'portrait-crowd', 1300],
  ['IMG_3069.PNG', 'portrait-floodlight', 1500],
  ['IMG_2815.jpg', 'dribble-red', 1400],
  ['IMG_2816.jpg', 'duel-red', 1300],
  ['IMG_2897.JPG', 'duel-maksimir', 1400],
  ['IMG_2910.jpg', 'aerial-red', 1300],
  ['IMG_3044.jpg', 'run-blue', 1300],
  ['IMG_3051.jpg', 'strike-blue', 1300],
];

for (const [src, name, max] of jobs) {
  const info = await sharp(`photos-source/${src}`)
    .rotate()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
