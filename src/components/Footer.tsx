import { ArrowUp } from 'lucide-react';
import { contact, getAge, profile } from '../data/player';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink-900 pb-10 pt-20">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="display text-[clamp(3.2rem,10vw,7rem)] leading-[0.85]">
              Lenny
              <br />
              <span className="text-ice">Ilečić</span>
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
              {profile.primaryPosition.name} · {profile.nationality} · {getAge()} · {profile.preferredFoot}-footed · {profile.currentClub}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="label mb-4">Representation &amp; enquiries</h2>
            {contact.agent ? (
              <div className="space-y-1 text-[14px]">
                <p className="font-semibold">{contact.agent.name}</p>
                <p className="select-all text-mist">{contact.agent.email}</p>
                {contact.agent.phone && <p className="select-all text-mist">{contact.agent.phone}</p>}
              </div>
            ) : (
              <p className="rounded-sm border border-dashed border-ice/25 p-4 text-[13px] leading-relaxed text-mist">
                Verified contact details for clubs and agents will appear here.
              </p>
            )}
          </div>

          <div className="md:col-span-3">
            <h2 className="label mb-4">Data notes</h2>
            <ul className="space-y-2.5 text-[12.5px] leading-relaxed text-mist">
              <li>Market value: {profile.marketValue.full}, {profile.marketValue.source}, {profile.marketValue.date}.</li>
              <li>Top speed ({profile.topSpeed.value} km/h): player-provided figure.</li>
              <li>Attribute ratings: player-provided self-assessment, not official ratings.</li>
              <li>Contract expiry: {profile.contractExpiry}.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-haze">Player Dossier · Version 1 · Updated November 2026</p>
          <a href="#overview" className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mist transition-colors hover:text-ice">
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
