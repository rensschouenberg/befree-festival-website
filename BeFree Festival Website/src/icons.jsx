/* Shared inline SVG components — the heart-clover BeFree sticker
   and small UI icons, drawn from scratch to match the brand mark. */

// Brand logo — uses the official PNG so proportions stay intact.
function HeartClover({ size = 48, rotate = 0, style = {} }) {
  return (
    <img
      src="befree_Logo-2.png"
      alt="BeFree"
      width={size}
      height={size}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        objectFit: 'contain',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    />
  );
}

// Small wordmark-style "BEFREE" stamp used as standalone mark
function BefreeStamp({ rotate = -2, scale = 1 }) {
  return (
    <span
      className="bf-befree-stamp"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--bf-font-display)',
        textTransform: 'uppercase',
        fontSize: 24 * scale,
        letterSpacing: '-0.02em',
        transform: `rotate(${rotate}deg)`
      }}
    >
      <HeartClover size={36 * scale} />
      <span>BEFREE</span>
    </span>
  );
}

function Icon({ name, size = 18 }) {
  const stroke = 'currentColor';
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  switch (name) {
    case 'arrow':       return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'edit':        return <svg {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
    case 'plus':        return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'close':       return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'trash':       return <svg {...props}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg>;
    case 'upload':      return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>;
    case 'instagram':   return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>;
    case 'mail':        return <svg {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case 'phone':       return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.32 1.6.6 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.17a2 2 0 0 1 2.11-.45c.76.28 1.55.48 2.36.6A2 2 0 0 1 22 16.92z"/></svg>;
    case 'pin':         return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'bike':        return <svg {...props}><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h3l2 7-4 4M8 8l4 9M9 6h3l4 8M6 17.5L9 6"/></svg>;
    case 'beer':        return <svg {...props}><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6M13 12v6"/><path d="M5 8h12v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8z"/><path d="M7 8a4 4 0 0 1 4-4 5 5 0 0 1 5 4"/></svg>;
    case 'heart':       return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
    case 'check':       return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
    case 'image':       return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
    case 'download':    return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
    case 'calendar':    return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case 'sun':         return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>;
    default: return null;
  }
}

window.HeartClover = HeartClover;
window.BefreeStamp = BefreeStamp;
window.Icon = Icon;
