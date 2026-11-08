import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { attributes } from '../data/player';

/** Lazy-loaded so the charting library never slows the first paint. */
export default function RadarView() {
  const data = attributes.items.map((a) => ({ attr: a.short, score: a.score }));
  return (
    <div className="h-[360px] w-full" role="img" aria-label={`Radar chart: ${attributes.items.map((a) => `${a.name} ${a.score} of 10`).join(', ')}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%" margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="rgba(196,214,255,0.12)" />
          <PolarAngleAxis dataKey="attr" tick={{ fill: '#C9D2E3', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} />
          <PolarRadiusAxis domain={[0, 10]} tickCount={6} tick={{ fill: '#5A6580', fontSize: 9 }} axisLine={false} angle={90} />
          <Radar dataKey="score" stroke="#8FD3FF" strokeWidth={2} fill="#3B8DFF" fillOpacity={0.28} isAnimationActive animationDuration={900} dot={{ r: 3, fill: '#8FD3FF' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
