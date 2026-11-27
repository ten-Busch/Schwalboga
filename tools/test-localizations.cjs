const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const verified=read('data/localization/verified-names.json'),forms=read('data/localization/form-names.json'),translations=read('data/translations.json');
for(const file of read('data/localization/sources.json').files)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'data/localization',file.filename))).digest('hex'),file.sha256);
const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'data/pokedex-data.js'),'utf8'),c);
const {POKEDEX_ENTRIES:entries,POKEDEX_META:meta}=c.window;
let count=0;
for(const kind of ['pokemon','moves','abilities'])for(const [id,label]of Object.entries(verified[kind])){
  assert.equal(translations[kind][id]?.de,label.de,`${kind}/${id} import source`);count++;
}
for(const p of entries){
  const expected=verified.pokemon[p.speciesId]??forms[p.speciesId];
  if(expected)assert.equal(p.names?.de,expected.de,p.name);
  for(const a of p.abilityDetails)if(verified.abilities[a.id])assert.equal(a.names?.de,verified.abilities[a.id].de,`${p.name}/${a.id}`);
}
for(const a of meta.abilityOptions)if(verified.abilities[a.id])assert.equal(a.names?.de,verified.abilities[a.id].de);
for(const m of meta.moves)if(verified.moves[m.id])assert.equal(m.names?.de,verified.moves[m.id].de);
for(const [id,m]of Object.entries(meta.movesById))if(verified.moves[id])assert.equal(m.names?.de,verified.moves[id].de);
for(const [id,a]of Object.entries(read('data/ability-type-counts.json').abilityNames))if(verified.abilities[id])assert.equal(a.names?.de,verified.abilities[id].de);
for(const [id,m]of Object.entries(read('data/move-learnset-counts.json').moves))if(verified.moves[id])assert.equal(m.names?.de,verified.moves[id].de);
const coverage=read('data/pokemon-move-coverage.json');for(const p of entries)if(coverage[p.speciesId]&&p.names?.de)assert.equal(coverage[p.speciesId].names?.de,p.names.de);
const byName=new Map(entries.map(p=>[p.name,p]));
for(const [name,de]of Object.entries({Mankey:'Menki',Magikarp:'Karpador',Haunter:'Alpollo',Cyndaquil:'Feurigel',Stufful:'Velursi',Fletchinder:'Dartignis',Swoobat:'Fletiamo',Tinkaton:'Granforgita'}))assert.equal(byName.get(name).names.de,de);
assert.equal(meta.abilityOptions.find(a=>a.id==='synchronize').names.de,'Synchro');
assert.equal(meta.movesById.psyshock.names.de,'Psychoschock');
assert.equal(meta.movesById.surf.names.de,'Surfer');
const englishNames=new Map(Object.entries(verified.abilities).map(([id,label])=>[id,label.de]));
assert.notEqual(englishNames.get('tintedlens'),englishNames.get('aftermath'));
console.log(`Passed ${count} verified name mappings, ${Object.keys(forms).length} composed form labels, pinned source hashes, generated labels/search options and aggregate consistency.`);
