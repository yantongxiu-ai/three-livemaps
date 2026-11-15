const fs=require('fs'),vm=require('vm'),assert=require('assert'),crypto=require('crypto'),path=require('path');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(root+'/data.js','utf8'),context);
const d=context.window.MAP_DATA,base=JSON.parse(fs.readFileSync(__dirname+'/second-baseline.json','utf8'));
const nodes=Object.entries(d.maps).flatMap(([map,m])=>m.entries.map(e=>({...e,map})));
const ids=new Map(nodes.map(e=>[e.id,e]));
assert.equal(nodes.length,26);assert.equal(ids.size,nodes.length);
for(const id of base.nodeIds)assert(ids.has(id),'Lost v0.7 node '+id);
for(const r of base.links)assert(ids.get(r.from).detail.related.some(l=>l.id===r.id&&l.reason===r.reason),'Lost v0.7 relation '+r.from+' -> '+r.id);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(d.updates.slice(1))).digest('hex'),base.historyHash,'Historical updates changed');
const incoming=new Map(nodes.map(e=>[e.id,0]));let relations=0,cross=0;
for(const e of nodes){
  assert(d.maps[e.map].categories.includes(e.category),'Unknown category');
  const targets=new Set();
  for(const r of e.detail.related){assert(ids.has(r.id),'Broken target '+r.id);assert(r.id!==e.id,'Self reference');assert(!targets.has(r.id),'Duplicate edge');assert(r.reason.trim());targets.add(r.id);incoming.set(r.id,incoming.get(r.id)+1);relations++;if(e.map!==ids.get(r.id).map)cross++;}
  for(const source of e.detail.sources||[])assert(d.sources.some(s=>s.id===source),'Broken source '+source);
}
assert([...incoming.values()].every(n=>n>0),'Node has no incoming entry');
const reachable=new Set();function visit(id){if(reachable.has(id))return;reachable.add(id);ids.get(id).detail.related.forEach(r=>visit(r.id));}visit('d-intro');assert.equal(reachable.size,nodes.length,'Unreachable from topic');
for(const p of d.paths){
  assert.equal(new Set(p.ids).size,p.ids.length);p.ids.forEach(id=>assert(ids.has(id)));
  assert.equal(new Set(p.ids.map(id=>ids.get(id).map)).size,3,'Path misses a map');
  const found=new Set(),pending=[p.ids[0]],allowed=new Set(p.ids);
  while(pending.length){const id=pending.pop();if(found.has(id))continue;found.add(id);for(const e of nodes)for(const r of e.detail.related){if(e.id===id&&allowed.has(r.id))pending.push(r.id);if(r.id===id&&allowed.has(e.id))pending.push(e.id);}}
  assert.equal(found.size,p.ids.length,'Disconnected reading path '+p.id);
}
for(const id of ['d-capture','c-error-review','c-evidence','c-ocr-plan','d-evaluation','d-review'])assert.equal(ids.get(id).status,'计划未执行');
for(const id of ['d-intro','d-task','c-revision'])assert.equal(ids.get(id).status,'待原记录核对');
for(const file of ['data.js','atlas.js','scripts/build-visualization.cjs'])new vm.Script(fs.readFileSync(root+'/'+file,'utf8'));
for(const source of d.sources){assert(/^https:\/\//.test(source.url));assert(source.position&&source.checked&&source.scope);}
assert.equal(new Set(d.sources.map(s=>s.id)).size,d.sources.length);
const spec=JSON.parse(fs.readFileSync(root+'/visualizations/learning-map.json','utf8'));assert.equal(spec.meta.visual_preset,'editorial');
console.log(JSON.stringify({ok:true,nodes:nodes.length,relations,crossMapReferences:cross,sources:d.sources.length,reachableFromTopic:reachable.size,preservedNodes:base.nodeIds.length,preservedReferences:base.links.length,preservedHistory:d.updates.length-1,readingPaths:d.paths.length,noIncoming:0}));
