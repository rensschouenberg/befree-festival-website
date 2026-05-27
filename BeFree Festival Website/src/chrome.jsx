// Shared UI: Marquee, NavBar, button helpers

function Marquee({ items, dark = false, tilt = 0 }) {
  const tripled = [...items, ...items, ...items, ...items];
  return (
    <div
      className={'bf-strip ' + (dark ? 'bf-strip--dark' : '')}
      style={tilt ? { transform: `rotate(${tilt}deg)`, transformOrigin: 'center' } : null}
    >
      <div className="bf-strip__track">
        {tripled.map((t, i) => (
          <span key={i}>
            {t}
            <span style={{ display: 'inline-block', verticalAlign: '-0.18em', marginLeft: 18, marginRight: 18 }}>
              <HeartClover size={28} rotate={i % 2 ? -6 : 8} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function NavBar({ active, onNav, onTickets }) {
  const links = [
    { id: 'over',      label: 'Over' },
    { id: 'sfeer',     label: 'Sfeer' },
    { id: 'info',      label: 'Info' },
    { id: 'lineup',    label: 'Line-up' },
    { id: 'befriends', label: 'BeFriends' },
    { id: 'sponsors',  label: 'Sponsoren' },
  ];
  return (
    <div className="bf-nav-wrap">
      <nav className="bf-nav">
        <a className="bf-nav__brand" href="#top" onClick={(e) => { e.preventDefault(); onNav('top'); }}>
          <img src="befree_Logo-2.png" alt="BeFree" style={{ width: 46, height: 46, objectFit: 'contain' }} />
        </a>
        <div className="bf-nav__links">
          {links.map(l => (
            <a
              key={l.id}
              href={'#' + l.id}
              className={active === l.id ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); onNav(l.id); }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a className="bf-btn bf-btn--primary" href="#lineup" onClick={(e) => { e.preventDefault(); onNav('lineup'); }}>
          Line-up <Icon name="arrow" size={16} />
        </a>
      </nav>
    </div>
  );
}

window.Marquee = Marquee;
window.NavBar = NavBar;
