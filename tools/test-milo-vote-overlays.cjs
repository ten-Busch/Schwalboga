const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
async function main(){
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.clock.install();
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());if(url.hostname!=='localhost')return route.abort();
    if(url.pathname==='/')return route.fulfill({contentType:'text/html; charset=utf-8',body:'<meta charset="utf-8"><link rel="stylesheet" href="milo-quiz.css"><script src="milo-quiz.js"></script><body class="milo-page"></body>'});
    const file=path.join(root,decodeURIComponent(url.pathname));if(!fs.existsSync(file))return route.fulfill({status:404,body:''});
    return route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'image/png'});
  });
  async function setup(bonus){
    await page.goto('http://localhost:4848/');
    await page.evaluate(()=>{
      let index=0;
      window.selectMiloPhoneContacts=()=>[{id:'achromas',name:'Achromas',dialogue:()=>[{speaker:'Achromas',text:'Ich kalkuliere...',estimates:[40,30,20,10].map((percent,index)=>({index,percent}))}]}];
      createMiloQuiz(()=>'admin',()=>({prompt:`Testfrage ${++index}`,options:['100','200','300','400'],correct:0,category:'stat-value'}),{load:async()=>[],localScores:async()=>[]}).open('admin');
    });
    await page.locator('input[name=player]').fill('Test');await page.getByRole('button',{name:'Weiter',exact:true}).click();
    if(bonus){await page.getByRole('button',{name:/^Risiko/}).click();await page.getByRole('button',{name:bonus,exact:true}).click();}
    await page.getByRole('button',{name:'Spiel starten',exact:true}).click();
  }
  const badges=()=>page.locator('[data-milo-estimate]');
  const numbers=()=>badges().locator('span').allTextContents();
  await setup();
  await page.locator('[data-milo-joker=audience]').click();
  assert.deepEqual(await numbers(),['0%','0%','0%','0%']);
  for(const letter of ['A','B','C'])await page.getByLabel(`Stimme für ${letter} hinzufügen`,{exact:true}).click();
  assert.deepEqual(await numbers(),['34%','33%','33%','0%']);
  await page.getByLabel('Stimme für A hinzufügen',{exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.deepEqual(await numbers(),['50%','25%','25%','0%']);
  assert.equal(await page.locator('.milo-audience-estimate').count(),4);
  const audienceColor=await badges().first().evaluate(b=>getComputedStyle(b).color);
  await page.locator('[data-milo-joker=telephone]').click();await page.getByRole('button',{name:'Achromas',exact:true}).click();
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  await page.locator('.milo-answer').first().click();
  await page.clock.runFor(3000);
  assert.equal(await page.locator('.milo-achromas-estimate').count(),4);
  assert.deepEqual(await numbers(),['40%','30%','20%','10%']);
  assert.notEqual(await badges().first().evaluate(b=>getComputedStyle(b).color),audienceColor);
  assert.equal(await page.locator('.milo-answer').first().getAttribute('aria-pressed'),'true');
  await page.clock.runFor(3000);
  assert.equal(await page.locator('.milo-audience-estimate').count(),4);
  assert.deepEqual(await numbers(),['50%','25%','25%','0%']);
  if(process.env.MILO_QA_DIR)await page.screenshot({path:path.join(process.env.MILO_QA_DIR,'milo-audience-overlays.png')});
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.locator('.milo-answers').evaluate(e=>e.scrollWidth<=e.clientWidth));
  await page.locator('[data-milo-joker=half]').click();
  assert.equal(await badges().count(),2);
  await page.getByRole('button',{name:'Antwort einloggen',exact:true}).click();await page.getByRole('button',{name:'Nächste Stufe',exact:true}).click();
  await page.clock.runFor(9000);assert.equal(await badges().count(),0);
  await setup('Metronom');await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>{Math.random=()=>.5;});await page.locator('[data-milo-joker=bonus]').click();await page.clock.runFor(200);
  await page.getByLabel('Stimme für D hinzufügen',{exact:true}).click();
  await page.getByRole('button',{name:'Zurück zur Frage',exact:true}).click();
  assert.deepEqual(await numbers(),['0%','0%','0%','100%']);
  assert.deepEqual(errors,[]);await browser.close();
  console.log('Passed audience overlays/live updates, 100% rounding, source colors and 3s cycling, selection retention, 50:50, question reset, mobile layout and Metronom audience.');
}
main().catch(error=>{console.error(error);process.exit(1);});
