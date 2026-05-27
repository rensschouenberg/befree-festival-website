// Admin: floating toggle, banner, gig editor modal, photo upload helpers

function AdminBar({ admin, setAdmin }) {
  return (
    <div className="bf-admin-bar">
      <button
        className={'bf-admin-toggle ' + (admin ? 'on' : '')}
        onClick={() => setAdmin(!admin)}
        title="Toggle admin mode"
      >
        <span className="led"></span>
        {admin ? 'Klaar' : 'Beheer'}
      </button>
    </div>
  );
}

function AdminBanner({ onReset }) {
  return (
    <div className="bf-admin-banner">
      <span style={{ marginRight: 16 }}>● Beheer aan — klik <Icon name="edit" size={11} /> om acts te bewerken · sleep foto's of klik upload</span>
      <button
        onClick={onReset}
        style={{
          background: 'transparent', border: '2px dashed var(--bf-ink)',
          padding: '4px 10px', borderRadius: 999, fontFamily: 'var(--bf-font-display)',
          fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer', textTransform: 'uppercase'
        }}
      >
        Reset naar voorbeeld
      </button>
    </div>
  );
}

// Modal for editing / adding a gig
function GigModal({ open, gig, onClose, onSave, onDelete }) {
  const [form, setForm] = React.useState(gig || { time: '14:00', name: '', note: '', stage: 'main' });
  React.useEffect(() => {
    setForm(gig || { time: '14:00', name: '', note: '', stage: 'main' });
  }, [gig, open]);

  if (!open) return null;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="bf-modal" onClick={onClose}>
      <div className="bf-modal__card bf-modal__card--lg" onClick={e => e.stopPropagation()}>
        <button className="bf-modal__close" onClick={onClose}><Icon name="close" size={14} /></button>
        <h3 className="bf-modal__title">{gig?.id ? 'Act bewerken' : 'Nieuwe act'}</h3>

        <div className="bf-formrow__inline">
          <div className="bf-formrow">
            <label>Tijd</label>
            <input className="bf-field" type="time" value={form.time} onChange={e => update('time', e.target.value)} />
          </div>
          <div className="bf-formrow">
            <label>Podium</label>
            <select className="bf-field" value={form.stage} onChange={e => update('stage', e.target.value)}>
              <option value="main">Hoofdpodium</option>
              <option value="tuin">Tuinpodium</option>
              <option value="after">After</option>
            </select>
          </div>
        </div>

        <div className="bf-formrow">
          <label>Artiest / naam</label>
          <input className="bf-field" type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Naam van de act" />
        </div>

        <div className="bf-formrow">
          <label>Korte beschrijving (optioneel)</label>
          <input className="bf-field" type="text" value={form.note || ''} onChange={e => update('note', e.target.value)} placeholder="Indie folk uit Tegelen" />
        </div>

        <div className="bf-modal__actions">
          {gig?.id ? (
            <button
              onClick={() => onDelete(gig.id)}
              className="bf-btn"
              style={{ background: 'var(--bf-ink)', color: 'var(--bf-bone)' }}
            >
              <Icon name="trash" size={14} /> Verwijder
            </button>
          ) : <span/>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="bf-btn bf-btn--ghost" onClick={onClose}>Annuleren</button>
            <button
              className="bf-btn bf-btn--primary"
              disabled={!form.name.trim()}
              onClick={() => onSave({
                ...form,
                id: form.id || 'g_' + Date.now().toString(36),
                name: form.name.trim(),
                note: (form.note || '').trim(),
              })}
            >
              Opslaan <Icon name="check" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Photo upload modal — file picker + year tag
function PhotoUploadModal({ open, onClose, onSave }) {
  const [files, setFiles] = React.useState([]); // [{src, year}]
  const [year, setYear] = React.useState('Editie 2025');
  const inputRef = React.useRef(null);

  React.useEffect(() => { if (open) setFiles([]); }, [open]);

  if (!open) return null;

  const handleFiles = async (fileList) => {
    const arr = Array.from(fileList).slice(0, 12);
    const processed = await Promise.all(arr.map(f => readAndCompress(f)));
    setFiles(prev => [...prev, ...processed.filter(Boolean).map(src => ({ src, year }))]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="bf-modal" onClick={onClose}>
      <div
        className="bf-modal__card bf-modal__card--lg"
        onClick={e => e.stopPropagation()}
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
      >
        <button className="bf-modal__close" onClick={onClose}><Icon name="close" size={14} /></button>
        <h3 className="bf-modal__title">Foto's uploaden</h3>

        <div className="bf-formrow">
          <label>Editie / jaar</label>
          <input className="bf-field" value={year} onChange={e => setYear(e.target.value)} />
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleFiles(e.target.files)}
        />

        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: '3px dashed var(--bf-ink)',
            borderRadius: 16,
            padding: 32,
            textAlign: 'center',
            cursor: 'pointer',
            background: 'var(--bf-orange-tint)',
            fontFamily: 'var(--bf-font-display)',
            textTransform: 'uppercase',
            fontSize: 14,
            letterSpacing: '0.04em',
          }}
        >
          <Icon name="upload" size={32} /><br/>
          Kies foto's of sleep ze hierheen<br/>
          <small style={{ fontFamily: 'var(--bf-font-body)', fontSize: 12, letterSpacing: 0, textTransform: 'none', color: 'var(--bf-mute)' }}>
            JPG/PNG, automatisch verkleind voor de browser
          </small>
        </div>

        {files.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 18 }}>
            {files.map((f, i) => (
              <div key={i} style={{ border: '2px solid var(--bf-ink)', borderRadius: 10, overflow: 'hidden', aspectRatio: '1', background: 'var(--bf-bone)' }}>
                <img src={f.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}

        <div className="bf-modal__actions">
          <span style={{ fontSize: 13, color: 'var(--bf-mute)' }}>
            {files.length} foto{files.length !== 1 ? "'s" : ''} klaar
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="bf-btn bf-btn--ghost" onClick={onClose}>Annuleren</button>
            <button
              className="bf-btn bf-btn--primary"
              disabled={files.length === 0}
              onClick={() => { onSave(files.map(f => ({ ...f, year }))); onClose(); }}
            >
              Toevoegen <Icon name="check" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Resize images to max 1400px wide and JPEG-encode at 0.82 for localStorage friendliness
async function readAndCompress(file) {
  if (!file.type.startsWith('image/')) return null;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const max = 1400;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => resolve(null);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

window.AdminBar = AdminBar;
window.AdminBanner = AdminBanner;
window.GigModal = GigModal;
window.PhotoUploadModal = PhotoUploadModal;
