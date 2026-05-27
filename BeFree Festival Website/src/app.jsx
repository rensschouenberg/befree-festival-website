// Root app

function App() {
  const [active, setActive] = React.useState('top');
  const [admin, setAdmin] = React.useState(false);
  const [editGig, setEditGig] = React.useState(null);
  const [showGigModal, setShowGigModal] = React.useState(false);
  const [showUpload, setShowUpload] = React.useState(false);

  const onNav = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Scroll-spy for nav highlight
  React.useEffect(() => {
    const ids = ['top', 'over', 'sfeer', 'info', 'lineup', 'befriends', 'sponsors'];
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) { setActive(ids[i]); return; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gig editing
  const saveGig = (gig) => {
    window.store.set(s => {
      const exists = s.lineup.some(x => x.id === gig.id);
      return {
        ...s,
        lineup: exists ? s.lineup.map(x => x.id === gig.id ? gig : x) : [...s.lineup, gig],
      };
    });
    setShowGigModal(false);
    setEditGig(null);
  };
  const deleteGig = (id) => {
    if (!confirm('Deze act verwijderen?')) return;
    window.store.set(s => ({ ...s, lineup: s.lineup.filter(x => x.id !== id) }));
    setShowGigModal(false);
    setEditGig(null);
  };

  // Photos
  const addPhotos = (newOnes) => {
    window.store.set(s => ({
      ...s,
      photos: [
        ...newOnes.map((p, i) => ({ id: 'p_' + Date.now().toString(36) + '_' + i, src: p.src, year: p.year })),
        ...s.photos,
      ],
    }));
  };
  const deletePhoto = (id) => {
    window.store.set(s => ({ ...s, photos: s.photos.filter(p => p.id !== id) }));
  };

  return (
    <>
      {admin && <AdminBanner onReset={() => { if (confirm('Alle wijzigingen verwijderen?')) window.store.reset(); }} />}
      <div className={admin ? 'bf-admin' : ''}>
        <NavBar active={active} onNav={onNav} />

        <Hero onLineup={() => onNav('lineup')} onScrollNext={onNav} />

        <Marquee
          items={['BeFree 2026', '5 september · Steyl', 'Gratis toegang', 'Line-up dropt binnenkort', 'Word BeFriend']}
          tilt={-1.5}
        />

        <About />

        <Vibe
          admin={admin}
          onUpload={() => setShowUpload(true)}
          onDelete={deletePhoto}
        />

        <Marquee
          items={['Achter het Wereldpaviljoen', '14:00 — 00:00', 'Eén dag, twee podia', 'Een hoop bier']}
          tilt={1.2}
          dark
        />

        <InfoSection />

        <LineUp
          admin={admin}
          onEdit={(g) => { setEditGig(g); setShowGigModal(true); }}
          onAdd={() => { setEditGig(null); setShowGigModal(true); }}
        />

        <BeFriends onScrollNext={onNav} />

        <Sponsors />

        <Footer />
      </div>

      <AdminBar admin={admin} setAdmin={setAdmin} />

      <GigModal
        open={showGigModal}
        gig={editGig}
        onClose={() => { setShowGigModal(false); setEditGig(null); }}
        onSave={saveGig}
        onDelete={deleteGig}
      />

      <PhotoUploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onSave={addPhotos}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
