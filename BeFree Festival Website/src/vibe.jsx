// Vibe / photo gallery section

function PhotoPlaceholder({ mood }) {
  // Generated warm "vibe" SVG, no real photo
  const id = 'g-' + Math.random().toString(36).slice(2, 8);
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id={id} cx="30%" cy="80%" r="90%">
          <stop offset="0%" stopColor={mood.accent} stopOpacity="0.85" />
          <stop offset="60%" stopColor={mood.hue} stopOpacity="1" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.85" />
        </radialGradient>
        <filter id={id + 'n'}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="300" fill={'url(#' + id + ')'} />
      {/* silhouettes of a crowd */}
      <g opacity="0.75" fill="#0a0a0a">
        <ellipse cx="60" cy="280" rx="50" ry="60" />
        <ellipse cx="120" cy="280" rx="55" ry="70" />
        <ellipse cx="200" cy="282" rx="60" ry="80" />
        <ellipse cx="280" cy="280" rx="55" ry="65" />
        <ellipse cx="350" cy="282" rx="65" ry="78" />
        <circle cx="60" cy="220" r="14" />
        <circle cx="120" cy="208" r="16" />
        <circle cx="200" cy="200" r="18" />
        <circle cx="280" cy="212" r="16" />
        <circle cx="350" cy="206" r="17" />
        {/* raised hands */}
        <path d="M55 190 Q50 160 60 150 Q70 158 65 190" />
        <path d="M210 185 Q205 145 218 138 Q230 148 222 188" />
        <path d="M340 188 Q336 152 348 145 Q360 156 352 190" />
      </g>
      {/* light spot */}
      <circle cx="320" cy="60" r="48" fill={mood.accent} opacity="0.55" />
      <rect width="400" height="300" fill="#000" opacity="0.05" filter={'url(#' + id + 'n)'} />
    </svg>
  );
}

function Vibe({ admin, onUpload, onDelete }) {
  const s = useStore();
  const years = Array.from(new Set(s.photos.map(p => p.year))).sort().reverse();
  const [active, setActive] = React.useState('Alles');
  const [lightbox, setLightbox] = React.useState(null);

  const shown = active === 'Alles' ? s.photos : s.photos.filter(p => p.year === active);

  // Auto-assigned layout sizes for uploaded photos (no explicit size)
  const layoutPattern = ['big', 'tall', 'sm', 'wide', 'rect', 'sq', 'sm'];

  return (
    <section id="sfeer" className="bf-section bf-vibe">
      <div className="bf-vibe__head">
        <div>
          <span className="bf-section__eye">Sfeer · Beleving</span>
          <h2>De tuin, <br/>vorige edities.</h2>
        </div>
        <div className="bf-vibe__filters">
          {['Alles', ...years].map(y => (
            <button
              key={y}
              className={'bf-vibe__pill ' + (active === y ? 'is-active' : '')}
              onClick={() => setActive(y)}
            >
              {y}
            </button>
          ))}
          {admin && (
            <button className="bf-vibe__pill" onClick={onUpload} style={{ background: 'var(--bf-orange)', color: 'var(--bf-ink)', borderColor: 'var(--bf-orange)' }}>
              <Icon name="upload" size={13} /> &nbsp;Upload
            </button>
          )}
        </div>
      </div>

      <div className="bf-gallery">
        {shown.map((p, i) => {
          const size = p.size || layoutPattern[i % layoutPattern.length];
          const isPlaceholder = p.src === '__placeholder__';
          return (
            <div
              key={p.id}
              className={'bf-photo bf-photo--' + size + (isPlaceholder ? ' bf-photo--placeholder' : '')}
              onClick={() => !admin && setLightbox(p)}
            >
              {isPlaceholder
                ? <PhotoPlaceholder mood={p.mood} />
                : <img src={p.src} alt="" loading="lazy" />
              }
              <span className="bf-photo__tag">{p.year}</span>
              {admin && (
                <button className="bf-photo__del" onClick={(e) => { e.stopPropagation(); onDelete(p.id); }} title="Verwijder">
                  <Icon name="trash" size={14} />
                </button>
              )}
            </div>
          );
        })}
        {admin && (
          <button className={'bf-uploadcard bf-photo--' + 'sm'} onClick={onUpload}>
            <Icon name="upload" size={36} />
            <span>Foto toevoegen</span>
          </button>
        )}
      </div>

      {!admin && (
        <p style={{ textAlign: 'center', marginTop: 36, color: 'rgba(247,239,226,0.6)', fontSize: 14 }}>
          Klik een foto om groot te bekijken · Sfeerbeelden uit eerdere edities
        </p>
      )}

      {lightbox && !admin && (
        <div className="bf-lightbox" onClick={() => setLightbox(null)}>
          {lightbox.src === '__placeholder__'
            ? (
              <div style={{ width: 'min(900px, 95vw)', aspectRatio: '4/3', border: '4px solid var(--bf-bone)', borderRadius: 12, overflow: 'hidden' }}>
                <PhotoPlaceholder mood={lightbox.mood} />
              </div>
            ) : (
              <img src={lightbox.src} alt="" />
            )
          }
        </div>
      )}
    </section>
  );
}

window.Vibe = Vibe;
window.PhotoPlaceholder = PhotoPlaceholder;
