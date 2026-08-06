const fs = require('fs');
const path = require('path');
const analyser = require('../replay-analyser.js');

const root = path.resolve(__dirname, '..');
const fileName = 'Sehr echtes Replay.html';
const input = path.join(root, 'replays', fileName);
const output = path.join(root, 'default-replay.js');

if (!fs.existsSync(input)) {
  console.error(`Default replay not found: ${input}`);
  process.exit(1);
}

const replay = analyser.analyzeReplayHtml(fs.readFileSync(input, 'utf8'), { fileName });
fs.writeFileSync(output, `window.DEFAULT_REPLAY_DETAILS = ${JSON.stringify(replay, null, 2)};\n`);
console.log(`Generated display-only replay details at ${output}`);
