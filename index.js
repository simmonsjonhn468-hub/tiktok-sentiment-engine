const Sentiment = require('sentiment');
const axios = require('axios');
const sentiment = new Sentiment();

// Your API Key is now locked in
const API_KEY = '84c616f955mshf5366a38a6a9b8bp157011jsn0db1ee174b05'; 

async function analyzeComments(videoUrl) {
    console.log(`\n--- SCANNING LIVE TIKTOK ---`);
        
            const options = {
                    method: 'GET',
                            url: 'https://tiktok-scraper7.p.rapidapi.com/comment/list',
                                    params: {url: videoUrl, count: '10'},
                                            headers: {
                                                        'x-rapidapi-key': API_KEY,
                                                                    'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
                                                                            }
                                                                                };

                                                                                    try {
                                                                                            const response = await axios.request(options);
                                                                                                    // We look for the comments in the data
                                                                                                            const comments = response.data.data.comments;

                                                                                                                    if (!comments || comments.length === 0) {
                                                                                                                                console.log("No comments found. Try a different video link!");
                                                                                                                                            return;
                                                                                                                                                    }

                                                                                                                                                            comments.forEach((c, i) => {
                                                                                                                                                                        const score = sentiment.analyze(c.text).score;
                                                                                                                                                                                    const vibe = score > 0 ? 'POSITIVE ✅' : (score < 0 ? 'NEGATIVE ❌' : 'NEUTRAL 😐');
                                                                                                                                                                                                console.log(`[${i+1}] @${c.author.nickname}: ${c.text}`);
                                                                                                                                                                                                            console.log(`Verdict: ${vibe} (Score: ${score})\n`);
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                                console.error("Error grabbing data:", error.message);
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                    // TEST LINK (You can change this to any TikTok video URL)
                                                                                                                                                                                                                                    analyzeComments("https://www.tiktok.com/@tiktok/video/7106970104523328810");
                                                                                                                                                                                                                                    