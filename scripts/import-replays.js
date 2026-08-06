const fs = require('fs');
const path = require('path');
const analyser = require('../replay-analyser.js');
const viewerOnlyReplay = 'Sehr echtes Replay.html';

const input = path.resolve(process.argv[2] || path.join(__dirname, '..', 'replays'));
const output = path.resolve(process.argv[3] || path.join(__dirname, '..', 'data', 'replay-data.js'));

if (!fs.existsSync(input)) {
  console.error(`Replay source not found: ${input}`);
  console.error('Usage: node scripts/import-replays.js <html-file-or-folder> [output-file]');
  process.exit(1);
}

const discoveredFiles = fs.statSync(input).isDirectory()
  ? fs.readdirSync(input)
      .filter((name) => name.toLowerCase().endsWith('.html'))
      .map((name) => path.join(input, name))
  : [input];
const files = discoveredFiles.filter((file) => path.basename(file) !== viewerOnlyReplay);

if (!files.length) {
  console.log(`No data replays found. Skipped viewer-only replay "${viewerOnlyReplay}"; existing database was not changed.`);
  process.exit(0);
}

const replays = [];
for (const file of files) {
  try {
    replays.push(analyser.analyzeReplayHtml(fs.readFileSync(file, 'utf8'), { fileName: path.basename(file) }));
  } catch (error) {
    console.warn(`Skipped ${path.basename(file)}: ${error.message}`);
  }
}

const database = analyser.createDatabase(replays);
fs.writeFileSync(output, `window.REPLAY_DATABASE = ${JSON.stringify(database, null, 2)};\n`);
console.log(`Imported ${replays.length} replay(s) into ${output}`);
