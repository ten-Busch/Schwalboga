const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let seed=251125;const math=Object.create(Math);math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
const c={window:{},Math:math};vm.createContext(c);
for(const file of ['data/pokedex-data.js','data/evolution-levels.js','milo-questions.js','milo-phone.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
const {POKEDEX_ENTRIES:entries,POKEDEX_META:meta}=c.window;
const byName=new Map(entries.map(p=>[p.name,p]));
const methods=(sources,gen)=>[...new Set(sources.filter(s=>s.startsWith(String(gen))).map(s=>s[1]))].sort();
const generate=c.window.createMiloQuestionGenerator(entries,meta.movesById,p=>p.cost);
const dex={};vm.createContext(dex);vm.runInContext(fs.readFileSync(path.join(root,'pokedex.ts'),'utf8').replace('export const Pokedex =','this.Pokedex ='),dex);
for(const [parent,level] of Object.entries(c.window.POKEMON_EVOLUTION_LEVELS)) {
  const children=Object.values(dex.Pokedex).filter(p=>p.prevo===parent&&!p.forme&&!p.evoType&&!p.evoCondition&&Number.isInteger(p.evoLevel));
  assert.equal(level,Math.min(...children.map(p=>p.evoLevel)));
}
const variants=[[16000,'learning-offtype'],[32000,'learning-offtype'],[64000,'learning-stab'],[125000,'learning-stab'],[250000,'evolution-delay'],[250000,'learning-generation']];
const seenMethods=new Set(),species=new Set();
for(const [prize,category] of variants) {
  const seen=new Set();
  for(let i=0;i<150;i++) {
    const q=generate(prize,seen,category);assert.ok(q,category);
    assert.equal(q.category,category);assert.equal(q.prize,prize);assert.equal(new Set(q.options).size,4);
    const d=q.learning,p=byName.get(q.referencePokemon[0].name);species.add(p.name);seenMethods.add(d.method);
    const answer=q.options[q.correct];
    if(category==='learning-generation') {
      const id=Object.keys(p.learnset).find(id=>(meta.movesById[id]?.names?.de??meta.movesById[id]?.name)===d.move);
      assert.deepEqual(methods(p.learnset[id],d.fromGen),[d.from]);assert.deepEqual(methods(p.learnset[id],d.gen),[d.method]);
      assert.notEqual(d.from,d.method);assert.equal(answer,d.labels[d.method]);assert.ok(!q.options.includes(d.labels[d.from]));
    } else if(category==='evolution-delay') {
      assert.equal(d.evolutionLevel,c.window.POKEMON_EVOLUTION_LEVELS[p.name]);
      const all=Object.entries(p.learnset).flatMap(([id,sources])=>sources.filter(s=>s.startsWith(d.gen+'L')).map(s=>({id,level:Number(s.slice(2))})));
      const next=Math.min(...all.filter(r=>r.level>d.evolutionLevel).map(r=>r.level));
      assert.equal(d.level,next);assert.equal(answer,d.move);
      assert.equal(new Set(all.filter(r=>r.level===next).map(r=>r.id)).size,1);
      assert.ok(d.rows.filter(r=>r.label!==answer).every(r=>r.level!==d.level));
    } else {
      assert.ok(!p.prevo);assert.ok(d.gen<=8);
      for(const row of d.rows) {
        assert.equal(p.types.includes(row.type),category==='learning-stab');
        const actual=methods(p.learnset[row.id],d.gen);
        if(row.label===answer)assert.deepEqual(actual,[d.method]);
        else assert.ok(!actual.includes(d.method));
      }
      if(category==='learning-offtype')assert.notEqual(d.method,'S');
    }
    const wrong=q.options.filter((_,index)=>index!==q.correct);
    const contacts=c.window.createMiloPhoneContacts({question:q,prize,player:'Tester'});
    for(const id of ['learning-reminder','learning-schoolboy','learning-veteran'])assert.ok(contacts.some(contact=>contact.id===id));
    for(const contact of contacts.filter(contact=>contact.id.startsWith('learning-'))) {
      for(const survivor of wrong) {
        const text=contact.dialogue({wrong:[survivor]}).map(l=>l.text).join(' ');
        for(const eliminated of wrong.filter(w=>w!==survivor)) {
          const escaped=eliminated.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
          assert.ok(!new RegExp(`(^|[^\\p{L}\\p{N}-])${escaped}($|[^\\p{L}\\p{N}-])`,'u').test(text),`${contact.id}: ${text}`);
        }
      }
    }
    const selected=c.window.selectMiloPhoneContacts({question:q,prize,player:'Tester'});assert.equal(selected.length,3);
    assert.ok(selected.every(contact=>!contact.id.startsWith('frank-placeholder')));
  }
  const gen1=generate.genOne(prize,new Set(),category);assert.ok(gen1);assert.ok(byName.get(gen1.referencePokemon[0].name).num<=151);
}
for(const method of ['M','E','T','S','L'])assert.ok(seenMethods.has(method));
assert.ok(generate.availableCategories(250000).includes('evolution-delay'));
assert.ok(!generate.availableCategories(500000).includes('learning-generation'));
console.log(`Passed 900 learning questions across six category/prize combinations (${species.size} species): exclusive methods, same/off-type answers, next evolution levels, generation changes, Gen 1, phone spread and 50:50.`);
