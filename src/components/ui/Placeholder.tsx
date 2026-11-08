import { ImagePlus } from 'lucide-react';

type Props = { label: string; note?: string; className?: string; compact?: boolean };

/** Clearly marked slot for authentic material still to be supplied. */
export default function Placeholder({ label, note = 'To be supplied', className = '', compact }: Props) {
  return (
    <div
      className={`placeholder-stripes relative flex flex-col items-center justify-center gap-2 border border-dashed border-ice/25 text-center ${className}`}
      role="img"
      aria-label={`Placeholder: ${label}. ${note}.`}
    >
      <ImagePlus className={compact ? 'h-4 w-4 text-ice/70' : 'h-6 w-6 text-ice/70'} aria-hidden="true" />
      <span className={`font-mono uppercase tracking-label text-ice/80 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>{label}</span>
      {!compact && <span className="text-[11px] text-mist">{note}</span>}
    </div>
  );
}
