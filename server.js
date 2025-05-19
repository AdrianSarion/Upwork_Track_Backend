const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Global storage for webhooks
let webhooks = [];
const MAX_WEBHOOKS = 100;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Keep server alive
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

// API endpoint for receiving webhooks
app.post('/api/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  try {
    const data = req.body;
    
    // Create webhook entry
    const webhookData = {
      id: Date.now().toString(),
      data,
      timestamp: new Date().toISOString(),
      source: req.headers['user-agent'] || 'Unknown'
    };
    
    // Store webhook
    webhooks.unshift(webhookData);
    if (webhooks.length > MAX_WEBHOOKS) {
      webhooks.pop();
    }
    
    // Return success
    return res.status(200).json({
      status: 'success',
      message: 'Webhook received',
      data: webhookData
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ 
      status: 'error',
      message: 'Invalid webhook data',
      error: error.message
    });
  }
});

// API endpoint for getting all webhooks
app.get('/api/webhooks', (req, res) => {
  console.log('Fetching webhooks, count:', webhooks.length);
  return res.status(200).json({
    status: 'success',
    count: webhooks.length,
    data: webhooks
  });
});

// API test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint accessed');
  res.status(200).json({
    message: 'API is working!'
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Webhook URL: http://localhost:${PORT}/api/webhook`);
});

// Keep the process running
server.on('error', (error) => {
  console.error('Server error:', error);
}); 