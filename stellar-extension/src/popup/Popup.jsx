import React from 'react';

const O = 'oklch(0.65 0.18 40)';
const OG = 'oklch(0.65 0.18 40 / 0.2)';

const MODELS = [
  { value: 'gpt-4o', label: 'GPT-4o', sub: 'Best quality' },
  { value: 'gpt-4o-mini', label: 'GPT-4o mini', sub: 'Faster & cheaper' },
];

const IconStar = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="white">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

function timeAgo(ts) {
  if (!ts) return 'Never';
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function maskKey(key) {
  if (!key || key.length < 8) return '••••••••';
  return key.slice(0, 7) + '••••••••••••' + key.slice(-4);
}

export default function Popup() {
  const [key, setKey] = React.useState('');
  const [savedKey, setSavedKey] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [model, setModel] = React.useState('gpt-4o');
  const [stats, setStats] = React.useState({ totalRequests: 0, lastUsed: null });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    chrome.storage.local.get(['openaiApiKey', 'totalRequests', 'lastUsed', 'model'], (res) => {
      if (res.openaiApiKey) setSavedKey(res.openaiApiKey);
      setModel(res.model || 'gpt-4o');
      setStats({ totalRequests: res.totalRequests || 0, lastUsed: res.lastUsed || null });
      setLoading(false);
    });
  }, []);

  const save = () => {
    const trimmed = key.trim();
    if (!trimmed) return;
    chrome.storage.local.set({ openaiApiKey: trimmed }, () => {
      setSavedKey(trimmed);
      setSaved(true);
      setEditing(false);
      setKey('');
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const clear = () => {
    chrome.storage.local.remove('openaiApiKey', () => { setSavedKey(''); setKey(''); setEditing(false); });
  };

  const saveModel = (m) => {
    setModel(m);
    chrome.storage.local.set({ model: m });
  };

  const handleKey = (e) => { if (e.key === 'Enter') save(); };

  const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
  const BASE = { fontFamily: FONT };

  if (loading) return <div style={{ width: 320, height: 80 }} />;

  const isConnected = !!savedKey;
  const activeModel = MODELS.find(m => m.value === model) || MODELS[0];

  return (
    <div style={{ width: 320, fontFamily: FONT, background: 'oklch(0.97 0.008 60)' }}>
      {/* Header */}
      <div style={{ padding: '18px 20px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid oklch(0.91 0.006 60)' }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${OG}`, flexShrink: 0 }}>
          <IconStar />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.02em' }}>Stellar AI</div>
          <div style={{ fontSize: 11, color: 'oklch(0.55 0.03 40)', fontWeight: 500 }}>Browser extension</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: isConnected ? '#16a34a' : 'oklch(0.75 0.05 40)' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: isConnected ? '#16a34a' : 'oklch(0.55 0.03 40)' }}>
            {isConnected ? 'Connected' : 'No key'}
          </span>
        </div>
      </div>

      {isConnected && !editing ? (
        <div style={{ padding: '16px 20px 20px' }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '12px 14px', border: '1px solid oklch(0.91 0.006 60)' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.03em' }}>{stats.totalRequests}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: 'oklch(0.55 0.03 40)', marginTop: 2 }}>TOTAL QUERIES</div>
            </div>
            <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '12px 14px', border: '1px solid oklch(0.91 0.006 60)' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.03em' }}>{timeAgo(stats.lastUsed)}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: 'oklch(0.55 0.03 40)', marginTop: 2 }}>LAST USED</div>
            </div>
          </div>

          {/* Model selector */}
          <div style={{ background: 'white', borderRadius: 12, padding: '11px 14px', border: '1px solid oklch(0.91 0.006 60)', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'oklch(0.45 0.03 40)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Model</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {MODELS.map(m => (
                <button key={m.value} onClick={() => saveModel(m.value)} style={{
                  flex: 1, padding: '8px 10px', borderRadius: 9, border: model === m.value ? `1.5px solid ${O}` : '1.5px solid oklch(0.88 0.01 60)',
                  background: model === m.value ? 'oklch(0.65 0.18 40 / 0.07)' : 'transparent',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', ...BASE,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: model === m.value ? O : 'oklch(0.3 0.02 40)' }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: model === m.value ? O : 'oklch(0.6 0.02 40)', marginTop: 1 }}>{m.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* API Key row */}
          <div style={{ background: 'white', borderRadius: 12, padding: '11px 14px', border: '1px solid oklch(0.91 0.006 60)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'oklch(0.45 0.03 40)' }}>API Key</span>
            <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'oklch(0.4 0.02 40)' }}>{maskKey(savedKey)}</span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setEditing(true)} style={{ flex: 1, height: 36, borderRadius: 10, border: '1px solid oklch(0.88 0.01 60)', background: 'white', fontSize: 12, fontWeight: 600, color: 'oklch(0.35 0.02 40)', cursor: 'pointer', ...BASE }}>
              Edit key
            </button>
            <button onClick={clear} style={{ flex: 1, height: 36, borderRadius: 10, border: 'none', background: 'oklch(0.95 0.015 25)', fontSize: 12, fontWeight: 600, color: 'oklch(0.5 0.12 25)', cursor: 'pointer', ...BASE }}>
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px 20px 20px' }}>
          <p style={{ fontSize: 12, lineHeight: 1.65, color: 'oklch(0.45 0.03 40)', marginBottom: 16 }}>
            {editing ? 'Enter a new OpenAI API key below.' : 'Stellar AI uses GPT-4o to read your screen and answer questions. Enter your OpenAI API key to get started.'}
          </p>

          <label style={{ fontSize: 11, fontWeight: 600, color: 'oklch(0.4 0.03 40)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            OpenAI API Key
          </label>
          <input
            type="password" value={key} autoFocus
            onChange={e => { setKey(e.target.value); setSaved(false); }}
            onKeyDown={handleKey}
            placeholder="sk-..."
            style={{ width: '100%', height: 38, padding: '0 12px', borderRadius: 10, border: '1px solid oklch(0.88 0.01 60)', background: 'white', fontSize: 13, ...BASE, outline: 'none', color: 'oklch(0.18 0.02 40)', marginBottom: 10, boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = O}
            onBlur={e => e.target.style.borderColor = 'oklch(0.88 0.01 60)'}
          />

          <div style={{ display: 'flex', gap: 8 }}>
            {editing && (
              <button onClick={() => { setEditing(false); setKey(''); }} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: '1px solid oklch(0.88 0.01 60)', background: 'white', fontSize: 12, fontWeight: 600, color: 'oklch(0.5 0.03 40)', cursor: 'pointer', ...BASE }}>
                Cancel
              </button>
            )}
            <button onClick={save} disabled={!key.trim()}
              style={{ flex: 1, height: 36, borderRadius: 10, border: 'none', background: key.trim() ? `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))` : 'oklch(0.9 0.005 60)', color: key.trim() ? 'white' : 'oklch(0.6 0.02 40)', fontSize: 13, fontWeight: 600, cursor: key.trim() ? 'pointer' : 'default', ...BASE, boxShadow: key.trim() ? `0 4px 14px ${OG}` : 'none' }}>
              {saved ? '✓ Saved' : 'Save key'}
            </button>
          </div>

          <p style={{ fontSize: 10.5, color: 'oklch(0.65 0.03 40)', marginTop: 12, lineHeight: 1.6 }}>
            Your key is stored locally and never sent anywhere except OpenAI.
          </p>
        </div>
      )}
    </div>
  );
}
