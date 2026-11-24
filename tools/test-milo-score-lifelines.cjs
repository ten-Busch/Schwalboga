const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');
const root = path.resolve(__dirname,'..');
const { PGlite } = require(path.join(process.env.USERPROFILE,'AppData/Local/Temp/schwalboga-sql-check/node_modules/@electric-sql/pglite'));
async function main() {
  const db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create schema auth;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql as $$select '11111111-1111-1111-1111-111111111111'::uuid$$;
    create function auth.jwt() returns jsonb language sql as $$select '{"app_metadata":{"site_access":{"permissions":{"play_milo":true}}}}'::jsonb$$;
    insert into auth.users values ('11111111-1111-1111-1111-111111111111');
    create table public.milo_highscores(id uuid primary key,player_name text,score integer check(score in(0,50,100)),
      created_by uuid references auth.users,created_at timestamptz default now(),run_mode text default 'safe',is_test boolean default false,is_deleted boolean default false);
    insert into public.milo_highscores(id,player_name,score,created_by) values('11111111-1111-1111-1111-111111111112','Legacy',50,'11111111-1111-1111-1111-111111111111');`);
  const migration = fs.readFileSync(path.join(root,'supabase/milo-lifelines.sql'),'utf8');
  await db.exec(migration); await db.exec(migration);
  assert.equal((await db.query('select score from milo_highscores')).rows[0].score,50);
  await db.exec(fs.readFileSync(path.join(root,'supabase/milo-highscores.sql'),'utf8'));
  const storage = new Map();
  const localStorage = {get length(){return storage.size;},key:(i)=>[...storage.keys()][i],getItem:(k)=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:(k)=>storage.delete(k)};
  const orders = [];
  const client = {from:()=>{
    const state={filters:[],orders:[],limit:1000};
    const query={
      upsert:async(rows)=>{
        for(const r of rows) await db.query('insert into milo_highscores(id,player_name,score,created_by,run_mode,is_test,lifelines) values($1,$2,$3,$4,$5,$6,$7) on conflict(id) do nothing',
          [r.id,r.player_name,r.score,r.created_by,r.run_mode,r.is_test,JSON.stringify(r.lifelines??[])]);
        return {error:null};
      },
      select:()=>query,eq:(k,v)=>{state.filters.push([k,v]);return query;},
      order:(k,opts)=>{state.orders.push([k,opts?.ascending===false?'desc':'asc']);orders.push(k);return query;},
      limit:(n)=>{state.limit=n;return query;},
      then:(resolve,reject)=>db.query('select * from milo_highscores'+(state.filters.length?' where '+state.filters.map(([k],i)=>`${k}=$${i+1}`).join(' and '):'')
        +' order by '+state.orders.map(([k,dir])=>`${k} ${dir}`).join(',')+' limit '+state.limit,state.filters.map(([,v])=>v))
        .then((result)=>resolve({data:result.rows,error:null}),reject),
    };return query;
  }};
  const context={window:{},localStorage,crypto:webcrypto,TextEncoder};vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root,'milo-scores.js'),'utf8'),context);
  const store=context.window.createMiloScoreStore(client);
  const history=(used)=>['half','audience','telephone','zerschneider'].map((id,i)=>({id,used:i<used}));
  const owner='11111111-1111-1111-1111-111111111111';
  await store.save(owner,'More used',242000,'risk',false,history(3));
  const scores=await store.save(owner,'Fewer used',242000,'risk',false,history(1));
  assert.equal(scores[0].name,'Fewer used');
  assert.equal(scores[0].usedCount,1);
  assert.equal(scores[1].usedCount,3);
  assert.equal(scores[0].lifelines.length,4);
  assert.ok(orders.includes('lifelines_used'));
  assert.equal(storage.size,0);
  await assert.rejects(store.save(owner,'Too much',1000001,'risk'));
  await assert.rejects(store.save(owner,'Fraction',242000.5,'risk'));
  await db.close();
  console.log('Passed: existing-schema upgrade twice, fresh schema, arbitrary deducted scores, generated usage count, database tie-break order and cloud queue serialization.');
}
main().catch((error)=>{console.error(error);process.exit(1);});
