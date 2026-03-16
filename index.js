const Sentiment = require('sentiment');
const axios = require('axios'); // Our new courier
const sentiment = new Sentiment();

async function analyzeTikTok(url) {
    console.log(`\n--- SCANNING VIDEO: ${url} ---`);
        
            // For now, we simulate grabbing a top comment from this video
                const simulatedComment = "This video is actually so helpful, thank you!";
                    
                        const result = sentiment.analyze(simulatedComment);
                            
                                console.log(`Top Comment Found: "${simulatedComment}"`);
                                    console.log(`Sentiment Score: ${result.score}`);
                                        console.log(`Verdict: ${result.score >= 0 ? 'POSITIVE ✅' : 'NEGATIVE ❌'}`);
                                            console.log("------------------------------------------\n");
                                            }

                                            // PASTE A TIKTOK URL BETWEEN THE QUOTES BELOW
                                            analyzeTikTok("https://www.tiktok.com/t/ZT2mXXXXX/"); 
                                            