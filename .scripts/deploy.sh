#!/bin/bash
set -e

echo "==> Node version before setup:"
node -v

# Load nvm (if available)
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm install 20
  nvm use 20
else
  echo "❌ NVM not found! Cannot switch Node version."
  exit 1
fi

echo "==> Node version after setup:"
node -v

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload 4

echo "Deployment Finished!"
