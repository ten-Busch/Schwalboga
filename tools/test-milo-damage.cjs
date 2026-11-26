const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const calc=require('../damage-calc-master/calc/dist');
let seed=261126;const math=Object.create(Math);math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
const c={window:{},Math:math};vm.createContext(c);
const scripts=['data/pokedex-data.js','data/milo-calc.js','milo-damage.js','milo-questions.js','milo-phone.js'];
for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
const {POKEDEX_ENTRIES:entries,POKEDEX_META:meta}=c.window;
const byName=new Map(entries.map(p=>[p.name,p]));
const generator=c.window.createMiloDamageGenerator(entries,meta.movesById);
const gen=calc.Generations.get(9),zero={hp:0,atk:0,def:0,spa:0,spd:0,spe:0};
const make=(p,ability)=>new calc.Pokemon(gen,p.name,{level:100,nature:'Serious',ivs:zero,evs:zero,boosts:zero,ability,item:'',status:'',abilityOn:false,overrides:{types:p.types,baseStats:p.baseStats}});
const bands={32000:[.35,.4],64000:[.2,.35],125000:[.1,.2],250000:[.04,.1],500000:[0,.04]};
let specials=0,criticals=0,maxMs=0;
for(const prize of [32000,64000,125000,250000,500000])for(let i=0;i<45;i++) {
  const start=Date.now(),q=generator(prize);maxMs=Math.max(maxMs,Date.now()-start);
  assert.ok(q,`Failed ${prize}`);assert.equal(new Set(q.options).size,4);
  const b=q.battle,a=byName.get(b.attacker.name),d=byName.get(b.defender.name);
  assert.ok(a.abilityDetails.some(x=>x.name===b.attacker.ability));assert.ok(d.abilityDetails.some(x=>x.name===b.defender.ability));
  const averages=[];
  for(const row of b.answers) {
    assert.ok(a.moveIds.includes(row.id));
    const attack=make(a,b.attacker.ability),defense=make(d,b.defender.ability);
    assert.deepEqual(attack.ivs,zero);assert.deepEqual(attack.evs,zero);assert.equal(attack.nature,'Serious');assert.equal(attack.level,100);
    assert.equal(attack.stats.atk,2*a.baseStats.atk+5);
    const data=gen.moves.get(row.id),move=new calc.Move(gen,data.name,{ability:b.attacker.ability,species:a.name});
    assert.ok(!data.multihit);move.isCrit=Boolean(data.willCrit);
    const result=calc.calculate(gen,attack,defense,move,new calc.Field({gameType:'Singles'}));
    const rolls=typeof result.damage==='number'?[result.damage]:result.damage;
    const average=rolls.reduce((sum,n)=>sum+n,0)/rolls.length;
    assert.equal(row.average,average,`${a.name} ${d.name} ${row.id}`);
    assert.equal(row.minimum,Math.min(...rolls));assert.equal(row.maximum,Math.max(...rolls));
    assert.equal(row.critical,Boolean(result.rawDesc.isCritical));
    assert.equal(result.attacker.status,'');assert.ok(!result.field.weather&&!result.field.terrain);assert.ok(!result.attacker.teraType);
    averages.push(average);
    if(row.special)specials++;
    if(row.guaranteedCritical)criticals++;
    if(prize<125000)assert.equal(row.special,false);
    if(!row.guaranteedCritical)assert.equal(row.critical,false);
  }
  const best=Math.max(...averages);assert.equal(averages.filter(v=>v===best).length,1);assert.equal(averages[q.correct],best);
  for(let a=0;a<averages.length;a++)for(let b=a+1;b<averages.length;b++)assert.ok(Math.abs(averages[a]-averages[b])>=1,`${prize}: averages less than 1 HP apart`);
  const second=[...averages].sort((a,b)=>b-a)[1],gap=(best-second)/best;
  assert.ok(gap>bands[prize][0]&&gap<=bands[prize][1]);assert.equal(b.gap,gap);
  if(prize===500000)assert.ok(averages.every(n=>n>=best*.75));
  assert.deepEqual(JSON.parse(JSON.stringify(b.attacker.stats)),make(a,b.attacker.ability).rawStats);
  assert.deepEqual(JSON.parse(JSON.stringify(b.defender.stats)),make(d,b.defender.ability).rawStats);
  const phoneQuestion={...q,category:'damage-comparison'};
  const contacts=c.window.createMiloPhoneContacts({question:phoneQuestion,prize,player:'Tester'});
  const nerd=contacts.find(contact=>contact.id==='damage-stat-nerd');
  const trainer=contacts.find(contact=>contact.id==='damage-balanced-trainer');
  const analyst=contacts.find(contact=>contact.id==='damage-analyst');
  assert.ok(nerd&&trainer&&analyst);
  assert.equal(nerd.usefulness,'semi');assert.equal(trainer.usefulness,'semi');assert.equal(analyst.usefulness,'helpful');
  const wrong=q.options.filter((_,i)=>i!==q.correct),bestRow=b.answers.find(row=>row.label===q.options[q.correct]);
  for(const survivor of wrong) {
    const lines=trainer.dialogue({wrong:[survivor]});
    const clue=lines[0].text;
    const visible=b.answers.filter(row=>row.label===q.options[q.correct]||row.label===survivor);
    assert.ok(visible.some(row=>clue.startsWith(row.label+' trifft ')),clue);
    for(const eliminated of wrong.filter(label=>label!==survivor))assert.ok(!clue.startsWith(eliminated+' trifft '));
    assert.ok(analyst.dialogue({wrong:[survivor]})[0].text.includes(bestRow.label));
  }
  const report=analyst.dialogue({wrong})[0].text;
  assert.ok(report.includes(bestRow.average.toLocaleString('de-DE',{maximumFractionDigits:4})));
  const statHint=nerd.dialogue({wrong})[0].text;
  assert.ok(statHint.includes(`${b.attacker.stats.atk} Angriff`));assert.ok(statHint.includes(`${b.defender.stats.spd} Spezial-Verteidigung`));
  const selected=c.window.selectMiloPhoneContacts({question:phoneQuestion,prize,player:'Tester'});
  assert.equal(selected.length,3);assert.ok(selected.every(contact=>!contact.id.startsWith('frank-placeholder')));
}
assert.ok(specials>0);assert.ok(criticals>0);
// Freeze-Dry's Water interaction and guaranteed critical hits suppressed by armor.
const lapras=byName.get('Lapras'),gyarados=byName.get('Gyarados');
let rows=generator.calculate(lapras,{id:'waterabsorb',name:'Water Absorb'},gyarados,{id:'moxie',name:'Moxie'},['freezedry','icebeam']);
assert.ok(rows.find(r=>r.id==='freezedry').average>rows.find(r=>r.id==='icebeam').average);
assert.equal(rows.find(r=>r.id==='freezedry').matchup.typeMultiplier,4);
assert.equal(rows.find(r=>r.id==='icebeam').matchup.typeMultiplier,1);
const throh=byName.get('Throh'),drapion=byName.get('Drapion');
const critical=generator.calculate(throh,{id:'guts',name:'Guts'},drapion,{id:'sniper',name:'Sniper'},['stormthrow'])[0];
const blocked=generator.calculate(throh,{id:'guts',name:'Guts'},drapion,{id:'battlearmor',name:'Battle Armor'},['stormthrow'])[0];
assert.equal(critical.critical,true);assert.equal(blocked.critical,false);assert.ok(critical.average>blocked.average);
const sylveon=byName.get('Sylveon');
const converted=generator.calculate(sylveon,{id:'pixilate',name:'Pixilate'},gyarados,{id:'moxie',name:'Moxie'},['hypervoice'])[0];
assert.equal(converted.type,'Fairy');assert.equal(converted.stab,true);
const espeon=byName.get('Espeon');
const psyshock=generator.calculate(espeon,{id:'synchronize',name:'Synchronize'},gyarados,{id:'moxie',name:'Moxie'},['psyshock'])[0];
assert.equal(psyshock.defenseStat,'def');
const main=c.window.createMiloQuestionGenerator(entries,meta.movesById,p=>p.cost);
for(const prize of Object.keys(bands).map(Number)) {
  const q=main(prize,new Set(),'damage-comparison');assert.ok(q);assert.equal(q.category,'damage-comparison');
  const gen1=main.genOne(prize,new Set(),'damage-comparison');assert.ok(gen1);assert.ok(gen1.referencePokemon.every(p=>byName.get(p.name).num<=151));
}
console.log(`Passed 225 damage questions against the independent CommonJS calculator: zero IV/EV stats, averages, gaps, legal moves/abilities, specials (${specials}), criticals (${criticals}), armor, Freeze-Dry, Pixilate, Psyshock, Gen 1; all three contacts, stored stats/reports, 50:50 and phone spread. Slowest draw ${maxMs}ms.`);

