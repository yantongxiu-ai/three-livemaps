const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.runInNewContext(fs.readFileSync(root+'/data.js','utf8'),ctx);const d=ctx.window.MAP_DATA;
const entries=Object.values(d.maps).flatMap(m=>m.entries),byId=new Map(entries.map(e=>[e.id,e]));
const base=JSON.parse(fs.readFileSync(__dirname+'/third-baseline.json','utf8'));
assert.equal(entries.length,34);assert.equal(byId.size,entries.length);
for(const id of base.nodeIds)assert(byId.has(id));
for(const r of base.links)assert(byId.get(r.from).detail.related.some(t=>t.id===r.id&&t.reason===r.reason),'Lost accepted relation '+r.from+' -> '+r.id);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(d.updates.slice(1))).digest('hex'),base.historyHash,'Changed accepted history');
for(const e of entries){const l=e.detail.lesson;assert(l?.summary&&l.example&&l.pitfall&&l.action,'Missing readable explanation '+e.id);}
assert.equal(d.inquiry.nodeIds.length,7);
for(let i=0;i<d.inquiry.nodeIds.length;i++){
 const e=byId.get(d.inquiry.nodeIds[i]),p=e.detail.probe;assert(p.question&&p.answer&&p.challenge&&p.response);assert.equal(p.reasoning.length,3);
 if(i+1<d.inquiry.nodeIds.length)assert(e.detail.related.some(r=>r.id===d.inquiry.nodeIds[i+1]),'Missing next question edge');
 for(const id of e.detail.sources||[])assert(d.sources.some(s=>s.id===id));
}
assert.equal(byId.get('c-ocr-protocol').status,'计划未执行');
const spec=JSON.parse(fs.readFileSync(root+'/visualizations/learning-map.json','utf8'));
assert.deepEqual(spec.components.map(n=>n.id),Array.from(d.inquiry.nodeIds));assert.equal(spec.connections.length,6);
const renderer=JSON.parse(fs.readFileSync(root+'/visualizations/archify-version.json','utf8'));
const receipt=JSON.parse(fs.readFileSync(root+'/'+renderer.evidenceDirectory+'/archify-map.finalize-summary.json','utf8'));
assert.equal(renderer.version,'3.3.2');assert.equal(receipt.update.installedVersion,renderer.version);
for(const file of renderer.licenseFiles)assert(fs.existsSync(root+'/'+file),'Missing Archify notice '+file);
assert.equal(receipt.artifact.sha256,crypto.createHash('sha256').update(fs.readFileSync(root+'/archify-map.html')).digest('hex'));
assert.equal(receipt.specification.sha256,crypto.createHash('sha256').update(fs.readFileSync(root+'/visualizations/learning-map.json')).digest('hex'));
for(const file of ['inquiry.js','learning-math.js'])new vm.Script(fs.readFileSync(root+'/'+file,'utf8'));
const math=require(root+'/learning-math.js');
const cases=[['项目代号Q105','项日代号Q105',1,0,0,8],['项目代号Q105','项目代号Q1O5',1,0,0,8],['项目代号Q105','',0,8,0,8],['A','AAAA',0,0,3,1],['','ABC',0,0,3,0],['','',0,0,0,0],['甲😀','甲😃',1,0,0,2],['A B','AB',0,1,0,3]];
for(const [a,b,S,D,I,N] of cases){const r=math.align(a,b);assert.deepEqual([r.S,r.D,r.I,r.N],[S,D,I,N]);assert.equal(r.distance,S+D+I);assert.equal(r.cer,N?(S+D+I)/N:null);assert.equal(r.operations.map(o=>o.a).join(''),a);assert.equal(r.operations.map(o=>o.b).join(''),b);}
assert(math.align('A','AAAA').cer>1);
for(const x of d.teaching.metricExamples)assert.equal(math.align(x.reference,x.prediction).N,8);
const high=math.select(d.teaching.scoreExamples,.95);assert.deepEqual([high.total,high.kept,high.errors],[8,3,1]);assert.equal(high.coverage,3/8);assert.equal(high.risk,1/3);
assert.equal(math.select(d.teaching.scoreExamples,1).risk,null);assert.equal(math.select(d.teaching.scoreExamples,0).kept,7);assert.equal(math.select([],0).coverage,null);
assert.equal(math.align('AB','BA').distance,2);assert(math.select(d.teaching.scoreExamples,.97).risk>math.select(d.teaching.scoreExamples,.96).risk,'Constructed non-monotonic counterexample');
assert.equal(d.teaching.metricExamples[0].fieldReference,d.teaching.metricExamples[0].fieldPrediction);assert.notEqual(d.teaching.metricExamples[1].fieldReference,d.teaching.metricExamples[1].fieldPrediction);
const template=fs.readFileSync(root+'/assets/ocr-evaluation-template.csv','utf8');assert.equal(template.trim().split(/\r?\n/).length,1,'Template contains fabricated results');
console.log(JSON.stringify({ok:true,nodes:entries.length,relations:entries.reduce((n,e)=>n+e.detail.related.length,0),preservedNodes:base.nodeIds.length,preservedReferences:base.links.length,preservedHistory:d.updates.length-1,structuredEntries:entries.length,inquiryQuestions:d.inquiry.nodeIds.length,mathCases:cases.length,emptyTemplate:true}));
