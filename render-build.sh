#!/usr/bin/env bash
# Build script for Render.com

# Exit if any command fails
set -e

# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Build the client application
cd client && npm run build && cd ..

echo "Build completed successfully!"