async function browserCheck() {
  const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',async(route)=>{
    const url=new URL(route.request().url());if(url.hostname!=='localhost')return route.abort();
    if(url.pathname==='/')return route.fulfill({contentType:'text/html; charset=utf-8',body:`<head><meta charset="utf-8"><link rel="stylesheet" href="milo-quiz.css">${[...scripts,'milo-quiz.js'].map(file=>`<script src="${file}"></script>`).join('')}</head><body class="milo-page"></body>`});
    const file=path.join(root,decodeURIComponent(url.pathname));
    if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
    return route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'image/png'});
  });
  await page.goto('http://localhost:4848/');
  await page.evaluate(()=>{
    const g=createMiloQuestionGenerator(POKEDEX_ENTRIES,POKEDEX_META.movesById,p=>p.cost);
    const wrapped=(prize,...args)=>{const q=prize>=32000?g(prize,args[0],'damage-comparison'):g(prize,...args);window.latest=q;return q;};
    createMiloQuiz(()=>'admin',wrapped,{load:async()=>[],localScores:async()=>[]}).open('admin');
  });
  await page.locator('input[name=player]').fill('Test');await page.getByRole('button',{name:'Weiter',exact:true}).click();await page.getByRole('button',{name:'Spiel starten',exact:true}).click();
  await page.keyboard.down('d');await page.getByRole('button',{name:'Dev · Zu Frage springen',exact:true}).click();await page.getByLabel('Frage und Gewinnstufe').selectOption('10');await page.getByRole('button',{name:'Zur Frage springen',exact:true}).click();await page.keyboard.up('d');
  const panel=page.getByRole('complementary',{name:'Kampfbedingungen'});
  assert.ok((await panel.textContent()).includes('0 EVs · 0 IVs'));
  assert.ok((await panel.textContent()).includes('Angreifer:'));assert.ok((await panel.textContent()).includes('Verteidiger:'));
  const p=await panel.boundingBox(),q=await page.locator('.milo-question').boundingBox();assert.ok(p.y+p.height<=q.y);assert.ok(p.width<q.width);assert.ok(Math.abs(p.x+p.width-q.x-q.width)<2);
  if(process.env.MILO_QA_DIR)await page.screenshot({path:path.join(process.env.MILO_QA_DIR,'milo-damage-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});assert.ok(await panel.evaluate(p=>p.scrollWidth<=p.clientWidth));
  if(process.env.MILO_QA_DIR)await page.screenshot({path:path.join(process.env.MILO_QA_DIR,'milo-damage-mobile.png'),fullPage:true});
  async function callContact(name) {
    await page.keyboard.down('d');await page.locator('[data-milo-joker=telephone]').click();await page.keyboard.up('d');
    await page.getByRole('button',{name,exact:true}).click();
    await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  }
  await callContact('Kampfanalytiker');
  const expected=await page.evaluate(()=>latest.options[latest.correct]);
  assert.ok((await page.locator('.milo-phone p').textContent()).includes(expected));
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  assert.ok((await page.locator('.milo-phone p').textContent()).includes('Grundstärke'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await callContact('DamageCalc-Nerd');
  assert.ok((await page.locator('.milo-phone p').textContent()).includes('ohne Fähigkeitsmultiplikatoren'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await page.locator('[data-milo-joker=half]').click();
  await callContact('Ausgeglichener Trainer');
  const clue=await page.locator('.milo-phone p').textContent();
  const visible=await page.locator('.milo-answer:not(:disabled)').allTextContents();
  assert.ok(visible.some(label=>clue.startsWith(label.slice(4)+' trifft ')),clue);
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  const correct=await page.evaluate(()=>latest.correct);await page.locator('.milo-answer').nth(correct).click();await page.getByRole('button',{name:'Antwort einloggen',exact:true}).click();assert.ok((await page.locator('.milo-actions').last().textContent()).includes('Richtig!'));
  assert.deepEqual(errors,[]);await browser.close();console.log('Passed actual browser bundles, battle panel, mobile layout, all three phone dialogues, 50:50 hint visibility and answer validation.');
}
browserCheck().catch(error=>{console.error(error);process.exit(1);});
