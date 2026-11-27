// Update labels only; preserve existing stats, costs, learnsets and identifiers.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=(file)=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const verified=read('data/localization/verified-names.json'),translations=read('data/translations.json');
const normalize=(value)=>String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[\u2019']/g,'').replace(/[^a-z0-9]/g,'');
function setName(row,de){
  if(!de)return;
  row.names={...(row.names??{}),de};
  if(typeof row.searchText==='string'&&!row.searchText.split(' ').includes(normalize(de)))row.searchText+=' '+normalize(de);
}
function invariant(value){
  if(Array.isArray(value))return value.map(invariant);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([key])=>!['names','searchText'].includes(key)).map(([key,item])=>[key,invariant(item)]));
  return value;
}
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'data/pokedex-data.js'),'utf8'),context);
const data=JSON.parse(JSON.stringify(context.window)),before=invariant(data);
const byName=new Map(data.POKEDEX_ENTRIES.map(p=>[p.name,p]));
const oldNames=new Map(data.POKEDEX_ENTRIES.map(p=>[p.name,p.names?.de??p.name]));
const formChanges=[],formNames={};
for(const p of data.POKEDEX_ENTRIES.filter(p=>!p.forme))setName(p,verified.pokemon[p.speciesId]?.de);
for(const p of data.POKEDEX_ENTRIES.filter(p=>p.forme)) {
  const base=byName.get(p.baseSpecies);
  if(!base?.names?.de)continue;
  const oldBase=oldNames.get(base.name),old=p.names?.de??p.name;
  const prefixes=[oldBase,base.name].filter(Boolean).sort((a,b)=>b.length-a.length);
  const prefix=prefixes.find(prefix=>old===prefix||old.startsWith(prefix+'-'));
  if(!prefix)continue;
  const de=base.names.de+old.slice(prefix.length);
  formNames[p.speciesId]={de};
  if(de!==old)formChanges.push({id:p.speciesId,en:p.name,before:old,after:de});
  setName(p,de);
  // Explicit form overrides prevent a subsequent workbook/build cycle from
  // restoring a misspelled base name in an existing direct form translation.
  if(de!==old)translations.pokemon[p.speciesId]={de};
}
for(const p of data.POKEDEX_ENTRIES)for(const a of p.abilityDetails)setName(a,verified.abilities[a.id]?.de);
for(const a of data.POKEDEX_META.abilityOptions)setName(a,verified.abilities[a.id]?.de);
for(const m of data.POKEDEX_META.moves)setName(m,verified.moves[m.id]?.de);
for(const [id,m]of Object.entries(data.POKEDEX_META.movesById))setName(m,verified.moves[id]?.de);
assert.deepEqual(invariant(data),before,'Localization must not alter mechanics or IDs');
fs.writeFileSync(path.join(root,'data/pokedex-data.js'),`window.POKEDEX_ENTRIES = ${JSON.stringify(data.POKEDEX_ENTRIES,null,2)};\n\nwindow.POKEDEX_META = ${JSON.stringify(data.POKEDEX_META,null,2)};\n`);
const aggregates=[['data/ability-type-counts.json',(d)=>{for(const [id,a]of Object.entries(d.abilityNames))setName(a,verified.abilities[id]?.de);}],
  ['data/move-learnset-counts.json',(d)=>{for(const [id,m]of Object.entries(d.moves))setName(m,verified.moves[id]?.de);}],
  ['data/pokemon-move-coverage.json',(d)=>{for(const [id,p]of Object.entries(d))setName(p,data.POKEDEX_ENTRIES.find(p=>p.speciesId===id)?.names?.de);}]];
for(const [file,update]of aggregates){const d=read(file),before=invariant(d);update(d);assert.deepEqual(invariant(d),before);fs.writeFileSync(path.join(root,file),JSON.stringify(d,null,file.endsWith('pokemon-move-coverage.json')?undefined:2)+'\n');}
fs.writeFileSync(path.join(root,'data/translations.json'),JSON.stringify(translations,null,2)+'\n');
fs.writeFileSync(path.join(root,'data/localization/form-names.json'),JSON.stringify(formNames,null,2)+'\n');
const report=read('data/localization/audit-report.json');if(formChanges.length||!report.formChanges)report.formChanges=formChanges;fs.writeFileSync(path.join(root,'data/localization/audit-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Refreshed labels in main database and three aggregates; ${formChanges.length} form labels corrected. All non-label data preserved.`);
