// About + Practical Info + Sponsors + Footer

function About() {
  return (
    <section id="over" className="bf-section bf-section--cream">
      <div className="bf-about">
        <div className="bf-about__head">
          <span className="bf-section__eye">Over BeFree</span>
          <h2>Een buurtfeest <br/>met een <em>podium</em>.</h2>
          <span className="bf-about__sticker">Voor en door Steyl</span>
        </div>
        <div className="bf-about__body">
          <p>
            BeFree is ontstaan vanuit een simpel idee: lokale muziek een écht podium geven.
            Wat begon met bands uit de Industriestraat, is uitgegroeid tot een festival waar Steyl
            samenkomt. Een laagdrempelige dag vol muziek, ontmoeting en gezelligheid, waar artiesten
            en publiek dicht bij elkaar staan en de sfeer voelt als een buurtfeest.
          </p>
          <p>
            Vanuit diezelfde gedachte blijft BeFree groeien — stap voor stap, samen met lokale muzikanten,
            ondernemers en creatieven, om ieder jaar opnieuw iets moois neer te zetten voor en door Steyl.
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  const cards = [
    {
      icon: 'pin',
      title: 'Locatie',
      body: (
        <>
          BeFree vindt dit jaar plaats aan de <strong>Sint Michaëlstraat 8</strong> in Steyl,
          achter het Wereldpaviljoen. Het festival begint om <strong>14:00</strong> uur en
          eindigt om <strong>00:00</strong> uur.
        </>
      ),
    },
    {
      icon: 'bike',
      title: 'Bereikbaarheid',
      body: (
        <>
          We raden aan om met de <strong>fiets</strong> te komen. Het festival is ook goed
          bereikbaar met OV — bushalte <strong>Heijskampstraat</strong> in Tegelen, daarna
          ±10 minuten lopen.
        </>
      ),
    },
    {
      icon: 'beer',
      title: 'Eten & Drinken',
      body: (
        <>
          Op het terrein vind je verschillende eetgelegenheden met diverse gerechten en een ruim
          aanbod aan <strong>drankjes</strong>. Lokale ondernemers, eerlijke prijzen.
        </>
      ),
    },
    {
      icon: 'heart',
      title: 'Toegankelijkheid',
      body: (
        <>
          BeFree is er voor iedereen. Het terrein is vrij toegankelijk en zo ingericht dat je je makkelijk
          kunt bewegen. Zitplekken om uit te rusten, ruimte en vermaak voor de <strong>kids</strong>.
        </>
      ),
    },
  ];

  return (
    <section id="info" className="bf-section bf-section--cream">
      <div className="bf-section__head">
        <span className="bf-section__eye">Praktische info</span>
        <h2>Alles wat je <br/>moet weten.</h2>
      </div>
      <div className="bf-info-grid">
        {cards.map((c, i) => (
          <div className="bf-info-card" key={i}>
            <div className="bf-info-card__num">
              <Icon name={c.icon} size={20} />
            </div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <a href="#" className="bf-btn" onClick={(e) => e.preventDefault()}>
          Bekijk huisregels <Icon name="arrow" size={14} />
        </a>
      </div>
    </section>
  );
}

function BeFriends({ onScrollNext }) {
  return (
    <section id="befriends" className="bf-friends">
      <div className="bf-friends__inner">
        <div>
          <span className="bf-section__eye">Steun ons</span>
          <h2>
            <span className="be">BE</span>
            <span className="friends">FRIENDS</span>
          </h2>
          <p>
            Met BeFriends krijgen onze trouwe bezoekers de kans het festival actief te ondersteunen
            en direct bij te dragen aan het voortbestaan ervan. Samen bouwen we aan de sfeer, de
            muziek en de verbondenheid waar BeFree voor staat.
          </p>
          <p>
            Met een kleine bijdrage help je ons om het festival <strong>gratis en toegankelijk</strong>{' '}
            te houden voor iedereen — én om verder te groeien.
          </p>
        </div>
        <div className="bf-friends__card">
          <span className="bf-eyebrow" style={{ color: 'var(--bf-orange)' }}>BeFriend 2026</span>
          <h3 style={{ fontSize: 36, lineHeight: 0.95, margin: '6px 0 18px' }}>Doe je mee?</h3>
          <ul className="perks">
            <li>Je naam op de BeFriends-muur</li>
            <li>Een kleine verrassing op het terrein</li>
            <li>Voorrang op merch &amp; aftermovie</li>
            <li>Je houdt BeFree gratis voor iedereen</li>
          </ul>
          <div className="price-row">
            <span>Vanaf</span>
            <span><span className="num">€25</span> <span style={{ fontSize: 14, opacity: 0.6 }}>/ jaar</span></span>
          </div>
          <a
            href="#"
            className="bf-btn bf-btn--primary"
            style={{ width: '100%', marginTop: 18, justifyContent: 'space-between' }}
            onClick={(e) => e.preventDefault()}
          >
            Word BeFriend <Icon name="heart" size={16} />
          </a>
          <p style={{ fontSize: 12, color: 'var(--bf-mute)', margin: '12px 0 0', textAlign: 'center' }}>
            Meer info volgt snel via onze socials.
          </p>
        </div>
      </div>
    </section>
  );
}

function Sponsors() {
  const placeholders = ['Bakkerij Steyl', 'Brouwerij Maas', 'Wereldpaviljoen', 'Tegelens Drukwerk', 'Café De Tuin', 'Limburgs Lef'];
  return (
    <section id="sponsors" className="bf-section bf-sponsors">
      <div className="bf-sponsors__inner">
        <div>
          <span className="bf-section__eye">Sponsoren</span>
          <h2>Doe mee als <br/>partner.</h2>
          <p>
            Wil je als organisatie onderdeel worden van BeFree? In de sponsorbrochure lees je hoe je op
            een laagdrempelige en persoonlijke manier zichtbaar wordt binnen een betrokken en lokaal
            publiek. Geen standaardreclame, maar echte ontmoetingen en duurzame verbindingen.
          </p>
          <div className="bf-sponsors__strip">
            {placeholders.map((p, i) => (
              <span key={i} className="bf-sponsors__chip">{p}</span>
            ))}
          </div>
        </div>
        <div className="bf-sponsors__cta">
          <span className="bf-eyebrow" style={{ color: 'var(--bf-orange)' }}>Partners 2026</span>
          <h3>Word zichtbaar in een betrokken publiek.</h3>
          <p>
            Ontdek hoe jouw bijdrage niet alleen het festival versterkt, maar ook bijdraagt aan muziek,
            talent en de gemeenschap van Steyl.
          </p>
          <a
            href="#"
            className="bf-btn bf-btn--primary bf-btn--lg"
            style={{ width: '100%', justifyContent: 'space-between' }}
            onClick={(e) => e.preventDefault()}
          >
            Download sponsorbrochure <Icon name="download" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bf-footer">
      <div className="bf-footer__top">
        <div>
          <div className="bf-footer__brand">
            <img src="befree_Logo-2.png" alt="BeFree" style={{ width: 80, height: 80, objectFit: 'contain', background: 'var(--bf-paper)', padding: 6, borderRadius: 14, border: '3px solid var(--bf-bone)' }} />
            <div>
              <div className="bf-footer__name">BEFREE Festival</div>
              <div className="bf-footer__sub">Steyl, Limburg · Sinds 2019</div>
            </div>
          </div>
          <p style={{ color: 'rgba(247,239,226,0.65)', marginTop: 18, fontSize: 14, maxWidth: 320 }}>
            Een laagdrempelige festivaldag vol muziek, ontmoeting en gezelligheid — voor en door Steyl.
          </p>
        </div>
        <div className="bf-footer__cols">
          <div className="bf-footer__col bf-footer__contact">
            <span className="bf-eyebrow">Contact</span>
            <a href="mailto:info@befreefest.nl"><span className="label">E-mail</span>info@befreefest.nl</a>
            <a href="tel:+31000000000"><span className="label">Telefoon</span>nog toe te voegen</a>
          </div>
          <div className="bf-footer__col">
            <span className="bf-eyebrow">Volg ons</span>
            <a href="https://www.instagram.com/festival_befree/" target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={14} /> &nbsp;@festival_befree
            </a>
          </div>
          <div className="bf-footer__col">
            <span className="bf-eyebrow">Doe mee</span>
            <a href="#befriends" onClick={(e) => { e.preventDefault(); document.getElementById('befriends')?.scrollIntoView(); }}>BeFriend worden</a>
            <a href="#sponsors" onClick={(e) => { e.preventDefault(); document.getElementById('sponsors')?.scrollIntoView(); }}>Sponsor worden</a>
            <a href="#">Crew / vrijwilligers</a>
          </div>
        </div>
      </div>
      <div className="bf-footer__bottom">
        <span>© BeFree Festival · Steyl, NL</span>
        <span>Made with <span style={{ color: 'var(--bf-orange)' }}>♥</span> in Limburg</span>
      </div>
    </footer>
  );
}

window.About = About;
window.InfoSection = InfoSection;
window.BeFriends = BeFriends;
window.Sponsors = Sponsors;
window.Footer = Footer;
