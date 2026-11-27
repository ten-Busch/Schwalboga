const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'milo-phone.js'), 'utf8');
const context = { window: {} }; vm.createContext(context); vm.runInContext(source, context);
const portrait = context.window.getMiloPhonePortrait;
const contacts = [...source.matchAll(/add\('([^']+)', '([^']+)'/g)].map(([,id,name])=>({id,name}));
for (const name of ['Rennradfahrer','Schwarzgurt','Hexe','Wanderer','Psycho','Krankenschwester','Veteran','Schiedsrichter','Zwillinge']) contacts.push({id:'comparison-specialist',name});
contacts.push({id:'ability-expert',name:'Bedroher-Experte'}, {id:'frank-placeholder-2',name:'Frank'});
const trainerFiles = new Set(fs.readdirSync(path.join(root,'assets/Trainer')).filter((file)=>/^[A-ZÄÖÜ]/.test(file)));
for (const contact of contacts) {
  const data = portrait(contact);
  assert.ok(data.src);
  assert.equal(decodeURIComponent(portrait(contact,'Günther Jauchzelot').src),'assets/Trainer/Günther.png');
  assert.equal(portrait(contact,'Günther Jauchzelot').metallic,false);
  if (data.src.startsWith('assets/') && !['type-safari-warden', 'type-expert', 'damage-analyst'].includes(contact.id)) assert.ok(trainerFiles.has(decodeURIComponent(data.src.split('/').at(-1))), contact.name+': '+data.src);
}
for(const [id,species] of Object.entries({flegmon:'slowpoke',pikachu:'pikachu',kricketune:'kricketune',urglmator:'cramorant'})) {
  const data=portrait({id,name:id}); assert.ok(data.src.endsWith(`/${species}.png`)); assert.equal(data.metallic,id==='urglmator');
}
assert.ok(portrait({id:'aga',name:'Agnieszka'},'Aga').src.endsWith('/Aga.png'));
assert.ok(portrait({id:'junichi-masuda',name:'Junichi Masuda'},'増田順一').src.endsWith('/JunichiMasuda.png'));

async function main() {
  const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',(error)=>errors.push(error.message));
  await page.route('**/*',async(route)=>{
    const url=new URL(route.request().url());
    if(url.hostname!=='localhost') return route.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j3ioAAAAASUVORK5CYII=','base64')});
    if(url.pathname==='/') return route.fulfill({contentType:'text/html; charset=utf-8',body:'<head><meta charset="utf-8"><link rel="stylesheet" href="milo-quiz.css"><script src="milo-phone.js"></script><script src="milo-quiz.js"></script></head><body class="milo-page"></body>'});
    const file=path.join(root,decodeURIComponent(url.pathname));
    return route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'image/png'});
  });
  async function setup() {
    await page.goto('http://localhost:4848/');
    await page.evaluate(()=>{
      window.selectMiloPhoneContacts=()=>[
        {id:'frank',name:'Frank',dialogue:()=>[{speaker:'Frank',text:'Hallo!'},{speaker:'Günther Jauchzelot',text:'Die Zeit ist um.'}]},
        {id:'urglmator',name:'Urglmator',dialogue:()=>[{speaker:'Urglmator',text:'BRRRRT... DING.',theme:'matrix'}]},
        {id:'pikachu',name:'Pikachu',dialogue:()=>[{speaker:'Pikachu',text:'Pika!'}]},
      ];
      createMiloQuiz(()=>'admin',()=>({prompt:'Testfrage',options:['A','B','C','D'],correct:0,category:'spelling',prize:50}),{load:async()=>[]}).open('admin');
    });
    await page.locator('input[name=player]').fill('Test'); await page.getByRole('button',{name:'Weiter',exact:true}).click();
    await page.getByRole('button',{name:'Spiel starten',exact:true}).click();
    await page.locator('[data-milo-joker=telephone]').click();
  }
  await setup();
  assert.equal(await page.locator('.milo-contact-choice .milo-phone-portrait').count(),3);
  await page.getByRole('button',{name:'Frank',exact:true}).click();
  assert.equal(decodeURIComponent(await page.locator('.milo-phone-dialogue > .milo-phone-portrait img').getAttribute('src')),'assets/Trainer/Günther.png');
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  const frame=page.locator('.milo-phone-dialogue > .milo-phone-portrait');
  assert.ok((await frame.locator('img').getAttribute('src')).endsWith('/Frank.png'));
  await frame.locator('img').evaluate((image)=>image.decode());
  if(process.env.MILO_QA_DIR) await page.screenshot({path:path.join(process.env.MILO_QA_DIR,'milo-phone-portrait.png')});
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  assert.equal(decodeURIComponent(await frame.locator('img').getAttribute('src')),'assets/Trainer/Günther.png');
  await page.getByRole('button',{name:'◂ Zurück',exact:true}).click();
  assert.equal(await frame.count(),1);
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.locator('.milo-joker-dialog').evaluate((box)=>box.scrollWidth<=box.clientWidth));
  if(process.env.MILO_QA_DIR) await page.screenshot({path:path.join(process.env.MILO_QA_DIR,'milo-phone-portrait-mobile.png')});
  await setup(); await page.getByRole('button',{name:'Urglmator',exact:true}).click();
  await page.getByRole('button',{name:'Weiter ▸',exact:true}).click();
  assert.equal(await page.locator('.milo-phone-dialogue .milo-phone-portrait-metallic .milo-phone-portrait-sheen').count(),1);
  assert.ok((await frame.locator('img').getAttribute('src')).endsWith('/cramorant.png'));
  assert.ok((await frame.locator('img').evaluate((image)=>getComputedStyle(image).filter)).includes('grayscale(1)'));
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log(`Passed ${contacts.length} contact mappings, Pokémon exceptions, menu portraits, speaker-only portraits, navigation, metallic layer and mobile layout.`);
}
main().catch((error)=>{console.error(error);process.exit(1);});
