import React from 'react';
import ReactDOM from 'react-dom/client';
import StellarApp from './StellarApp';

if (!document.getElementById('__stellar-ai__')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);

  const container = document.createElement('div');
  container.id = '__stellar-ai__';
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;';
  document.documentElement.appendChild(container);

  ReactDOM.createRoot(container).render(<StellarApp />);
}
