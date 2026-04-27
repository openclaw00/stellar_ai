import React from 'react';

const O = 'oklch(0.65 0.18 40)';
const OG = 'oklch(0.65 0.18 40 / 0.2)';

const IconStar = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="white">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

export default function Popup() {
  const [key, setKey] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [hasKey, setHasKey] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    chrome.storage.local.get('openaiApiKey', ({ openaiApiKey }) => {
      if (openaiApiKey) { setHasKey(true); setKey(openaiApiKey); }
      setLoading(false);
    });
  }, []);

  const save = () => {
    const trimmed = key.trim();
    if (!trimmed) return;
    chrome.storage.local.set({ openaiApiKey: trimmed }, () => {
      setHasKey(true);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const clear = () => {
    chrome.storage.local.remove('openaiApiKey', () => {
      setKey('');
      setHasKey(false);
    });
  };

  const handleKey = (e) => { if (e.key === 'Enter') save(); };

  return (
    <div style={{ padding: 20, width: 320, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${OG}` }}>
          <IconStar />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.02em' }}>Stellar AI</div>
          <div style={{ fontSize: 11, color: 'oklch(0.55 0.03 40)', fontWeight: 500 }}>Browser extension</div>
        </div>
        {!loading && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: hasKey ? '#16a34a' : 'oklch(0.7 0.05 40)' }} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: hasKey ? '#16a34a' : 'oklch(0.55 0.03 40)' }}>
              {hasKey ? 'Connected' : 'No key'}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, lineHeight: 1.65, color: 'oklch(0.45 0.03 40)', marginBottom: 16 }}>
        Stellar AI reads the current page and answers your questions using GPT-4o with vision. Enter your OpenAI API key to get started.
      </p>

      {/* API Key field */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: 'oklch(0.4 0.03 40)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          OpenAI API Key
        </label>
        <input
          type="password"
          value={key}
          onChange={e => { setKey(e.target.value); setSaved(false); }}
          onKeyDown={handleKey}
          placeholder="sk-..."
          style={{ width: '100%', height: 38, padding: '0 12px', borderRadius: 10, border: '1px solid oklch(0.88 0.01 60)', background: 'white', fontSize: 13, fontFamily: 'inherit', outline: 'none', color: 'oklch(0.18 0.02 40)', transition: 'border-color 0.15s' }}
          onFocus={e => e.target.style.borderColor = O}
          onBlur={e => e.target.style.borderColor = 'oklch(0.88 0.01 60)'}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={save} disabled={!key.trim()}
          style={{ flex: 1, height: 36, borderRadius: 10, border: 'none', background: key.trim() ? `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))` : 'oklch(0.9 0.005 60)', color: key.trim() ? 'white' : 'oklch(0.6 0.02 40)', fontSize: 13, fontWeight: 600, cursor: key.trim() ? 'pointer' : 'default', fontFamily: 'inherit', boxShadow: key.trim() ? `0 4px 14px ${OG}` : 'none', transition: 'all 0.2s' }}>
          {saved ? '✓ Saved' : 'Save key'}
        </button>
        {hasKey && (
          <button onClick={clear} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid oklch(0.88 0.01 60)', background: 'transparent', fontSize: 12, fontWeight: 600, color: 'oklch(0.5 0.03 40)', cursor: 'pointer', fontFamily: 'inherit' }}>
            Clear
          </button>
        )}
      </div>

      <p style={{ fontSize: 10.5, color: 'oklch(0.65 0.03 40)', marginTop: 14, lineHeight: 1.6 }}>
        Your key is stored locally in your browser and never sent anywhere except OpenAI's API.
      </p>
    </div>
  );
}
