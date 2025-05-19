// Initialize global storage for webhooks
let webhooks = global.webhooks || [];
const MAX_WEBHOOKS = 100;

// Enable CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default async function handler(req, res) {
  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).set(headers).end();
    return;
  }

  // Set CORS headers for all responses
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  if (req.method === 'POST') {
    try {
      // Parse data
      let data = req.body;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

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

      // Update global storage
      global.webhooks = webhooks;

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
  }

  // Method not allowed
  return res.status(405).json({
    status: 'error',
    message: `Method ${req.method} Not Allowed`
  });
} 