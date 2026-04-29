const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

async function getApiKey() {
  const { openaiApiKey } = await chrome.storage.local.get('openaiApiKey');
  return openaiApiKey || null;
}

async function getModel() {
  const { model } = await chrome.storage.local.get('model');
  return model || 'gpt-4o';
}

async function handleQueryStream(port, { query, pageContent, screenshot, images = [], pageImages = [], history = [] }) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    port.postMessage({ type: 'error', error: 'No API key set — click the Stellar AI icon to add one.' });
    return;
  }

  const model = await getModel();

  const systemMsg = {
    role: 'system',
    content:
      'You are Stellar AI, a concise browser-assistant. Answer clearly; use markdown (headers, bold, lists, code blocks) when it helps readability. ' +
      'Use provided page visuals and screenshots as primary visual evidence when relevant. ' +
      'You can use markdown images ![alt](url) to show photos if relevant. ' +
      'End every response with exactly one line: [CONFIDENCE:X.XX] where X.XX is your confidence from 0 to 1.',
  };

  const validImages = [screenshot, ...pageImages, ...images].filter(Boolean).slice(0, 8);
  const userContent = validImages.length
    ? [
        { type: 'text', text: `Page: ${pageContent}\n\nQuestion: ${query}` },
        ...validImages.map(url => ({ type: 'image_url', image_url: { url, detail: 'low' } })),
      ]
    : `Page content:\n${pageContent}\n\nQuestion: ${query}`;

  const messages = [systemMsg, ...history.slice(-10), { role: 'user', content: userContent }];

  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, max_tokens: 700, temperature: 0.7, stream: true }),
    });

    if (!res.ok) {
      const data = await res.json();
      port.postMessage({ type: 'error', error: data.error?.message || `OpenAI error ${res.status}` });
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const text = parsed.choices?.[0]?.delta?.content || '';
          if (text) {
            accumulated += text;
            port.postMessage({ type: 'chunk', text });
          }
        } catch { /* malformed SSE line */ }
      }
    }

    const match = accumulated.match(/\[CONFIDENCE:([\d.]+)\]/);
    const confidence = match ? Math.min(1, Math.max(0, parseFloat(match[1]))) : 0.82;
    const cleanText = accumulated.replace(/\[CONFIDENCE:[\d.]+\]\s*$/, '').trim();

    const { totalRequests = 0 } = await chrome.storage.local.get('totalRequests');
    await chrome.storage.local.set({ totalRequests: totalRequests + 1, lastUsed: Date.now() });

    port.postMessage({ type: 'done', confidence, cleanText });
  } catch (err) {
    port.postMessage({ type: 'error', error: err.message });
  }
}

async function handleFlashcards({ pageContent, count = 5 }) {
  const apiKey = await getApiKey();
  if (!apiKey) return { error: 'No API key set.' };

  const model = await getModel();

  const system = {
    role: 'system',
    content: `Create exactly ${count} flashcards as JSON. Return ONLY valid JSON: {"cards":[{"q":"question","a":"answer"},...]}`,
  };
  const user = {
    role: 'user',
    content: `Make ${count} flashcards from this page:\n\n${pageContent.slice(0, 5000)}`,
  };

  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: model.includes('mini') ? model : 'gpt-4o-mini',
        messages: [system, user],
        response_format: { type: 'json_object' },
        max_tokens: 1400,
        temperature: 0.5,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || `OpenAI error ${res.status}`);
    const parsed = JSON.parse(data.choices[0].message.content);
    const cards = parsed.cards || parsed.flashcards || (Array.isArray(parsed) ? parsed : []);
    if (!cards.length) return { error: 'No cards returned.' };
    return { cards: cards.slice(0, count) };
  } catch (err) {
    return { error: err.message };
  }
}

async function handleCapture() {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 50 });
    return { screenshot: dataUrl };
  } catch {
    return { screenshot: null };
  }
}

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'stellar-stream') return;
  port.onMessage.addListener((msg) => {
    if (msg.type === 'QUERY_OPENAI_STREAM') handleQueryStream(port, msg);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_FLASHCARDS') { handleFlashcards(message).then(sendResponse); return true; }
  if (message.type === 'CAPTURE_SCREENSHOT') { handleCapture().then(sendResponse); return true; }
});
