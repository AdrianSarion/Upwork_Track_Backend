// Access global webhook storage
let webhooks = global.webhooks || [];

// Enable CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default function handler(req, res) {
  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).set(headers).end();
    return;
  }

  // Set CORS headers for all responses
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'success',
      count: webhooks.length,
      data: webhooks
    });
  }

  // Method not allowed
  return res.status(405).json({
    status: 'error',
    message: `Method ${req.method} Not Allowed`
  });
} 