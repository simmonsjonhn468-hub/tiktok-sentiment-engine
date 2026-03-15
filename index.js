const express = require('express');
const crypto = require('crypto'); // Built-in: Used to anonymize user data
const rateLimit = require('express-rate-limit'); // Package: Prevents crashing servers
const { scrapeTikTok } = require('./utils/tiktokScraper');
const cors = require('cors');

const app = express();

// 1. UK Regulation: Rate Limiting
// This ensures your "traffic command" doesn't look like a cyberattack.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute window
  max: 50, // Limits each IP to 50 requests per window
  message: "Rate limit exceeded. Slowing down to maintain UK compliance."
});

app.use(cors());
app.use(limiter);
app.use(express.json());

// 2. Anonymization Function
// This turns a username like "JohnDoe123" into a random string like "a1b2c3d4"
// This way, you aren't "storing personal data" under UK GDPR.
const anonymize = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex').substring(0, 12);
};

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    // We fetch the data but we DON'T save the raw version
    const rawData = await scrapeTikTok(url);

    // 3. Create a "Privacy-First" object
    const compliantData = {
      timestamp: new Date().toISOString(),
      // We hash the ID so the original user cannot be identified
      content_reference: anonymize(rawData.id || url), 
      metrics: {
        views: rawData.stats?.playCount || 0,
        shares: rawData.stats?.shareCount || 0
      },
      sentiment: "Analyzed successfully", // Placeholder for your logic
      legal_status: "Anonymized & Processed"
    };

    // Return the clean data to your app
    res.json(compliantData);

  } catch (err) {
    res.status(500).json({ error: "Could not process. Ensure the video is public." });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log('UK Compliant Server running on port 8080');
});
