// Read-only calibration probe; does not register quiz categories.
const fs=require('node:fs'),vm=require('node:vm');
global.window={}; require('../data/pokedex-data.js');
const entries=window.POKEDEX_ENTRIES.filter(p=>!p.forme&&!p.prevo&&!p.hidden&&!p.impossible&&!p.unreleased);
const moves=window.POKEDEX_META.movesById;
const name=p=>p.names?.de??p.name;
const methods=(sources,gen)=>[...new Set(sources.filter(s=>s.startsWith(String(gen))).map(s=>s[1]))];
for(const stab of [false,true]) for(const target of stab?['M','E','T','S']:['M','E','T']) {
  const candidates=[];
  for(const p of entries) {
    const rows=Object.entries(p.learnset).filter(([id])=>moves[id]&&p.types.includes(moves[id].type)===stab)
      .map(([id,sources])=>({id,name:name(moves[id]),sources:sources.filter(s=>s.startsWith('7')),methods:methods(sources,7)}));
    const right=rows.filter(r=>r.methods.length===1&&r.methods[0]===target);
    const wrong=rows.filter(r=>r.methods.length&&!r.methods.includes(target)&&r.methods.every(m=>'METLS'.includes(m)));
    if(right.length&&wrong.length>=3) candidates.push({pokemon:name(p),right:right.slice(0,3),wrong:wrong.slice(0,5)});
  }
  console.log(JSON.stringify({stab,target,count:candidates.length,examples:candidates.slice(0,2)}));
}
const changes=[];
for(const p of entries) for(const [id,sources] of Object.entries(p.learnset)) {
  if(!moves[id])continue;
  for(const [a,b] of [[6,7],[7,8],[8,9],[5,6]]) {
    const x=methods(sources,a),y=methods(sources,b);
    if(x.length===1&&y.length===1&&x[0]!==y[0]&&'METLS'.includes(x[0])&&'METLS'.includes(y[0])) {
      changes.push({pokemon:name(p),move:name(moves[id]),a,b,from:x[0],to:y[0],sources:sources.filter(s=>s.startsWith(String(a))||s.startsWith(String(b)))});break;
    }
  }
}
console.log(JSON.stringify({changes:changes.length,examples:changes.slice(0,14)}));
