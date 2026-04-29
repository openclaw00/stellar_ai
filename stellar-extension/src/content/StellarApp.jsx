import React from 'react';

const O = 'oklch(0.65 0.18 40)';
const OG = 'oklch(0.65 0.18 40 / 0.2)';
const OB = 'oklch(0.65 0.18 40 / 0.4)';
const GLASS = {
  background: 'oklch(1 0 0 / 0.75)',
  backdropFilter: 'blur(28px) saturate(1.9)',
  WebkitBackdropFilter: 'blur(28px) saturate(1.9)',
  border: '1px solid oklch(1 0 0 / 0.75)',
  boxShadow: '0 8px 48px oklch(0.3 0.04 40 / 0.1), 0 2px 8px oklch(0.3 0.04 40 / 0.06), inset 0 1px 0 oklch(1 0 0 / 0.9)',
};
const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

const CSS = `
  @keyframes s-pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.1)} }
  @keyframes s-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes s-ring   { 0%{opacity:.9;transform:scale(1)} 100%{opacity:0;transform:scale(1.06)} }
  @keyframes s-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  #__stellar-ai__ input  { font-family: ${FONT}; }
  #__stellar-ai__ input::placeholder { color: oklch(0.62 0.03 40); }
  #__stellar-ai__ button { font-family: ${FONT}; }
  #__stellar-ai__ ul, #__stellar-ai__ ol { margin: 4px 0; padding-left: 20px; }
  #__stellar-ai__ li { margin-bottom: 2px; line-height: 1.6; }
  #__stellar-ai__ pre { white-space: pre-wrap; word-break: break-word; }
  #__stellar-ai__ a { color: ${O}; text-decoration: underline; }
`;

// ── Icons ────────────────────────────────────────────────────────────────────

const IconMic = ({ s = 16, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="12" rx="3" stroke={c} strokeWidth="1.8" />
    <path d="M5 10a7 7 0 0014 0" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="17" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="9" y1="22" x2="15" y2="22" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconScreen = ({ s = 16, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="14" rx="2" stroke={c} strokeWidth="1.8" />
    <path d="M8 22h8M12 18v4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconSend = ({ s = 14, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCards = ({ s = 16, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="14" rx="3" stroke={c} strokeWidth="1.8" />
    <path d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="11" x2="17" y2="11" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="7" y1="15" x2="13" y2="15" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconImage = ({ s = 16, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2.5" stroke={c} strokeWidth="1.8" />
    <circle cx="9" cy="10" r="1.5" fill={c} />
    <path d="M5.5 17l4.3-4.3a1.2 1.2 0 011.7 0l2.1 2.1a1.2 1.2 0 001.7 0l2.7-2.7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconX = ({ s = 14, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconStar = ({ s = 16, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
const IconCopy = ({ s = 13, c = 'currentColor' }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="13" height="13" rx="2" stroke={c} strokeWidth="1.8" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ── Markdown renderer ────────────────────────────────────────────────────────

function inlineRender(str) {
  const result = [];
  let remaining = str;
  let i = 0;
  while (remaining.length > 0) {
    const imgM = remaining.match(/^!\[([^\]]*)\]\(([^)\s]+)\)/);
    if (imgM) {
      result.push(<img key={i++} src={imgM[2]} alt={imgM[1]} style={{ maxWidth: '100%', borderRadius: 8, marginTop: 6, display: 'block' }} />);
      remaining = remaining.slice(imgM[0].length);
      continue;
    }
    const linkM = remaining.match(/^\[([^\]]+)\]\(([^)\s]+)\)/);
    if (linkM) {
      result.push(<a key={i++} href={linkM[2]} target="_blank" rel="noopener noreferrer">{linkM[1]}</a>);
      remaining = remaining.slice(linkM[0].length);
      continue;
    }
    const boldM = remaining.match(/^\*\*([^*\n]+)\*\*/);
    if (boldM) {
      result.push(<strong key={i++}>{boldM[1]}</strong>);
      remaining = remaining.slice(boldM[0].length);
      continue;
    }
    const italicM = remaining.match(/^\*([^*\n]+)\*/);
    if (italicM) {
      result.push(<em key={i++}>{italicM[1]}</em>);
      remaining = remaining.slice(italicM[0].length);
      continue;
    }
    const codeM = remaining.match(/^`([^`\n]+)`/);
    if (codeM) {
      result.push(<code key={i++} style={{ background: 'oklch(0 0 0 / 0.08)', padding: '1px 5px', borderRadius: 4, fontFamily: 'ui-monospace,monospace', fontSize: '0.9em' }}>{codeM[1]}</code>);
      remaining = remaining.slice(codeM[0].length);
      continue;
    }
    const next = remaining.search(/[!\[*`]/);
    if (next === -1) { result.push(remaining); break; }
    if (next === 0) { result.push(remaining[0]); remaining = remaining.slice(1); }
    else { result.push(remaining.slice(0, next)); remaining = remaining.slice(next); }
  }
  return result;
}

