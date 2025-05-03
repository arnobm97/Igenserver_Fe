#!/bin/bash
set -e

# Load nvm (adjust the path if needed)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node.js 18
nvm use v22.14.0

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
