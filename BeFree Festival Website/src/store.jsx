// Data store — default content + localStorage persistence

const STORAGE_KEY = 'befree_site_v1';

const DEFAULT_LINEUP = [
  { id: 'g1', time: '14:00', name: 'Opening · DJ Roma', note: 'Warming up the garden', stage: 'main' },
  { id: 'g2', time: '15:00', name: 'De Wilde Hertog', note: 'Indie folk uit Tegelen', stage: 'main' },
  { id: 'g3', time: '16:30', name: 'Vlam in de Pan', note: 'Limburgs alt-rock', stage: 'main' },
  { id: 'g4', time: '18:00', name: 'Nachtwacht', note: 'Stoner blues kwartet', stage: 'main' },
  { id: 'g5', time: '20:00', name: 'Lola & The Boys', note: 'Headliner — Maaslandse soul', stage: 'main' },
  { id: 'g6', time: '22:00', name: 'After · DJ Buurman', note: 'Tot de buren bellen', stage: 'after' },
];

const DEFAULT_PHOTOS = [
  // Auto-filled with generated SVG placeholders, see App init
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Storage failed', e);
  }
}

// Generate placeholder photos (varied warm-toned SVG) so the gallery isn't empty
function makePlaceholderPhotos() {
  const moods = [
    { hue: '#e1582c', accent: '#f14702', tag: 'Editie 2024', size: 'big',  caption: 'Tuinpodium' },
    { hue: '#0a0a0a', accent: '#f14702', tag: 'Editie 2024', size: 'tall', caption: 'Nacht' },
    { hue: '#c43904', accent: '#ffe5d6', tag: 'Editie 2024', size: 'sm',   caption: 'Buren' },
    { hue: '#f14702', accent: '#0a0a0a', tag: 'Editie 2023', size: 'wide', caption: 'Crowd' },
    { hue: '#1a1a1a', accent: '#e1582c', tag: 'Editie 2023', size: 'rect', caption: 'Crew' },
    { hue: '#e1582c', accent: '#f7efe2', tag: 'Editie 2023', size: 'sq',   caption: 'Hoofdpodium' },
    { hue: '#0a0a0a', accent: '#f14702', tag: 'Editie 2022', size: 'sm',   caption: 'Backstage' },
  ];
  return moods.map((m, i) => ({
    id: 'pl' + i,
    src: '__placeholder__',
    mood: m,
    year: m.tag,
    size: m.size,
  }));
}

const initialState = loadState() || {
  lineup: DEFAULT_LINEUP,
  photos: makePlaceholderPhotos(),
  meta: {
    title: 'BeFree',
    year: 2026,
    date: '5 september 2026',
    location: 'St. Michaëlstraat 8, Steyl',
    venueNote: 'Achter het Wereldpaviljoen',
  },
};

// Simple subscribable store
const store = (() => {
  let state = initialState;
  const listeners = new Set();
  return {
    get: () => state,
    set: (updater) => {
      state = typeof updater === 'function' ? updater(state) : { ...state, ...updater };
      saveState(state);
      listeners.forEach(fn => fn(state));
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    reset: () => {
      localStorage.removeItem(STORAGE_KEY);
      state = {
        lineup: DEFAULT_LINEUP,
        photos: makePlaceholderPhotos(),
        meta: state.meta,
      };
      listeners.forEach(fn => fn(state));
    },
  };
})();

function useStore() {
  const [s, setS] = React.useState(store.get());
  React.useEffect(() => store.subscribe(setS), []);
  return s;
}

window.store = store;
window.useStore = useStore;