function MarkdownRenderer({ text, streaming = false }) {
  const C = 'oklch(0.25 0.02 40)';
  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++; }
      elements.push(
        <pre key={key++} style={{ background: 'oklch(0 0 0 / 0.06)', borderRadius: 10, padding: '10px 14px', margin: '6px 0', fontFamily: 'ui-monospace,monospace', fontSize: 12, lineHeight: 1.6, color: C }}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i++;
      continue;
    }

    const h1m = line.match(/^# (.+)/);
    if (h1m) { elements.push(<div key={key++} style={{ fontSize: 15, fontWeight: 700, margin: '8px 0 2px', color: C, lineHeight: 1.4 }}>{inlineRender(h1m[1])}</div>); i++; continue; }
    const h2m = line.match(/^## (.+)/);
    if (h2m) { elements.push(<div key={key++} style={{ fontSize: 14, fontWeight: 700, margin: '6px 0 2px', color: C, lineHeight: 1.4 }}>{inlineRender(h2m[1])}</div>); i++; continue; }
    const h3m = line.match(/^### (.+)/);
    if (h3m) { elements.push(<div key={key++} style={{ fontSize: 13, fontWeight: 600, margin: '5px 0 2px', color: C, lineHeight: 1.4 }}>{inlineRender(h3m[1])}</div>); i++; continue; }

    if (line.match(/^[-*] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) { items.push(<li key={i}>{inlineRender(lines[i].slice(2))}</li>); i++; }
      elements.push(<ul key={key++}>{items}</ul>);
      continue;
    }

    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(<li key={i}>{inlineRender(lines[i].replace(/^\d+\. /, ''))}</li>); i++; }
      elements.push(<ol key={key++}>{items}</ol>);
      continue;
    }

    if (!line.trim()) { elements.push(<div key={key++} style={{ height: 6 }} />); i++; continue; }

    elements.push(<div key={key++} style={{ lineHeight: 1.7, margin: '1px 0', color: C }}>{inlineRender(line)}</div>);
    i++;
  }

  return (
    <div style={{ fontSize: 13.5 }}>
      {elements}
      {streaming && (
        <span style={{ display: 'inline-block', width: 2, height: 14, background: O, marginLeft: 2, animation: 's-blink 0.8s step-end infinite', verticalAlign: 'middle' }} />
      )}
    </div>
  );
}

// ── Page helpers ─────────────────────────────────────────────────────────────

function getPageContent() {
  const imgs = Array.from(document.querySelectorAll('img'))
    .filter(img => img.src).slice(0, 15)
    .map(img => `Image: ${img.alt || 'No alt text'} - URL: ${img.src}`).join('\n');
  return `Title: ${document.title}\nURL: ${location.href}\nImages on page:\n${imgs}\n\nText content:\n${document.body.innerText.slice(0, 4000)}`;
}

