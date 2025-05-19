# Upwork Job Track - Webhook Monitor

A modern application for receiving and displaying webhook data in real-time. The system consists of:

1. **Backend**: Serverless API endpoints to receive and store webhook data
2. **Frontend**: Luxury React UI with Material-UI components to display webhook data in real-time

## Architecture

- **Backend**: Vercel serverless functions (no Express.js)
- **Frontend**: React with Material-UI, Framer Motion for animations
- **Real-time updates**: Frontend polls the backend every 5 seconds for new data

## Backend API Endpoints

- `POST /api/webhook` - Receive webhook data from third-party platforms
- `GET /api/webhooks` - Get all stored webhook data
- `GET /api/health` - Health check endpoint

## Features

- 📡 Receive webhook data from any third-party service
- 🎨 Beautiful, modern UI with animations and transitions
- 🔄 Automatic updates when new webhook data is received
- 📱 Fully responsive design for all device sizes
- 🧪 Test webhooks directly from the UI
- 📋 Copy webhook URL and data to clipboard
- 🔍 Detailed view for each webhook

## Local Development

### Prerequisites

- Node.js 18+
- Vercel CLI (optional for serverless development)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/upwork-job-track.git
cd upwork-job-track
```

2. Install dependencies:
```bash
npm run install:all
```

3. Create a `.env` file in the `frontend` directory:
```
REACT_APP_API_URL=http://localhost:3000
```

4. Start the development servers:
```bash
# In one terminal, start the backend
npm run dev

# In another terminal, start the frontend
cd frontend
npm start
```

5. Open your browser to `http://localhost:3000` for the frontend

## Deployment

### Backend Deployment

1. Push your code to GitHub
2. Import the repository into Vercel
3. Vercel will automatically deploy the serverless functions

### Frontend Deployment

1. Update the API URL in `/frontend/src/App.js` to point to your deployed backend
2. Deploy the frontend to Vercel or any static site hosting

## Testing Webhooks

You can test webhooks by:

1. Using the built-in webhook tester in the UI
2. Sending a POST request to your webhook endpoint:
```bash
curl -X POST https://your-backend.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"test","data":"Hello from webhook!"}'
```

## License

MIT 