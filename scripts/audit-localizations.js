const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'data/localization');
const commit = 'a5311f9f55a84376fd2e2499b25d9fb9640d9f2d';
const kinds = {pokemon:'Species',moves:'Moves',abilities:'Abilities'};
const normalize = (value) => String(value).replace(/♀/g,'f').replace(/♂/g,'m').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const json = (file, value) => fs.writeFileSync(path.join(directory,file),JSON.stringify(value,null,2)+'\n');
async function download() {
  fs.mkdirSync(directory,{recursive:true});
  const files = await Promise.all(Object.values(kinds).flatMap(kind=>['en','de'].map(async(language)=>{
    const filename=`text_${kind}_${language}.txt`;
    const url=`https://raw.githubusercontent.com/kwsch/PKHeX/${commit}/PKHeX.Core/Resources/text/other/${language}/${filename}`;
    const response=await fetch(url);if(!response.ok)throw new Error(`${url}: ${response.status}`);
    const bytes=Buffer.from(await response.arrayBuffer());fs.writeFileSync(path.join(directory,filename),bytes);
    return {filename,url,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};
  })));
  json('sources.json',{description:'German in-game names, mirrored in PKHeX. PKHeX is a community project, not an official Pokémon website.',repository:'https://github.com/kwsch/PKHeX',commit,files});
}
function tables() {
  const result=Object.fromEntries(Object.entries(kinds).map(([kind,label])=>{
    const read=(lang)=>fs.readFileSync(path.join(directory,`text_${label}_${lang}.txt`),'utf8').replace(/^\uFEFF/,'').trimEnd().split(/\r?\n/);
    const en=read('en'),de=read('de');if(en.length!==de.length)throw new Error(`Misaligned ${kind} tables`);
    const lookup=new Map();
    for(let i=1;i<en.length;i++)if(en[i]&&de[i]){
      const key=normalize(en[i]);if(!lookup.has(key))lookup.set(key,new Set());lookup.get(key).add(de[i]);
    }
    return [kind,{en,de,lookup}];
  }));
  const extra=path.join(directory,'gmax-names.json');
  if(fs.existsSync(extra))for(const row of JSON.parse(fs.readFileSync(extra,'utf8')).names)result.moves.lookup.set(normalize(row.en),new Set([row.de]));
  return result;
}
async function downloadGmax() {
  const url='https://www.bisafans.de/spiele/editionen/schild-schwert/neue-attacken.php';
  const response=await fetch(url);if(!response.ok)throw new Error(`Gmax names: ${response.status}`);
  const text=await response.text(),rows=new Map();
  for(const [html] of text.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi)) {
    const cells=[...html.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(([,cell])=>cell.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim());
    const en=cells.find(cell=>cell.startsWith('G-Max ')),de=cells.find(cell=>cell.startsWith('Giga-'));
    if(en&&de)rows.set(en,{en,de});
  }
  const names=[...rows.values()];
  if(names.length<32)throw new Error(`Unexpected Gmax name count: ${names.length}`);
  json('gmax-names.json',{description:'Supplementary community cross-check of Gigantamax battle-only move names, absent from PKHeX save-editing name tables. Publisher spot checks recorded separately; this is not an official publisher source.',url,sha256:crypto.createHash('sha256').update(text).digest('hex'),names});
}
function sourceNames(file) {
  const result=[];let id,lines=[],depth=0;
  for(const line of fs.readFileSync(path.join(root,file),'utf8').split(/\r?\n/)) {
    if(!id){const match=line.match(/^\t(?:"([^"]+)"|([a-z0-9]+)):\s*\{$/);if(!match)continue;id=match[1]??match[2];lines=[];depth=0;}
    lines.push(line);depth+=(line.match(/\{/g)??[]).length-(line.match(/\}/g)??[]).length;
    if(depth===0){const match=lines.join('\n').match(/\n\t\tname:\s*"((?:\\.|[^"\\])*)"/);if(match)result.push({id,name:JSON.parse(`"${match[1]}"`)});id=null;}
  }
  return result;
}
function audit() {
  const official=tables(),translations=JSON.parse(fs.readFileSync(path.join(root,'data/translations.json'),'utf8'));
  const publisher=JSON.parse(fs.readFileSync(path.join(directory,'publisher-checks.json'),'utf8'));
  const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'data/pokedex-data.js'),'utf8'),context);
  const entries=context.window.POKEDEX_ENTRIES;
  const rows={pokemon:entries.filter(p=>!p.forme).map(p=>({id:p.speciesId,name:p.name,num:p.num})),moves:sourceNames('moves.ts'),abilities:sourceNames('abilities_text.ts')};
  const overrides={pokemon:{},moves:{},abilities:{}},changes=[],unmatched=[],summary={},derived=[];
  for(const kind of Object.keys(kinds)) {
    let matched=0;
    for(const row of rows[kind]) {
      let candidates=official[kind].lookup.get(normalize(row.name));
      if(publisher[kind]?.[row.id])candidates=new Set([publisher[kind][row.id].de]);
      // Showdown distinguishes these ability variants; the games share one name.
      if(!candidates&&kind==='abilities'&&/^(As One|Embody Aspect) \(/.test(row.name))candidates=official[kind].lookup.get(normalize(row.name.replace(/ \(.+\)$/,'')));
      if(!candidates&&kind==='moves'&&row.id.startsWith('hiddenpower')) {
        const types={Bug:'Käfer',Dark:'Unlicht',Dragon:'Drache',Electric:'Elektro',Fighting:'Kampf',Fire:'Feuer',Flying:'Flug',Ghost:'Geist',Grass:'Pflanze',Ground:'Boden',Ice:'Eis',Poison:'Gift',Psychic:'Psycho',Rock:'Gestein',Steel:'Stahl',Water:'Wasser'};
        const type=row.name.slice('Hidden Power '.length);
        const base=[...(official.moves.lookup.get('hiddenpower')??[])][0];
        if(base&&types[type]){candidates=new Set([`${base} (${types[type]})`]);derived.push({id:row.id,reason:'Official Hidden Power name with a type annotation; not a separate official move name'});}
      }
      const names=candidates?[...candidates]:[];
      if(names.length!==1){unmatched.push({kind,...row,reason:names.length?'Ambiguous localized name':'No official name-table match'});continue;}
      const de=names[0];matched++;overrides[kind][row.id]={de};
      const before=translations[kind]?.[row.id]?.de??row.name;
      if(before!==de)changes.push({kind,id:row.id,en:row.name,before,after:de,previousExplicit:Boolean(translations[kind]?.[row.id]?.de)});
    }
    summary[kind]={checked:rows[kind].length,matched,changed:changes.filter(row=>row.kind===kind).length};
  }
  const result={sourceCommit:commit,summary,changes,unmatched,derived,forms:entries.filter(p=>p.forme).map(p=>({id:p.speciesId,name:p.name,baseSpecies:p.baseSpecies,translation:p.names?.de??p.name,status:'Composed form label; base name audited separately'}))};
  json('verified-names.json',overrides);json('audit-report.json',result);
  if(process.argv.includes('--apply')){
    for(const kind of Object.keys(kinds))translations[kind]={...translations[kind],...overrides[kind]};
    fs.writeFileSync(path.join(root,'data/translations.json'),JSON.stringify(translations,null,2)+'\n');
  }
  console.log(JSON.stringify({summary,unmatched,examples:changes.slice(0,15)},null,2));
}
async function main(){
  if(process.argv.includes('--list-resources')) {
    const response=await fetch(`https://api.github.com/repos/kwsch/PKHeX/git/trees/${commit}?recursive=1`,{headers:{'User-Agent':'Schwalboga-localization-audit'}});
    if(!response.ok)throw new Error(`GitHub tree: ${response.status}`);
    const tree=await response.json();console.log(tree.tree.filter(row=>/Resources\/text\/.*(giga|move)/i.test(row.path)&&/\/en\//.test(row.path)).map(row=>row.path));return;
  }
  if(process.argv.includes('--fetch'))await download();
  if(process.argv.includes('--fetch-gmax'))await downloadGmax();
  audit();
}
main().catch(error=>{console.error(error);process.exit(1);});