function getPageImageUrls() {
  const seen = new Set();
  return Array.from(document.querySelectorAll('img'))
    .map(img => img.currentSrc || img.src).filter(Boolean)
    .filter(url => /^https?:\/\//i.test(url))
    .filter(url => { if (seen.has(url)) return false; seen.add(url); return true; })
    .slice(0, 6);
}

function getDocLinks() {
  return Array.from(document.querySelectorAll('a'))
    .filter(a => a.href && (a.href.toLowerCase().endsWith('.xlsx') || a.href.toLowerCase().endsWith('.csv')))
    .slice(0, 2).map(a => a.href);
}

// ── Small components ─────────────────────────────────────────────────────────

const Btn = ({ onClick, disabled, active, title, children, style = {} }) => (
  <button onClick={onClick} disabled={disabled} title={title} style={{
    width: 34, height: 34, borderRadius: 10, border: 'none',
    background: active ? `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))` : 'oklch(0 0 0 / 0.05)',
    color: active ? 'white' : 'oklch(0.45 0.04 40)',
    cursor: disabled ? 'default' : 'pointer', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s ease', boxShadow: active ? `0 4px 16px ${OG}` : 'none', ...style,
  }}
    onMouseEnter={e => { if (!active && !disabled) e.currentTarget.style.background = 'oklch(0 0 0 / 0.1)'; }}
    onMouseLeave={e => { if (!active && !disabled) e.currentTarget.style.background = 'oklch(0 0 0 / 0.05)'; }}
  >{children}</button>
);

const IconBadge = () => (
  <div style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${OG}` }}>
    <IconStar s={11} c="white" />
  </div>
);

const CloseBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ width: 24, height: 24, borderRadius: 8, border: 'none', background: 'oklch(0 0 0 / 0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'oklch(0.5 0.02 40)', transition: 'background 0.15s' }}
    onMouseEnter={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.1)'}
    onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.05)'}>
    <IconX s={12} />
  </button>
);

function CopyBtn({ text }) {
  const [copied, setCopied] = React.useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button onClick={handle} title="Copy answer" style={{ width: 24, height: 24, borderRadius: 8, border: 'none', background: copied ? `${OG}` : 'oklch(0 0 0 / 0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: copied ? O : 'oklch(0.5 0.02 40)', transition: 'all 0.15s', fontSize: 11, fontWeight: 700, fontFamily: FONT }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.background = 'oklch(0 0 0 / 0.1)'; }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.background = 'oklch(0 0 0 / 0.05)'; }}>
      {copied ? '✓' : <IconCopy s={12} />}
    </button>
  );
}

function ConfidenceBar({ confidence }) {
  const loading = confidence == null;
  const pct = confidence != null ? Math.round(confidence * 100) : 0;
  const color = confidence >= 0.85
    ? { bar: 'linear-gradient(90deg,#4ade80,#16a34a)', glow: '#4ade8088', label: '#16a34a' }
    : confidence >= 0.7
    ? { bar: 'linear-gradient(90deg,#fbbf24,#d97706)', glow: '#fbbf2488', label: '#d97706' }
    : { bar: 'linear-gradient(90deg,#f87171,#dc2626)', glow: '#f8717188', label: '#dc2626' };

  return (
    <div style={{ background: 'oklch(0 0 0 / 0.05)', padding: '10px 16px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'oklch(0.55 0.03 40)' }}>Confidence</span>
        {!loading && <span style={{ fontSize: 10.5, fontWeight: 700, color: color.label }}>{pct}%</span>}
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'oklch(0 0 0 / 0.08)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ height: '100%', borderRadius: 99, width: '100%', background: `linear-gradient(90deg, transparent 0%, ${O} 50%, transparent 100%)`, backgroundSize: '200% 100%', animation: 's-shimmer 1.5s ease-in-out infinite' }} />
        ) : (
          <div style={{ height: '100%', borderRadius: 99, width: `${pct}%`, background: color.bar, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)', boxShadow: `0 0 8px ${color.glow}` }} />
        )}
      </div>
    </div>
  );
}

// ── Main app ─────────────────────────────────────────────────────────────────

export default function StellarApp() {
  const [query, setQuery] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | listening | thinking | answer | error
  const [answerText, setAnswerText] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [confidence, setConfidence] = React.useState(null);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [micActive, setMicActive] = React.useState(false);
  const [flashMode, setFlashMode] = React.useState(false);
  const [generatingCards, setGeneratingCards] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState([]);
  const [cardIndex, setCardIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [revealedCards, setRevealedCards] = React.useState(0);
  const [cardCount, setCardCount] = React.useState(5);
  const [attachedImages, setAttachedImages] = React.useState([]);
  const [history, setHistory] = React.useState([]); // [{role, content}]

  const inputRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const portRef = React.useRef(null);

  const submit = React.useCallback(async (q = query) => {
    const text = (q || '').trim();
    if (!text) return;

    // Disconnect any prior stream
    if (portRef.current) { try { portRef.current.disconnect(); } catch {} portRef.current = null; }

    setQuery('');
    setState('thinking');
    setAnswerText('');
    setConfidence(null);
    setErrorText('');
    setIsStreaming(false);

    const pageContent = getPageContent();
    const pageImages = getPageImageUrls();
    const docLinks = getDocLinks();
    let screenshot = null;
    try {
      const capRes = await chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' });
      screenshot = capRes?.screenshot || null;
    } catch { /* optional */ }

    const port = chrome.runtime.connect({ name: 'stellar-stream' });
    portRef.current = port;

    let accumulated = '';
    const userHistoryEntry = { role: 'user', content: text };

    port.onMessage.addListener((msg) => {
      if (msg.type === 'chunk') {
        accumulated += msg.text;
        // Strip any partial [CONFIDENCE:...] tag that may be building at the tail
        const display = accumulated.replace(/\[CONFIDENCE:[^\]]*$/, '').trimEnd();
        setAnswerText(display);
        setState('answer');
        setIsStreaming(true);
      } else if (msg.type === 'done') {
        setAnswerText(msg.cleanText);
        setConfidence(msg.confidence);
        setIsStreaming(false);
        setHistory(prev => [...prev.slice(-8), userHistoryEntry, { role: 'assistant', content: msg.cleanText }]);
        portRef.current = null;
      } else if (msg.type === 'error') {
        setErrorText(msg.error);
        setState('error');
        setIsStreaming(false);
        portRef.current = null;
      }
    });

    port.onDisconnect.addListener(() => {
      setIsStreaming(false);
      portRef.current = null;
    });

    port.postMessage({ type: 'QUERY_OPENAI_STREAM', query: text, pageContent, screenshot, pageImages, images: attachedImages, docLinks, history: history.slice(-10) });
  }, [attachedImages, query, history]);

  const handlePickImage = React.useCallback(async (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/')).slice(0, 3);
    if (!files.length) return;
    const toDataUrl = file => new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = () => rej(new Error('Failed reading image'));
      r.readAsDataURL(file);
    });
    try {
      setAttachedImages((await Promise.all(files.map(toDataUrl))).filter(Boolean));
    } catch { setAttachedImages([]); }
    finally { e.target.value = ''; }
  }, []);

  const clearAttachedImage = React.useCallback((idx) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleKey = (e) => { if (e.key === 'Enter') submit(); };

  const handleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setErrorText('Speech recognition is not supported in this browser.');
      setState('error');
      return;
    }
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    setMicActive(true);
    setState('listening');
    rec.start();
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setQuery(t);
      setMicActive(false);
      submit(t);
    };
    rec.onerror = () => { setMicActive(false); setState('idle'); };
    rec.onend = () => { setMicActive(false); if (state === 'listening') setState('idle'); };
  };

  const dismiss = () => {
    if (portRef.current) { try { portRef.current.disconnect(); } catch {} portRef.current = null; }
    setState('idle');
    setQuery('');
    setAnswerText('');
    setConfidence(null);
    setIsStreaming(false);
    setErrorText('');
  };

  const openFlashcards = async () => {
    setFlashMode(true);
    setGeneratingCards(true);
    setCardIndex(0);
    setFlipped(false);
    setRevealedCards(0);
    setFlashcards([]);

    const pageContent = getPageContent();
    try {
      const res = await chrome.runtime.sendMessage({ type: 'GENERATE_FLASHCARDS', pageContent, count: cardCount });
      if (res.error || !res.cards?.length) { setGeneratingCards(false); return; }
      const cards = res.cards;
      setFlashcards(cards);
      let count = 0;
      const iv = setInterval(() => {
        count++;
        setRevealedCards(count);
        if (count >= cards.length) { clearInterval(iv); setGeneratingCards(false); }
      }, 320);
    } catch { setGeneratingCards(false); }
  };

  const closeFlashcards = () => { setFlashMode(false); setCardIndex(0); setFlipped(false); setRevealedCards(0); };

  const showAnswer = state === 'answer' || state === 'thinking';

  return (
    <>
      <style>{CSS}</style>

      {/* ── Flashcard Panel ── */}
      {flashMode && (
        <div style={{ position: 'fixed', top: 16, left: 20, zIndex: 9998, width: 400, borderRadius: 20, overflow: 'hidden', fontFamily: FONT, pointerEvents: 'auto', ...GLASS }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 12px', borderBottom: '1px solid oklch(0 0 0 / 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${OG}` }}>
                <IconCards s={12} c="white" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.01em' }}>Flashcards</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: 'oklch(0.55 0.03 40)' }}>
                {generatingCards ? 'Generating…' : `${flashcards.length} cards`}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Card count picker */}
              <div style={{ display: 'flex', gap: 2 }}>
                {[3, 5, 8, 10].map(n => (
                  <button key={n} onClick={() => setCardCount(n)} disabled={generatingCards} style={{ width: 22, height: 18, borderRadius: 5, border: 'none', fontSize: 10, fontWeight: 600, background: cardCount === n ? O : 'oklch(0 0 0 / 0.07)', color: cardCount === n ? 'white' : 'oklch(0.5 0.02 40)', cursor: generatingCards ? 'default' : 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}>{n}</button>
                ))}
              </div>
              <button onClick={openFlashcards} disabled={generatingCards} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 7, border: 'none', background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, color: 'white', cursor: generatingCards ? 'default' : 'pointer', fontFamily: FONT, opacity: generatingCards ? 0.5 : 1 }}>
                Regen
              </button>
              <CloseBtn onClick={closeFlashcards} />
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 5, justifyContent: 'center', padding: '12px 16px 4px' }}>
            {(flashcards.length ? flashcards : Array(cardCount).fill(null)).map((_, i) => (
              <div key={i} onClick={() => { if (i < revealedCards) { setCardIndex(i); setFlipped(false); } }}
                style={{ width: i === cardIndex ? 18 : 7, height: 7, borderRadius: 99, background: i < revealedCards ? (i === cardIndex ? O : `oklch(0.65 0.18 40 / 0.35)`) : 'oklch(0 0 0 / 0.08)', transition: 'all 0.3s ease', cursor: i < revealedCards ? 'pointer' : 'default' }} />
            ))}
          </div>

          {/* Card */}
          <div style={{ padding: '12px 16px 16px', perspective: 800 }}>
            <div onClick={() => !generatingCards && cardIndex < revealedCards && setFlipped(f => !f)}
              style={{ position: 'relative', height: 160, transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', cursor: cardIndex < revealedCards ? 'pointer' : 'default' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: `oklch(0.65 0.18 40 / 0.06)`, border: `1.5px solid ${OB}`, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center', gap: 10 }}>
                {cardIndex < revealedCards && flashcards[cardIndex] ? (
                  <>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: O, opacity: 0.7 }}>Question</span>
                    <p style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 500, color: 'oklch(0.18 0.02 40)', margin: 0 }}>{flashcards[cardIndex].q}</p>
                    <span style={{ fontSize: 10.5, color: 'oklch(0.6 0.03 40)' }}>tap to flip</span>
                  </>
                ) : (
                  <div style={{ display: 'flex', gap: 5 }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: O, animation: `s-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </div>
                )}
              </div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: 'oklch(1 0 0 / 0.7)', border: '1.5px solid oklch(1 0 0 / 0.8)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center', gap: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2d9e5f', opacity: 0.8 }}>Answer</span>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'oklch(0.2 0.02 40)', margin: 0 }}>{flashcards[cardIndex]?.a}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, gap: 8 }}>
              <button onClick={() => { setCardIndex(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={cardIndex === 0}
                style={{ flex: 1, height: 34, borderRadius: 10, border: '1px solid oklch(0 0 0 / 0.1)', background: 'oklch(0 0 0 / 0.04)', cursor: cardIndex === 0 ? 'default' : 'pointer', fontSize: 12, fontWeight: 600, color: 'oklch(0.35 0.02 40)', opacity: cardIndex === 0 ? 0.35 : 1, fontFamily: FONT, transition: 'all 0.15s' }}
                onMouseEnter={e => { if (cardIndex > 0) e.currentTarget.style.background = 'oklch(0 0 0 / 0.08)'; }}
                onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.04)'}>← Prev</button>
              <button onClick={() => { setCardIndex(i => Math.min(revealedCards - 1, i + 1)); setFlipped(false); }} disabled={cardIndex >= revealedCards - 1}
                style={{ flex: 1, height: 34, borderRadius: 10, border: 'none', background: cardIndex < revealedCards - 1 ? `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))` : 'oklch(0 0 0 / 0.06)', cursor: cardIndex < revealedCards - 1 ? 'pointer' : 'default', fontSize: 12, fontWeight: 600, color: cardIndex < revealedCards - 1 ? 'white' : 'oklch(0.6 0.02 40)', fontFamily: FONT, transition: 'all 0.15s', boxShadow: cardIndex < revealedCards - 1 ? `0 4px 12px ${OG}` : 'none' }}>Next →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Answer Panel ── */}
      <div style={{
        position: 'fixed', top: 16,
        left: flashMode ? 440 : 20,
        zIndex: 9998, width: 460, fontFamily: FONT,
        opacity: showAnswer || state === 'error' ? 1 : 0,
        transform: showAnswer || state === 'error' ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)',
        transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), left 0.3s ease',
        pointerEvents: state === 'answer' || state === 'error' ? 'auto' : 'none',
        borderRadius: 20, overflow: 'hidden', ...GLASS,
      }}>
        {showAnswer && <ConfidenceBar confidence={confidence} />}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid oklch(0 0 0 / 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBadge />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.01em' }}>Stellar AI</span>
            <span style={{ fontSize: 10, fontWeight: 500, color: O, background: 'oklch(0.65 0.18 40 / 0.1)', padding: '2px 7px', borderRadius: 99 }}>Viewing your screen</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {state === 'answer' && !isStreaming && answerText && <CopyBtn text={answerText} />}
            <CloseBtn onClick={dismiss} />
          </div>
        </div>

        <div style={{ padding: '12px 16px 16px', minHeight: 80, maxHeight: 400, overflowY: 'auto' }}>
          {state === 'thinking' ? (
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', paddingTop: 4 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: O, animation: `s-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          ) : state === 'error' ? (
            <p style={{ fontSize: 13, color: '#dc2626', lineHeight: 1.6, margin: 0 }}>{errorText}</p>
          ) : (
            <MarkdownRenderer text={answerText} streaming={isStreaming} />
          )}
        </div>

        {state === 'answer' && !isStreaming && (
          <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid oklch(0 0 0 / 0.05)', paddingTop: 10 }}>
            {['Explain more', 'TL;DR', 'Key takeaways'].map(s => (
              <button key={s} onClick={() => submit(s)} style={{ fontSize: 11.5, fontWeight: 500, padding: '5px 11px', borderRadius: 99, border: `1px solid ${OB}`, background: 'oklch(0.65 0.18 40 / 0.07)', color: O, cursor: 'pointer', fontFamily: FONT, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'oklch(0.65 0.18 40 / 0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'oklch(0.65 0.18 40 / 0.07)'}>
                {s}
              </button>
            ))}
            {history.length > 0 && (
              <button onClick={() => setHistory([])} style={{ fontSize: 11.5, fontWeight: 500, padding: '5px 11px', borderRadius: 99, border: '1px solid oklch(0 0 0 / 0.12)', background: 'oklch(0 0 0 / 0.04)', color: 'oklch(0.55 0.02 40)', cursor: 'pointer', fontFamily: FONT, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.04)'}>
                Clear history
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Tube ── */}
      <div style={{
        position: 'fixed', top: 16, right: 20, zIndex: 9999, pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 10px 8px 14px', borderRadius: 20, width: 380, fontFamily: FONT,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        ...(state === 'listening'
          ? { ...GLASS, boxShadow: `0 0 0 2px ${OB}, 0 8px 40px ${OG}`, border: `1.5px solid ${OB}` }
          : GLASS),
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 10px ${OG}` }}>
          <IconStar s={12} c="white" />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {!!attachedImages.length && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, overflowX: 'auto' }}>
              {attachedImages.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, overflow: 'hidden', border: `1px solid ${OB}`, flexShrink: 0 }}>
                  <img src={img} alt={`attachment-${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <button onClick={() => clearAttachedImage(idx)} title="Remove" style={{ position: 'absolute', top: 1, right: 1, width: 14, height: 14, borderRadius: 99, border: 'none', background: 'oklch(0 0 0 / 0.65)', color: 'white', fontSize: 10, lineHeight: 1, cursor: 'pointer', padding: 0 }}>×</button>
                </div>
              ))}
            </div>
          )}
          <input ref={inputRef} value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder={state === 'listening' ? 'Listening…' : state === 'thinking' ? 'Thinking…' : history.length > 0 ? 'Follow up…' : 'Ask anything about this page…'}
            disabled={state === 'listening' || state === 'thinking'}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 400, color: state === 'listening' || state === 'thinking' ? O : 'oklch(0.18 0.02 40)', letterSpacing: '-0.01em' }} />
        </div>

        {state === 'idle' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 99, background: 'oklch(0.65 0.18 40 / 0.08)', border: `1px solid ${OB}`, flexShrink: 0 }}>
            <IconScreen s={11} c={O} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: O, whiteSpace: 'nowrap' }}>Screen</span>
          </div>
        )}

        {history.length > 0 && state !== 'thinking' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 7px', borderRadius: 99, background: 'oklch(0.65 0.18 40 / 0.08)', border: `1px solid ${OB}`, flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: O }}>{Math.floor(history.length / 2)} msg</span>
          </div>
        )}

        <Btn onClick={openFlashcards} active={flashMode} title="Create flashcards">
          <IconCards s={14} c={flashMode ? 'white' : 'oklch(0.45 0.04 40)'} />
        </Btn>

        <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePickImage} />
        <Btn onClick={() => fileInputRef.current?.click()} active={attachedImages.length > 0} disabled={state === 'thinking'} title="Attach images">
          <IconImage s={14} c={attachedImages.length ? 'white' : 'oklch(0.45 0.04 40)'} />
        </Btn>

        <Btn onClick={handleMic} active={micActive} disabled={state === 'thinking'} title="Voice input">
          <IconMic s={14} c={micActive ? 'white' : 'oklch(0.45 0.04 40)'} />
        </Btn>

        <Btn onClick={() => submit()} active={!!query.trim()} disabled={!query.trim() || state === 'thinking'} title="Send">
          <IconSend s={13} c={query.trim() ? 'white' : 'oklch(0.65 0.02 40)'} />
        </Btn>
      </div>

      {state === 'listening' && (
        <div style={{ position: 'fixed', top: 16, right: 20, width: 380, height: 50, borderRadius: 999, border: `2px solid ${O}`, animation: 's-ring 1.5s ease-out infinite', pointerEvents: 'none', zIndex: 9997 }} />
      )}
    </>
  );
}
