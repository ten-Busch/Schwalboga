const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const screenshotDir = process.env.MILO_QA_DIR ?? require('node:os').tmpdir();
const { chromium } = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));

async function main() {
  // Real data: a scoped generator must restrict both reference and answer Pokémon.
  const context = { window: {} }; vm.createContext(context);
  for (const file of ['data/pokedex-data.js', 'data/captain-costs.js', 'data/natures.js', 'milo-questions.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  const { POKEDEX_ENTRIES: entries, POKEDEX_META: meta } = context.window;
  const generate = context.window.createMiloQuestionGenerator(entries, meta.movesById, (p, mode) => p[mode === 'doubles' ? 'cost_dbl' : 'cost']);
  const names = new Map(entries.filter((p) => !p.forme).flatMap((p) => [[p.name, p.num], [p.names?.de, p.num]]));
  for (const [prize, category] of [[50, 'spelling'], [100, 'spelling'], [200, 'spelling'], [300, 'spelling'], [300, 'translation'], [500, 'stat-comparison'], [1000, 'stat-value'], [8000, 'nature-effect'], [16000, 'shared-three'], [32000, 'shared-four'], [125000, 'stat-comparison']]) {
    let count = 0;
    for (let i = 0; i < 10; i++) {
      const q = generate.genOne(prize, new Set(), category);
      if (!q) continue;
      count++;
      assert.equal(q.category, category);
      for (const p of q.referencePokemon) assert.ok(names.get(p.name) <= 151, p.name);
      for (const answer of q.options) if (names.has(answer)) assert.ok(names.get(answer) <= 151, answer);
    }
    assert.ok(count, `${category} has Gen 1 questions`);
  }
  assert.ok(generate.availableCategories(8000).includes('nature-effect'));
  assert.ok(!generate.availableCategories(16000).includes('nature-effect'));

  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname !== 'localhost') return route.abort();
    if (url.pathname === '/') return route.fulfill({contentType:'text/html; charset=utf-8', body:'<head><meta charset="utf-8"><link rel="stylesheet" href="milo-quiz.css"><script src="milo-quiz.js"></script></head><body class="milo-page"></body>'});
    const file = path.join(root, decodeURIComponent(url.pathname));
    if (!fs.existsSync(file)) return route.abort();
    await route.fulfill({body:fs.readFileSync(file), contentType:file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'image/png'});
  });
  async function setup(bonus, noPokemon = false, answerOnly = false) {
    await page.goto('http://localhost:4848/');
    await page.evaluate(({noPokemon, answerOnly}) => {
      window.requests = []; window.saved = [];
      window.selectMiloPhoneContacts = () => ['Alpha','Beta','Gamma'].map(name => ({id:name,name,dialogue:()=>[{speaker:name,text:'Hallo',spoken:true}]}));
      let sequence = 0;
      function gen(prize, seen, required, excluded) {
        window.requests.push({prize,required,excluded});
        const q = { prompt: `${noPokemon ? 'Welche Zahl passt' : 'Welchen Wert hat Pikachu'}? ${++sequence}`, options:['25','35','45','55'], correct:0,
          category:required ?? (excluded === 'stat-value' ? 'nature-effect' : 'stat-value'), prize,
          referencePokemon:noPokemon ? [] : [{name:'Pikachu',de:'Pikachu'}] };
        if (answerOnly) {
          q.prompt = 'Welche Schreibweise ist richtig?';
          q.options = ['Pikachu','Pikkachu','Pakichu','Pikachuu'];
          q.category = 'spelling';
        }
        return q;
      }
      gen.genOne = (prize, seen, category) => { window.genOneCalled = true; return gen(prize,seen,category); };
      gen.availableCategories = (prize) => prize === 8000 ? ['nature-effect','stat-value'] : ['stat-value'];
      window.quiz = createMiloQuiz(()=>'admin',gen,{
        load:async()=>[],localScores:async()=>[],
        save:async(...args)=> {window.saved.push(args);return [{name:args[1],score:args[2],mode:args[3],lifelines:args[5]}];},
      });
      quiz.open('admin');
    }, {noPokemon, answerOnly});
    assert.equal(await page.getByRole('button',{name:'Safe Mode',exact:false}).count(),0);
    await page.locator('input[name=player]').fill('Test');
    await page.getByRole('button',{name:'Weiter',exact:true}).click();
    assert.equal(await page.locator('.milo-bonus-choice').count(),8);
    if (bonus) {
      await page.getByRole('button',{name:/^Risiko ·/}).click();
      await page.getByRole('button',{name:bonus,exact:true}).click();
    }
    if (process.argv.includes('--screenshots') && bonus === 'Doppelteam') await page.screenshot({path:path.join(screenshotDir,'milo-lifelines-mode.png')});
    await page.getByRole('button',{name:'Spiel starten',exact:true}).click();
  }
  const joker = (id) => page.locator(`[data-milo-joker="${id}"]`);
  async function answer() {
    await page.locator('.milo-answer').nth(0).click();
    await page.getByRole('button',{name:'Antwort einloggen',exact:true}).click();
    await page.getByRole('button',{name:'Nächste Stufe',exact:true}).click();
  }
  async function jump(index) {
    await page.keyboard.down('d');
    await page.getByRole('button',{name:'Dev · Zu Frage springen',exact:true}).click();
    await page.getByLabel('Frage und Gewinnstufe').selectOption(String(index));
    await page.getByRole('button',{name:'Zur Frage springen',exact:true}).click();
    await page.keyboard.up('d');
  }

  await setup(null);
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('blank.png'));
  assert.equal(await joker('bonus').isDisabled(),true);
  // Seher's two-question-ahead slot scheduling.
  await setup('Seher');
  await page.evaluate(()=>{window.originalRandom=Math.random;Math.random=()=>0.8;});
  await joker('bonus').click();
  assert.ok((await page.locator('.milo-joker-dialog').textContent()).includes('Antwort ist D'));
  await page.evaluate(()=>{Math.random=window.originalRandom;});
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await answer(); await answer();
  await page.locator('.milo-answer').nth(3).click();
  await page.getByRole('button',{name:'Antwort einloggen',exact:true}).click();
  assert.ok((await page.locator('.milo-actions').last().textContent()).includes('Richtig!'));
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('seherused.png'));
  await setup('Seher'); await jump(12);
  await joker('bonus').click();
  assert.ok((await page.locator('.milo-joker-dialog').textContent()).includes('500.000-Punkte-Frage'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await jump(13);assert.equal(await joker('bonus').isDisabled(),true);
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('seherna.png'));

  let animationCaptured=false;
  async function forceMetronom(value) {
    await page.evaluate((value)=>{window.originalRandom=Math.random;Math.random=()=>value;},value);
    await joker('bonus').click();
    if(await page.locator('.milo-metronom-dialog').count() && !await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      assert.equal(await page.locator('.milo-metronom-option').count(),3);
      assert.equal(await page.locator('.milo-metronom-option.is-active').count(),1);
      assert.equal(await page.locator('.milo-metronom-pointer').textContent(),'☝️');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.milo-metronom-dialog').count(),1);
      if(process.argv.includes('--screenshots')&&!animationCaptured) {
        await page.screenshot({path:path.join(screenshotDir,'milo-metronom-animation.png')});animationCaptured=true;
      }
    }
    await page.locator('.milo-metronom-dialog').waitFor({state:'detached'});
    await page.evaluate(()=>{Math.random=window.originalRandom;});
  }
  async function checkBonusOnlyUsed() {
    await page.getByRole('button',{name:'Aussteigen',exact:true}).click();
    await page.waitForFunction(()=>saved.length===1);
    const slots=await page.evaluate(()=>saved[0][5]);
    assert.deepEqual(slots.map(slot=>slot.used),[false,false,false,true]);
    assert.equal(slots[3].id,'metronom');
  }
  await setup('Metronom'); await forceMetronom(0.1);
  assert.equal(await page.locator('.milo-answer:disabled').count(),2);
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await answer();assert.equal(await joker('half').isDisabled(),false);
  await checkBonusOnlyUsed();
  await setup('Metronom');await joker('half').click();await answer();await forceMetronom(.1);
  assert.equal(await page.locator('.milo-answer:disabled').count(),2);
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();await answer();
  assert.equal(await joker('half').isDisabled(),true); // previously spent standard stays spent
  await setup('Metronom');await joker('half').click();await forceMetronom(.1);
  assert.equal(await page.locator('.milo-answer:disabled').count(),2); // never removes a third answer
  assert.ok((await page.locator('.milo-joker-dialog').textContent()).includes('Publikumsjoker'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();

  await setup('Metronom');await joker('audience').click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await forceMetronom(.5); // audience excluded: the upper half of the draw is phone
  assert.equal(await page.locator('.milo-phone-dialog').count(),1);
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();

  await setup('Metronom');await joker('half').click();await joker('audience').click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await forceMetronom(.01); // only telephone remains, even at the lowest random value
  assert.equal(await page.locator('.milo-phone-dialog').count(),1);
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();

  await setup('Metronom'); await forceMetronom(0.5);
  await page.getByLabel('Stimme für A hinzufügen',{exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.equal(await joker('audience').isDisabled(),false);
  await joker('bonus').click();
  assert.ok((await page.locator('.milo-joker-dialog').textContent()).includes('1 Stimmen insgesamt'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await checkBonusOnlyUsed();

  async function mockPhone(refund=false) {
    await page.evaluate((refund)=>{
      window.selectMiloPhoneContacts=()=>['Alpha','Beta','Gamma'].map((name,index)=>({id:name,name,
        dialogue:()=>[{speaker:name,text:`Kontakt ${index}`,spoken:true,...(refund?{refund:true}:{})}]}));
    },refund);
  }
  await setup('Metronom');await mockPhone();
  await joker('telephone').click();await page.getByRole('button',{name:'Gamma',exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await forceMetronom(.9);
  assert.ok((await page.locator('.milo-phone p').textContent()).includes('Beta am Apparat'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await setup('Hilfe!');await mockPhone(true);
  await joker('telephone').click();await page.getByRole('button',{name:'Alpha',exact:true}).click();
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.equal(await joker('telephone').isDisabled(),true);
  assert.ok((await joker('telephone').locator('img').getAttribute('src')).endsWith('telefonused.png'));
  await answer();
  assert.equal(await joker('telephone').isDisabled(),false);
  assert.ok((await joker('telephone').locator('img').getAttribute('src')).endsWith('telefon.png'));
  await joker('telephone').click();await page.getByRole('button',{name:'Beta',exact:true}).click();
  assert.ok((await joker('telephone').locator('img').getAttribute('src')).endsWith('telefonused.png'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await setup('Metronom'); await mockPhone(); await forceMetronom(0.9);
  assert.equal(await page.getByRole('button',{name:'Gamma',exact:true}).count(),0); // no caller selection
  assert.ok((await page.locator('.milo-phone p').textContent()).includes('Gamma am Apparat'));
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  assert.equal(await page.locator('.milo-speaker').textContent(),'Gamma');
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.equal(await joker('telephone').isDisabled(),false);
  await joker('bonus').click();assert.equal(await page.locator('.milo-speaker').textContent(),'Gamma');
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await checkBonusOnlyUsed();

  await setup('Metronom'); await mockPhone(true); await forceMetronom(0.9);
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.equal(await joker('bonus').isDisabled(),true);
  await answer(); await answer(); // refunded Metronom remains available
  assert.equal(await joker('bonus').isDisabled(),false);
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('metronom.png'));
  await forceMetronom(0.1); // a fresh random draw can now select 50:50
  assert.equal(await page.locator('.milo-answer:disabled').count(),2);
  assert.ok((await page.locator('.milo-joker-dialog').textContent()).includes('Metronom · 50:50'));
  assert.ok((await joker('telephone').locator('img').getAttribute('src')).endsWith('telefon.png'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await setup('Doppelteam');
  await joker('bonus').click();
  assert.equal(await joker('half').isDisabled(),true);
  await page.locator('.milo-answer').nth(0).click();
  assert.equal(await page.getByRole('button',{name:'Antwort einloggen',exact:true}).isDisabled(),true);
  await page.locator('.milo-answer').nth(2).click();
  await page.getByRole('button',{name:'Antwort einloggen',exact:true}).click();
  assert.ok((await page.locator('.milo-actions').last().innerText()).includes('Richtig!'));
  await page.getByRole('button',{name:'Nächste Stufe',exact:true}).click();
  assert.equal(await joker('bonus').isDisabled(),true);
  await setup('Doppelteam');
  await joker('half').click();
  assert.equal(await joker('bonus').isDisabled(),true);
  await answer();
  assert.equal(await joker('bonus').isDisabled(),false); // no 50:50 on this question

  await setup('Reroll');
  await joker('half').click();
  assert.equal(await page.locator('.milo-answer:disabled').count(),2);
  await joker('bonus').click();
  assert.equal(await page.locator('.milo-answer:disabled').count(),0);
  assert.equal(await joker('half').isDisabled(),true);
  assert.equal(await page.evaluate(()=>requests.at(-1).excluded),'stat-value');
  assert.equal(await page.evaluate(()=>requests.at(-1).prize),50);
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('rerollused.png'));

  await setup('Genwunner',true);
  assert.equal(await joker('bonus').isDisabled(),true);
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('gewunnerna.png'));
  await setup('Genwunner');
  await joker('bonus').click();
  assert.equal(await page.evaluate(()=>genOneCalled),true);
  assert.equal(await page.evaluate(()=>requests.at(-1).required),'stat-value');

  await setup('Genwunner',false,true);
  assert.equal(await joker('bonus').isDisabled(),false);
  await joker('bonus').click();
  assert.equal(await page.evaluate(()=>genOneCalled),true);
  assert.equal(await page.evaluate(()=>requests.at(-1).required),'spelling');
  assert.equal(await page.locator('.milo-question.milo-gb-box').count(),1);
  assert.equal(await page.locator('.milo-answer.milo-gb-box').count(),4);
  assert.equal(await page.locator('.milo-gb-box').count(),5);
  assert.equal(await page.locator('.milo-question').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
  await page.locator('.milo-answer').first().click();
  assert.equal(await page.locator('.milo-answer').first().getAttribute('aria-pressed'),'true');
  if (process.argv.includes('--screenshots')) {
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.join(screenshotDir,'milo-genwunner-gb.png')});
  }
  await answer();
  assert.equal(await page.locator('.milo-gb-box').count(),0);

  await setup('Hilfe!');
  await joker('bonus').click();
  assert.ok((await page.locator('.milo-joker-dialog').innerText()).includes('Publikum vor Ort'));
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.equal(await joker('bonus').isDisabled(),true);

  await setup('Amnesie');
  assert.equal(await joker('bonus').isDisabled(),true);
  await jump(9); // 16k
  await page.evaluate(()=>{window.originalRandom=Math.random;Math.random=()=>0.1;});
  await joker('bonus').click();
  await page.evaluate(()=>{Math.random=window.originalRandom;});
  assert.equal(await page.evaluate(()=>requests.at(-1).prize),8000);
  assert.equal(await page.evaluate(()=>requests.at(-1).required),'nature-effect');
  assert.ok((await page.locator('.milo-question').textContent()).includes('16.000 Punkte'));
  await jump(10); // 32k
  assert.equal(await joker('bonus').isDisabled(),true);
  assert.ok((await joker('bonus').locator('img').getAttribute('src')).endsWith('amnesiena.png'));

  await setup('Zerschneider');
  for(let i=0;i<8;i++) await answer();
  await joker('bonus').click(); // skip 8k, then reach 250k without developer aids
  for(let i=9;i<=13;i++) await answer();
  await page.getByRole('button',{name:'Aussteigen',exact:true}).click();
  await page.waitForFunction(()=>saved.length===1);
  const saved = await page.evaluate(()=>saved[0]);
  assert.equal(saved[2],242000);
  assert.equal(saved[4],false);
  assert.equal(saved[5].filter((slot)=>slot.used).length,1);
  assert.equal(saved[5][3].id,'zerschneider');
  assert.equal(await page.locator('.milo-board .milo-lifeline-icon').count(),4);
  assert.ok((await page.locator('.milo-board img').last().getAttribute('src')).endsWith('zerschneiderused.png'));

  await setup('Hilfe!');
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(()=>document.querySelector('.milo-jokers').scrollWidth <= document.querySelector('.milo-stage').clientWidth));
  if (process.argv.includes('--screenshots')) {
    const file=path.join(screenshotDir,'milo-lifelines-mobile.png');
    await page.screenshot({path:file}); console.log('Screenshots: '+path.dirname(file));
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await setup('Metronom');await forceMetronom(.1);
  assert.equal(await page.locator('.milo-answer:disabled').count(),2);
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await page.emulateMedia({reducedMotion:'no-preference'});
  await setup('Metronom');await joker('bonus').click();
  await page.evaluate(()=>quiz.close());
  assert.equal(await page.locator('.milo-dialog').count(),0);
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log('Passed: eight bonus lifelines, Seher scheduling/cap, all Metronom branches, independent standard uses, reopening/refunds, Gen 1, 50:50 interactions, 242k scoring, stored history/icons and mobile width.');
}
main().catch((error)=>{console.error(error);process.exit(1);});
