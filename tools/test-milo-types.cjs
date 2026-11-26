const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let seed = 25112026;
const math = Object.create(Math);
math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
const context = {window:{}, Math:math}; vm.createContext(context);
for (const file of ['data/pokedex-data.js','data/natures.js','milo-questions.js','milo-phone.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'), context);
const {POKEDEX_ENTRIES:entries,POKEDEX_META:meta}=context.window;
const factory=context.window.createMiloQuestionGenerator;
const generate=factory(entries,meta.movesById,(p)=>p.cost);
const {Generations}=require('../damage-calc-master/calc/dist');
const chart=Generations.get(9).types;
let neutral=0,resisted=0;
const species=new Set();
for(const prize of [200,300,500,1000,2000,4000,8000,16000,32000]) {
  for(let sample=0;sample<150;sample++) {
    const q=generate(prize,new Set(),'type-effectiveness'); assert.ok(q,`Missing ${prize}`);
    species.add(q.referencePokemon[0].name);
    const d=q.typeEffectiveness, right=d.answers.find((row)=>row.label===q.options[q.correct]);
    const wrong=d.answers.filter((row)=>row!==right);
    assert.equal(new Set(q.options).size,4);
    assert.ok(wrong.every((row)=>row.maximum<right.maximum));
    assert.equal(d.withAbilities,prize>=8000);
    const pokemon=entries.find((p)=>p.name===q.referencePokemon[0].name);
    for(const row of d.answers) {
      const base=pokemon.types.reduce((factor,type)=>factor*chart.get(row.type.toLowerCase()).effectiveness[type],1);
      assert.equal(row.base,base);
      assert.equal(row.abilities.length,pokemon.abilityDetails.length);
      assert.equal(row.maximum,Math.max(...row.abilities.map((a)=>a.multiplier)));
    }
    if(prize<=500) {assert.equal(right.base,4);assert.equal(wrong.filter((r)=>r.base===2).length,1);assert.equal(wrong.filter((r)=>r.base<=1).length,2);}
    if(prize>=1000&&prize<=4000) {assert.equal(right.base,2);assert.ok(wrong.some((r)=>r.cancelled));}
    if(prize<8000) assert.ok(d.answers.every((r)=>!r.changed));
    else assert.ok(d.answers.some((r)=>r.changed));
    if(prize===8000) {assert.equal(right.base,4);assert.equal(wrong.filter((r)=>r.base<=1).length,2);}
    if(prize===32000) {assert.ok(right.maximum<=2);assert.ok(wrong.some((r)=>r.cancelled));}
    if(prize>=16000&&right.maximum===1) neutral++;
    if(prize>=16000&&right.maximum>0&&right.maximum<1) resisted++;
    const allWrong=wrong.map((r)=>r.label);
    const contacts=context.window.createMiloPhoneContacts({question:q,prize,player:'Tester'});
    assert.ok(contacts.some((c)=>c.id==='type-safari-warden'));
    const expert=contacts.find((c)=>c.id==='type-expert'); assert.ok(expert);
    for(const survivor of allWrong) {
      const text=expert.dialogue({wrong:[survivor]}).map((l)=>l.text).join(' ');
      assert.ok(text.includes(q.options[q.correct]));
      for(const eliminated of allWrong.filter((w)=>w!==survivor)) assert.ok(!text.includes(eliminated+' würde'),text);
      const visitor=contacts.find((c)=>c.id==='type-dream-world-visitor');
      if(visitor) assert.ok(visitor.dialogue({wrong:[survivor]})[0].text.includes('Vielleicht hilft dir das.'));
    }
    const selected=context.window.selectMiloPhoneContacts({question:q,prize,player:'Tester'});
    assert.equal(selected.length,3);
    assert.ok(selected.every((c)=>!c.id.startsWith('frank-placeholder')),`${prize}: ${selected.map((c)=>c.id).join(',')}`);
  }
  const gen1=generate.genOne(prize,new Set(),'type-effectiveness');
  assert.ok(gen1);assert.ok(entries.find((p)=>p.name===gen1.referencePokemon[0].name).num<=151);
}
assert.ok(neutral>0);assert.ok(resisted>0);
// Focused ability fixtures: inspect every type/ability row offered across draws.
for(const [name,type,ability,expected,prize] of [
  ['Parasect','Fire','dryskin',5,8000],['Rotom-Wash','Ground','levitate',0,32000],
  ['Bewear','Fire','fluffy',2,16000],['Rhyperior','Water','solidrock',3,8000],
]) {
  const gen=factory(entries.filter((p)=>p.name===name),meta.movesById,(p)=>p.cost);
  let found=false;
  for(let i=0;i<100;i++) {
    const q=gen(prize,new Set(),'type-effectiveness');if(!q)continue;
    const row=q.typeEffectiveness.answers.find((r)=>r.type===type);
    if(row) {assert.equal(row.abilities.find((a)=>a.id===ability).multiplier,expected);found=true;break;}
  }
  assert.ok(found,name);
}
console.log(`Passed 1,350 type questions across all nine levels (${species.size} species), independent calculator type chart, ability fixtures, Gen 1, phone spread/50:50; neutral ${neutral}, resisted ${resisted}.`);
