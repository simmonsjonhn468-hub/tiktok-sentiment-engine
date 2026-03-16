
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

console.log("\n--- ENGINE TEST SUCCESSFUL ---");

const test = sentiment.analyze("I love this project, it is working great!");
console.log(`Vibe Check: ${test.score > 0 ? 'POSITIVE ✅' : 'NEGATIVE ❌'}`);
console.log("------------------------------\n");
