// Hero section

function Hero({ onLineup, onScrollNext, meta }) {
  // Countdown to festival date
  const target = new Date('2026-09-05T14:00:00+02:00').getTime();
  const [tick, setTick] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - tick);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return (
    <section id="top" className="bf-hero">
      <div className="bf-hero__sticker bf-hero__sticker--big" aria-hidden="true">
        <HeartClover size={420} rotate={14} />
      </div>
      <div className="bf-hero__sticker bf-hero__sticker--sm" aria-hidden="true">
        <HeartClover size={120} rotate={-22} />
      </div>

      <div className="bf-hero__inner">
        <div className="bf-hero__top">
          <span className="bf-hero__chip">
            <span className="dot"></span> Editie #06 · Steyl
          </span>
          <span className="bf-hero__chip" style={{ background: 'var(--bf-paper)', color: 'var(--bf-ink)' }}>
            <Icon name="calendar" size={14} /> Zat 5 sept · 14:00 — 00:00
          </span>
        </div>

        <span className="bf-eyebrow">Indie · Lokaal · Gratis toegang</span>
        <h1 className="bf-hero__title">
          BeFree <span className="year">2026</span>
        </h1>

        <div className="bf-hero__meta">
          <Icon name="pin" size={16} />
          <span>St. Michaëlstraat 8</span>
          <span className="bf-dot">·</span>
          <span>Steyl</span>
          <span className="bf-dot">·</span>
          <span>Achter het Wereldpaviljoen</span>
        </div>

        <div className="bf-hero__actions">
          <a className="bf-btn bf-btn--primary bf-btn--lg" href="#lineup" onClick={(e) => { e.preventDefault(); onLineup(); }}>
            Bekijk de line-up <Icon name="arrow" />
          </a>
          <a className="bf-btn bf-btn--dark bf-btn--lg" href="#befriends" onClick={(e) => { e.preventDefault(); onScrollNext('befriends'); }}>
            Word BeFriend <Icon name="heart" />
          </a>
        </div>

        <div className="bf-hero__count" aria-label="Aftellen">
          {[
            { n: d, l: 'Dagen' },
            { n: h, l: 'Uren' },
            { n: m, l: 'Min' },
            { n: s, l: 'Sec' },
          ].map((c, i) => (
            <div className="bf-count" key={i}>
              <span className="bf-count__num">{String(c.n).padStart(2, '0')}</span>
              <span className="bf-count__lab">{c.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
