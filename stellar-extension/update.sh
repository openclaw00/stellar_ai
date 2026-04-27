#!/bin/bash
cd "$(dirname "$0")"

echo "Pulling latest changes..."
git pull

echo ""
echo "Opening Chrome extensions page..."

if [[ "$OSTYPE" == "darwin"* ]]; then
  open -a "Google Chrome" "chrome://extensions" 2>/dev/null \
    || open -a "Chromium" "chrome://extensions" 2>/dev/null
elif command -v google-chrome &>/dev/null; then
  google-chrome "chrome://extensions" 2>/dev/null &
elif command -v chromium &>/dev/null; then
  chromium "chrome://extensions" 2>/dev/null &
fi

echo "Click the reload button on Stellar AI and you're good."
