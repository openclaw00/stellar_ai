const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

async function getApiKey() {
  const { openaiApiKey } = await chrome.storage.local.get('openaiApiKey');
  return openaiApiKey || null;
}

async function callOpenAI(apiKey, messages, opts = {}) {
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: 600,
      temperature: 0.7,
      ...opts,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `OpenAI error ${res.status}`);
  return data.choices[0].message.content;
}

async function handleQuery({ query, pageContent, screenshot }) {
  const apiKey = await getApiKey();
  if (!apiKey) return { error: 'No API key set — click the Stellar AI icon to add one.' };

  const systemMsg = {
    role: 'system',
    content:
      'You are Stellar AI, a concise browser-assistant. Answer in 1–4 sentences unless more detail is needed. ' +
      'End every response with exactly one line: [CONFIDENCE:X.XX] where X.XX is your confidence from 0 to 1.',
  };

  let userContent;
  if (screenshot) {
    userContent = [
      { type: 'text', text: `Page: ${pageContent}\n\nQuestion: ${query}` },
      { type: 'image_url', image_url: { url: screenshot, detail: 'low' } },
    ];
  } else {
    userContent = `Page content:\n${pageContent}\n\nQuestion: ${query}`;
  }

  try {
    const raw = await callOpenAI(apiKey, [systemMsg, { role: 'user', content: userContent }]);
    const match = raw.match(/\[CONFIDENCE:([\d.]+)\]/);
    const confidence = match ? Math.min(1, Math.max(0, parseFloat(match[1]))) : 0.8;
    const text = raw.replace(/\[CONFIDENCE:[\d.]+\]\s*$/, '').trim();
    const { totalRequests = 0 } = await chrome.storage.local.get('totalRequests');
    await chrome.storage.local.set({ totalRequests: totalRequests + 1, lastUsed: Date.now() });
    return { text, confidence };
  } catch (err) {
    return { error: err.message };
  }
}

async function handleFlashcards({ pageContent }) {
  const apiKey = await getApiKey();
  if (!apiKey) return { error: 'No API key set.' };

  const system = {
    role: 'system',
    content:
      'Create exactly 5 flashcards as JSON. Return ONLY valid JSON in this exact format: ' +
      '{"cards":[{"q":"question","a":"answer"},...]}',
  };
  const user = {
    role: 'user',
    content: `Make 5 flashcards from this page content:\n\n${pageContent.slice(0, 4000)}`,
  };

  try {
    const raw = await callOpenAI(apiKey, [system, user], {
      response_format: { type: 'json_object' },
      max_tokens: 900,
      temperature: 0.5,
    });
    const parsed = JSON.parse(raw);
    const cards = parsed.cards || parsed.flashcards || (Array.isArray(parsed) ? parsed : []);
    if (!cards.length) return { error: 'No cards returned.' };
    return { cards: cards.slice(0, 5) };
  } catch (err) {
    return { error: err.message };
  }
}

async function handleCapture(tabId) {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 50 });
    return { screenshot: dataUrl };
  } catch {
    return { screenshot: null };
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type } = message;

  if (type === 'QUERY_OPENAI') {
    handleQuery(message).then(sendResponse);
    return true;
  }
  if (type === 'GENERATE_FLASHCARDS') {
    handleFlashcards(message).then(sendResponse);
    return true;
  }
  if (type === 'CAPTURE_SCREENSHOT') {
    handleCapture(sender.tab?.id).then(sendResponse);
    return true;
  }
});
