const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path'),crypto=require('crypto');const root=path.resolve(__dirname,'..');const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(root+'/data.js','utf8'),ctx);const data=ctx.window.MAP_DATA;
const baseline=JSON.parse(fs.readFileSync(__dirname+'/baseline.json','utf8'));const entries=Object.values(data.maps).flatMap(m=>m.entries);const byId=new Map(entries.map(e=>[e.id,e]));assert.equal(byId.size,entries.length);assert.equal(entries.length,18);
for(const id of baseline.nodeIds)assert(byId.has(id),'Missing original node '+id);
for(const link of baseline.links)assert(byId.get(link.from).detail.related.some(r=>r.id===link.id&&r.reason===link.reason),'Changed original link '+link.from+' -> '+link.id);
for(const e of entries){for(const r of e.detail.related)assert(byId.has(r.id),'Broken relation '+r.id);for(const id of e.detail.sources||[])assert(data.sources.some(s=>s.id===id),'Broken source '+id);}
for(const s of data.sources)assert(/^https:\/\//.test(s.url));
assert.equal(crypto.createHash('sha256').update(JSON.stringify(data.updates.slice(2))).digest('hex'),baseline.historyHash);
const html=fs.readFileSync(root+'/index.html','utf8');for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
const ai={DATA:data};vm.createContext(ai);vm.runInContext(html.slice(html.indexOf('function entryById('),html.indexOf('/* ===================== 路由'))+html.slice(html.indexOf('function buildAIContext('),html.indexOf('async function askAI(')),ai);
const ocr=ai.entryById('d-ocr');let context=ai.buildAIContext(ocr.map,ocr.entry);assert(context.includes('深度学习基础'));assert(context.includes('待核实'));assert(context.includes('PaddleOCR'));assert(context.includes('待验证')||context.includes('尚未验证'));
for(const id of ['d-evaluation','d-review','c-ocr-plan'])assert.equal(byId.get(id).status,'计划未执行');
const spec=JSON.parse(fs.readFileSync(root+'/visualizations/learning-map.json','utf8'));for(const n of spec.components)assert.equal(n.label,byId.get(n.id).name);for(const r of spec.connections)assert(byId.get(r.from).detail.related.some(e=>e.id===r.to));
for(const file of ['data.js','theme.css','archify-map.html'])assert(fs.existsSync(root+'/'+file));
console.log(JSON.stringify({ok:true,nodes:entries.length,relations:entries.reduce((n,e)=>n+e.detail.related.length,0),sources:data.sources.length,graphNodes:spec.components.length,originalNodesPreserved:baseline.nodeIds.length,originalLinksPreserved:baseline.links.length,historicalVersionsPreserved:6}));
