#!/bin/bash

# Navigate to backend directory and start server
cd backend
echo "Starting backend server..."
node server.js &

# Wait a moment for backend to start
sleep 3

# Navigate back to root and start frontend
cd ..
echo "Starting frontend server..."
npm run dev