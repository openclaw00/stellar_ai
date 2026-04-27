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
  @keyframes s-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes s-ring  { 0%{opacity:.9;transform:scale(1)} 100%{opacity:0;transform:scale(1.06)} }
  #__stellar-ai__ input { font-family: ${FONT}; }
  #__stellar-ai__ input::placeholder { color: oklch(0.62 0.03 40); }
  #__stellar-ai__ button { font-family: ${FONT}; }
`;

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

function useTypewriter(text, speed = 14, active = false) {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return; }
    setDisplayed(''); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, active]);
  return { displayed, done };
}

function getPageContent() {
  return `Title: ${document.title}\nURL: ${location.href}\n\n${document.body.innerText.slice(0, 5000)}`;
}

function renderMd(text) {
  return text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i} style={{ fontWeight: 600 }}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  );
}

const Btn = ({ onClick, disabled, active, title, children, style = {} }) => (
  <button onClick={onClick} disabled={disabled} title={title} style={{
    width: 34, height: 34, borderRadius: 10, border: 'none',
    background: active ? `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))` : 'oklch(0 0 0 / 0.05)',
    color: active ? 'white' : 'oklch(0.45 0.04 40)',
    cursor: disabled ? 'default' : 'pointer', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: active ? `0 4px 16px ${OG}` : 'none',
    ...style,
  }}
    onMouseEnter={e => { if (!active && !disabled) e.currentTarget.style.background = 'oklch(0 0 0 / 0.1)'; }}
    onMouseLeave={e => { if (!active && !disabled) e.currentTarget.style.background = 'oklch(0 0 0 / 0.05)'; }}
  >{children}</button>
);

const IconBadge = ({ orange }) => (
  <div style={{
    width: 24, height: 24, borderRadius: 8, flexShrink: 0,
    background: `linear-gradient(135deg, ${orange}, oklch(0.72 0.15 55))`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: `0 2px 8px ${OG}`,
  }}>
    <IconStar s={11} c="white" />
  </div>
);

const CloseBtn = ({ onClick }) => (
  <button onClick={onClick} style={{
    width: 24, height: 24, borderRadius: 8, border: 'none',
    background: 'oklch(0 0 0 / 0.05)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'oklch(0.5 0.02 40)', transition: 'background 0.15s',
  }}
    onMouseEnter={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.1)'}
    onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.05)'}
  >
    <IconX s={12} />
  </button>
);

function ConfidenceBar({ confidence, loading }) {
  const pct = confidence != null ? Math.round(confidence * 100) : 0;
  const color = confidence >= 0.85
    ? { bar: 'linear-gradient(90deg,#4ade80,#16a34a)', glow: '#4ade8088', label: '#16a34a' }
    : confidence >= 0.7
    ? { bar: 'linear-gradient(90deg,#fbbf24,#d97706)', glow: '#fbbf2488', label: '#d97706' }
    : { bar: 'linear-gradient(90deg,#f87171,#dc2626)', glow: '#f8717188', label: '#dc2626' };

  return (
    <div style={{ background: 'oklch(0 0 0 / 0.05)', padding: '10px 16px 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'oklch(0.55 0.03 40)' }}>
          Confidence
        </span>
        {!loading && confidence != null && (
          <span style={{ fontSize: 10.5, fontWeight: 700, color: color.label }}>{pct}%</span>
        )}
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'oklch(0 0 0 / 0.08)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: !loading && confidence != null ? `${pct}%` : '0%',
          background: !loading && confidence != null ? color.bar : 'transparent',
          transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: !loading && confidence != null ? `0 0 8px ${color.glow}` : 'none',
        }} />
      </div>
    </div>
  );
}

export default function StellarApp() {
  const [query, setQuery] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | listening | thinking | answer | error
  const [answerText, setAnswerText] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [confidence, setConfidence] = React.useState(null);
  const [micActive, setMicActive] = React.useState(false);
  const [flashMode, setFlashMode] = React.useState(false);
  const [generatingCards, setGeneratingCards] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState([]);
  const [cardIndex, setCardIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [revealedCards, setRevealedCards] = React.useState(0);
  const inputRef = React.useRef(null);

  const { displayed, done: typeDone } = useTypewriter(answerText, 14, state === 'answer');

  const submit = React.useCallback(async (q = query) => {
    const text = (q || '').trim();
    if (!text) return;
    setState('thinking');
    setAnswerText('');
    setConfidence(null);
    setErrorText('');

    const pageContent = getPageContent();
    let screenshot = null;

    try {
      const capRes = await chrome.runtime.sendMessage({ type: 'CAPTURE_SCREENSHOT' });
      screenshot = capRes?.screenshot || null;
    } catch { /* capture is optional */ }

    try {
      const res = await chrome.runtime.sendMessage({ type: 'QUERY_OPENAI', query: text, pageContent, screenshot });
      if (res.error) { setErrorText(res.error); setState('error'); return; }
      setAnswerText(res.text);
      setConfidence(res.confidence);
      setState('answer');
    } catch (err) {
      setErrorText(err.message);
      setState('error');
    }
  }, [query]);

  const handleKey = (e) => { if (e.key === 'Enter') submit(); };

  const handleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
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
      rec.onend = () => { if (state === 'listening') { setMicActive(false); setState('idle'); } };
    } else {
      // Fallback: simulate
      setMicActive(true);
      setState('listening');
      setTimeout(() => {
        const q = 'Summarize this page for me';
        setQuery(q);
        setMicActive(false);
        submit(q);
      }, 1500);
    }
  };

  const dismiss = () => { setState('idle'); setQuery(''); setAnswerText(''); setConfidence(null); setErrorText(''); };

  const openFlashcards = async () => {
    setFlashMode(true);
    setGeneratingCards(true);
    setCardIndex(0);
    setFlipped(false);
    setRevealedCards(0);
    setFlashcards([]);

    const pageContent = getPageContent();
    try {
      const res = await chrome.runtime.sendMessage({ type: 'GENERATE_FLASHCARDS', pageContent });
      if (res.error || !res.cards?.length) {
        setGeneratingCards(false);
        return;
      }
      const cards = res.cards;
      setFlashcards(cards);
      let count = 0;
      const iv = setInterval(() => {
        count++;
        setRevealedCards(count);
        if (count >= cards.length) { clearInterval(iv); setGeneratingCards(false); }
      }, 320);
    } catch {
      setGeneratingCards(false);
    }
  };

  const closeFlashcards = () => { setFlashMode(false); setCardIndex(0); setFlipped(false); setRevealedCards(0); };

  const showAnswer = state === 'answer' || state === 'thinking';

  return (
    <>
      <style>{CSS}</style>

      {/* Flashcard Panel — top-left */}
      {flashMode && (
        <div style={{ position: 'fixed', top: 16, left: 20, zIndex: 9998, width: 400, borderRadius: 20, overflow: 'hidden', fontFamily: FONT, pointerEvents: 'auto', ...GLASS }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 12px', borderBottom: '1px solid oklch(0 0 0 / 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${OG}` }}>
                <IconCards s={12} c="white" />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.01em' }}>Flashcards</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: 'oklch(0.55 0.03 40)' }}>
                {generatingCards ? 'Generating…' : `${flashcards.length} cards from this page`}
              </span>
            </div>
            <CloseBtn onClick={closeFlashcards} />
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 5, justifyContent: 'center', padding: '12px 16px 4px' }}>
            {(flashcards.length ? flashcards : Array(5).fill(null)).map((_, i) => (
              <div key={i} onClick={() => { if (i < revealedCards) { setCardIndex(i); setFlipped(false); } }}
                style={{ width: i === cardIndex ? 18 : 7, height: 7, borderRadius: 99, background: i < revealedCards ? (i === cardIndex ? O : `oklch(0.65 0.18 40 / 0.35)`) : 'oklch(0 0 0 / 0.08)', transition: 'all 0.3s ease', cursor: i < revealedCards ? 'pointer' : 'default' }} />
            ))}
          </div>

          {/* Card */}
          <div style={{ padding: '12px 16px 16px', perspective: 800 }}>
            <div onClick={() => !generatingCards && cardIndex < revealedCards && setFlipped(f => !f)}
              style={{ position: 'relative', height: 160, transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', cursor: cardIndex < revealedCards ? 'pointer' : 'default' }}>
              {/* Front */}
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
              {/* Back */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: 'oklch(1 0 0 / 0.7)', border: '1.5px solid oklch(1 0 0 / 0.8)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center', gap: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2d9e5f', opacity: 0.8 }}>Answer</span>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'oklch(0.2 0.02 40)', margin: 0 }}>{flashcards[cardIndex]?.a}</p>
              </div>
            </div>

            {/* Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, gap: 8 }}>
              <button onClick={() => { setCardIndex(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={cardIndex === 0}
                style={{ flex: 1, height: 34, borderRadius: 10, border: '1px solid oklch(0 0 0 / 0.1)', background: 'oklch(0 0 0 / 0.04)', cursor: cardIndex === 0 ? 'default' : 'pointer', fontSize: 12, fontWeight: 600, color: 'oklch(0.35 0.02 40)', opacity: cardIndex === 0 ? 0.35 : 1, fontFamily: FONT, transition: 'all 0.15s' }}
                onMouseEnter={e => { if (cardIndex > 0) e.currentTarget.style.background = 'oklch(0 0 0 / 0.08)'; }}
                onMouseLeave={e => e.currentTarget.style.background = 'oklch(0 0 0 / 0.04)'}>
                ← Prev
              </button>
              <button onClick={() => { setCardIndex(i => Math.min(revealedCards - 1, i + 1)); setFlipped(false); }} disabled={cardIndex >= revealedCards - 1}
                style={{ flex: 1, height: 34, borderRadius: 10, border: 'none', background: cardIndex < revealedCards - 1 ? `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))` : 'oklch(0 0 0 / 0.06)', cursor: cardIndex < revealedCards - 1 ? 'pointer' : 'default', fontSize: 12, fontWeight: 600, color: cardIndex < revealedCards - 1 ? 'white' : 'oklch(0.6 0.02 40)', fontFamily: FONT, transition: 'all 0.15s', boxShadow: cardIndex < revealedCards - 1 ? `0 4px 12px ${OG}` : 'none' }}>
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Answer Panel — top-left (shifted right if flashcards open) */}
      <div style={{
        position: 'fixed', top: 16,
        left: flashMode ? 440 : 20,
        zIndex: 9998, width: 460, fontFamily: FONT,
        opacity: showAnswer || state === 'error' ? 1 : 0,
        transform: showAnswer || state === 'error' ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)',
        transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), left 0.3s ease',
        pointerEvents: state === 'answer' || state === 'error' ? 'auto' : 'none',
        borderRadius: 20, overflow: 'hidden',
        ...GLASS,
      }}>
        {showAnswer && <ConfidenceBar confidence={confidence} loading={state === 'thinking'} />}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid oklch(0 0 0 / 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBadge orange={O} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'oklch(0.18 0.02 40)', letterSpacing: '-0.01em' }}>Stellar AI</span>
            <span style={{ fontSize: 10, fontWeight: 500, color: O, background: 'oklch(0.65 0.18 40 / 0.1)', padding: '2px 7px', borderRadius: 99 }}>Viewing your screen</span>
          </div>
          <CloseBtn onClick={dismiss} />
        </div>

        {query && (
          <div style={{ padding: '12px 16px 0', fontSize: 12, color: 'oklch(0.55 0.04 40)', fontStyle: 'italic' }}>"{query}"</div>
        )}

        <div style={{ padding: '12px 16px 16px', minHeight: 80 }}>
          {state === 'thinking' ? (
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', paddingTop: 4 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: O, animation: `s-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          ) : state === 'error' ? (
            <p style={{ fontSize: 13, color: '#dc2626', lineHeight: 1.6, margin: 0 }}>{errorText}</p>
          ) : (
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'oklch(0.25 0.02 40)', fontWeight: 400, margin: 0 }}>
              {renderMd(displayed)}
              {!typeDone && state === 'answer' && (
                <span style={{ display: 'inline-block', width: 2, height: 14, background: O, marginLeft: 2, animation: 's-blink 0.8s step-end infinite', verticalAlign: 'middle' }} />
              )}
            </p>
          )}
        </div>

        {typeDone && state === 'answer' && (
          <div style={{ padding: '0 16px 14px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid oklch(0 0 0 / 0.05)', paddingTop: 10 }}>
            {['Explain more', 'TL;DR', 'Key takeaways'].map(s => (
              <button key={s} onClick={() => { setQuery(s); submit(s); }} style={{ fontSize: 11.5, fontWeight: 500, padding: '5px 11px', borderRadius: 99, border: `1px solid ${OB}`, background: 'oklch(0.65 0.18 40 / 0.07)', color: O, cursor: 'pointer', fontFamily: FONT, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'oklch(0.65 0.18 40 / 0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'oklch(0.65 0.18 40 / 0.07)'}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tube — top-right */}
      <div style={{
        position: 'fixed', top: 16, right: 20, zIndex: 9999,
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 10px 8px 14px', borderRadius: 20, width: 380,
        fontFamily: FONT, transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        ...(state === 'listening'
          ? { ...GLASS, boxShadow: `0 0 0 2px ${OB}, 0 8px 40px ${OG}`, border: `1.5px solid ${OB}` }
          : GLASS),
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${O}, oklch(0.72 0.15 55))`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 10px ${OG}` }}>
          <IconStar s={12} c="white" />
        </div>

        <input ref={inputRef} value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder={state === 'listening' ? 'Listening…' : state === 'thinking' ? 'Thinking…' : 'Ask anything about this page…'}
          disabled={state === 'listening' || state === 'thinking'}
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 400, color: state === 'listening' || state === 'thinking' ? O : 'oklch(0.18 0.02 40)', letterSpacing: '-0.01em' }} />

        {state === 'idle' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 99, background: 'oklch(0.65 0.18 40 / 0.08)', border: `1px solid ${OB}`, flexShrink: 0 }}>
            <IconScreen s={11} c={O} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: O, whiteSpace: 'nowrap' }}>Screen</span>
          </div>
        )}

        <Btn onClick={openFlashcards} active={flashMode} title="Create flashcards">
          <IconCards s={14} c={flashMode ? 'white' : 'oklch(0.45 0.04 40)'} />
        </Btn>

        <Btn onClick={handleMic} active={micActive} disabled={state === 'thinking'} title="Voice input">
          <IconMic s={14} c={micActive ? 'white' : 'oklch(0.45 0.04 40)'} />
        </Btn>

        <Btn onClick={() => submit()} active={!!query.trim()} disabled={!query.trim() || state === 'thinking'} title="Send">
          <IconSend s={13} c={query.trim() ? 'white' : 'oklch(0.65 0.02 40)'} />
        </Btn>
      </div>

      {/* Listening ring */}
      {state === 'listening' && (
        <div style={{ position: 'fixed', top: 16, right: 20, width: 380, height: 50, borderRadius: 999, border: `2px solid ${O}`, animation: 's-ring 1.5s ease-out infinite', pointerEvents: 'none', zIndex: 9997 }} />
      )}
    </>
  );
}
