// Line-up / schedule section with admin editing

function LineUp({ admin, onEdit, onAdd }) {
  const s = useStore();
  const sorted = [...s.lineup].sort((a, b) => a.time.localeCompare(b.time));
  const stages = {
    main: { label: 'Hoofdpodium', cls: 'bf-gig__stage--main' },
    tuin: { label: 'Tuinpodium', cls: '' },
    after: { label: 'After', cls: 'bf-gig__stage--after' },
  };

  return (
    <section id="lineup" className="bf-section bf-section--orange">
      <div className="bf-section__head">
        <span className="bf-section__eye">Line-up · Programma 2026</span>
        <h2 style={{ color: 'var(--bf-ink)' }}>Wie speelt er <br/>in de tuin.</h2>
        <p className="bf-lead" style={{ maxWidth: 540, margin: '14px auto 0', color: 'var(--bf-ink)' }}>
          14:00 — 00:00. Eén dag, twee podia, een hoop bier. Line-up wordt nog aangevuld.
        </p>
      </div>

      <div className="bf-schedule">
        <div className="bf-schedule__head">
          <span>Tijd</span>
          <span>Artiest</span>
          <span>Podium</span>
          <span></span>
        </div>
        {sorted.map(g => (
          <div className="bf-gig" key={g.id}>
            <div className="bf-gig__time">{g.time}</div>
            <div>
              <div className="bf-gig__name">{g.name}</div>
              {g.note && <div className="bf-gig__note">{g.note}</div>}
            </div>
            <div>
              <span className={'bf-gig__stage ' + (stages[g.stage]?.cls || '')}>
                {g.stage === 'after' && <Icon name="sun" size={11} />}
                {stages[g.stage]?.label || 'Podium'}
              </span>
            </div>
            <div>
              {admin && (
                <button className="bf-gig__edit" onClick={() => onEdit(g)} title="Bewerk">
                  <Icon name="edit" size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="bf-schedule__foot">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <HeartClover size={20} /> {sorted.length} acts · 5 sept · St. Michaëlstraat 8
          </span>
          {admin
            ? (
              <button className="bf-schedule__add" onClick={onAdd}>
                <Icon name="plus" size={14} /> Voeg act toe
              </button>
            ) : (
              <span style={{ color: 'var(--bf-mute)', fontWeight: 600 }}>
                Wijzigingen voorbehouden
              </span>
            )
          }
        </div>
      </div>
    </section>
  );
}

window.LineUp = LineUp;
