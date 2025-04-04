# Feedback Board

A modern, interactive web application for collecting and managing user feedback. Built with the MERN stack (without MongoDB).

## Project Overview

Feedback Board is a responsive web application that allows users to:
- Submit feedback with their name and message
- View feedback from other users
- Like feedback entries
- Delete feedback entries
- Toggle between light and dark themes

## Tech Stack

### Frontend
- **React**: UI library for building the interface
- **Material-UI (MUI)**: Modern React UI framework
- **Framer Motion**: Animation library for smooth transitions
- **Axios**: HTTP client for API requests

### Backend
- **Express.js**: Node.js web application framework
- **Node.js**: JavaScript runtime environment
- **UUID**: For generating unique IDs

## Features

- **Modern UI/UX**: Clean, responsive design with animations
- **Theme Switching**: Toggle between dark and light modes
- **Real-time Feedback**: Submit and view feedback in real-time
- **Animations**: Smooth transitions and interactive elements
- **Form Validation**: Proper validation of user inputs
- **Notification System**: Snackbar alerts for user actions

## Project Structure

- **client** - React frontend application
  - `src/` - Source code for React components
  - `public/` - Static assets
- **server.js** - Express backend server
- **render-build.sh** - Build script for Render deployment

## Running The Project

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install server dependencies:
   ```
   npm install
   ```
3. Install client dependencies:
   ```
   npm run client-install
   ```

### Development Mode

Run both client and server concurrently:
```
npm run dev-full
```

Or separately:
- Server: `npm run dev`
- Client: `npm run client`

### Production Mode

Build and start the application:
```
npm run build
npm start
```

## Deployment

This project has been deployed on Render, included render-build.sh script.

See the production deployed at: https://feedback-board.onrender.com

## Demo
See the demo at: https://youtu.be/DL1EoPgTpyQ?si=UY0-_p5cIV6he-ER

## Future Improvements

- Add persistent database storage (MongoDB)
- Implement user authentication
- Add administrative features
- Include analytics and reporting
