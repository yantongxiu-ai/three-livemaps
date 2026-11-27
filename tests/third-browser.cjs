const fs=require('fs'),path=require('path'),assert=require('assert');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const output=path.resolve(process.env.QA_OUTPUT||'../../outputs/third-update/screenshots');fs.mkdirSync(output,{recursive:true});
const url=process.env.QA_URL||'http://127.0.0.1:8770/';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.QA_BROWSER_CHANNEL?{channel:process.env.QA_BROWSER_CHANNEL}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await context.route('https://cdn.jsdelivr.net/npm/@tencent-ai/workbuddy-cloud-sdk@dev/lib/index.global.js',r=>r.fulfill({contentType:'application/javascript',body:'/* Local QA disables the production cloud SDK. */'}));
 const page=await context.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 async function check(name,work){await work();checks.push(name);}
 async function shot(name){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:output+'/'+name+'.png',fullPage:true});}
 try{
 await page.goto(url,{waitUntil:'domcontentloaded'});
 await check('Homepage v0.9 and inquiry entry',async()=>{assert.equal(await page.locator('#home-entry-count').textContent(),'34 个学习条目');assert.equal(await page.locator('#home-version').textContent(),'v0.9');await page.locator('.deep-feature a').click();await page.locator('#view-inquiry.active').waitFor();assert.equal(await page.locator('.question-step').count(),7);});
 await check('Every question, source and reciprocal card link',async()=>{for(let i=0;i<7;i++){await page.locator('.question-step').nth(i).click();await page.waitForFunction(i=>document.querySelectorAll('.question-step')[i].getAttribute('aria-current')==='step',i);assert((await page.locator('.question-answer').textContent()).length>30);assert.equal(await page.locator('.question-reasoning li').count(),3);assert((await page.locator('.question-evidence a').count())>0);await page.locator('.question-challenge summary').click();assert((await page.locator('.question-challenge p:visible').count())===1);}});
 await page.locator('[data-step=d-text-pipeline]').click();
 await check('Pipeline switches distinguish omission and character error',async()=>{await page.locator('.question-demo [data-pipeline=missing]').click();assert(!(await page.locator('.question-demo .pipeline-stage').last().textContent()).includes('阅读样本'));await page.locator('.question-demo [data-pipeline=wrong]').click();assert((await page.locator('.question-demo .pipeline-stage').last().textContent()).includes('Q1O5'));});
 await shot('desktop-pipeline');
 await page.locator('[data-step=d-cer]').click();
 await check('Deeper derivation exposes recurrence and aggregate denominators',async()=>{await page.locator('.question-derivation summary').click();assert((await page.locator('.question-derivation').textContent()).includes('D(i,0)=i'));assert((await page.locator('.question-derivation').textContent()).includes('1/100=1%'));});
 await shot('desktop-derivation');
 await page.locator('[data-step=d-field-check]').click();
 await check('Same CER produces different pre-labelled field match',async()=>{await page.locator('.question-demo [data-example=title]').click();assert.equal(await page.locator('.question-demo .metric-value').textContent(),'12.5%');assert((await page.locator('.question-demo .field-result').textContent()).includes('1 / 1'));await page.locator('.question-demo [data-example=field]').click();assert.equal(await page.locator('.question-demo .metric-value').textContent(),'12.5%');assert((await page.locator('.question-demo .field-result').textContent()).includes('0 / 1'));});
 await shot('desktop-counterexample');
 await check('Metric editor handles omissions, insertions, empty reference and text safety',async()=>{
  await page.locator('.question-demo [data-example=missing]').click();assert.equal(await page.locator('.question-demo .metric-value').textContent(),'100.0%');
  const inputs=page.locator('.question-demo .demo-inputs input');await inputs.nth(0).fill('A');await inputs.nth(1).fill('AAAA');assert.equal(await page.locator('.question-demo .metric-value').textContent(),'300.0%');
  await inputs.nth(0).fill('');assert.equal(await page.locator('.question-demo .metric-value').textContent(),'未定义');assert((await page.locator('.question-demo .field-result').textContent()).includes('字段未标注'));
  await inputs.nth(0).fill('<img src=x onerror=alert(1)>');assert.equal(await page.locator('.question-demo img').count(),0);
 });
 await page.locator('[data-step=d-abstain]').click();
 await check('Threshold counts all 8 inputs and leaves empty risk undefined',async()=>{
  const slider=page.locator('.question-demo input[type=range]');assert((await page.locator('.question-demo .threshold-stats').textContent()).includes('37.5%'));assert((await page.locator('.question-demo .threshold-stats').textContent()).includes('33.3%'));
  await slider.fill('100');assert((await page.locator('.question-demo .threshold-stats').textContent()).includes('未定义'));assert.equal(await page.locator('.question-demo .kept-row').count(),0);
  await slider.fill('0');assert.equal(await page.locator('.question-demo .kept-row').count(),7);assert.equal(await page.locator('.question-demo .omitted-row').count(),1);
  await slider.fill('95');await slider.focus();await page.keyboard.press('ArrowRight');assert.equal(await slider.inputValue(),'96');
 });
 await shot('desktop-threshold');
 await page.locator('[data-step=c-ocr-protocol]').click();
 await check('Protocol is a plan, template is blank, modal focus returns to inquiry',async()=>{
  assert.equal(await page.locator('.question-actions a[download]').getAttribute('href'),'assets/ocr-evaluation-template.csv');
  const response=await page.request.get(url+'assets/ocr-evaluation-template.csv');assert(response.ok());assert.equal((await response.text()).trim().split(/\r?\n/).length,1);
  await page.getByRole('button',{name:'打开节点完整卡片',exact:true}).click();await page.locator('#panel.open').waitFor();assert((await page.locator('#panel').textContent()).includes('计划未执行'));assert.equal(await page.locator('#panel .entry-lesson').count(),1);assert(await page.locator('main').evaluate(n=>n.inert));await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'打开节点完整卡片');
 });
 await check('Direct question URL, pager and pitch work',async()=>{
  await page.goto(url+'#inquiry?step=d-cer');assert.equal(await page.locator('.question-step[aria-current=step]').getAttribute('data-step'),'d-cer');await page.getByRole('button',{name:'下一问 →',exact:true}).click();await page.waitForURL('**/#inquiry?step=d-field-check');await page.getByRole('button',{name:'← 上一问',exact:true}).click();await page.waitForURL('**/#inquiry?step=d-cer');await page.locator('.inquiry-pitch summary').click();assert((await page.locator('#inquiry-pitch').textContent()).includes('当前只有教学演示'));
 });
 await check('Legacy entry has readable example and live core node demo',async()=>{
  await page.goto(url+'#domain?entry=d-text-pipeline');await page.locator('#panel.open').waitFor();assert.equal(await page.locator('#panel .entry-lesson').count(),1);await page.locator('#panel [data-pipeline=missing]').click();assert((await page.locator('#panel .pipeline-demo .demo-note').textContent()).includes('忽略漏行'));await page.keyboard.press('Escape');
  await page.goto(url+'#domain?entry=d-cer');await page.locator('#panel.open').waitFor();await page.locator('#panel [data-example=field]').click();assert.equal(await page.locator('#panel .metric-value').textContent(),'12.5%');
 });
 await page.screenshot({path:output+'/desktop-node-card.png'});await page.keyboard.press('Escape');
 await check('Graph includes deep path, 34 nodes, and correct sources',async()=>{
  await page.locator('nav [data-view=visual]').click();await page.locator('[data-path=deep]').click();assert.equal(await page.locator('.atlas-node').count(),8);await page.getByRole('button',{name:'查看全部节点',exact:true}).click();assert.equal(await page.locator('.atlas-node').count(),34);await page.getByRole('searchbox',{name:'搜索可视化地图全部节点'}).fill('字符错误率');assert((await page.locator('.atlas-node').count())>0);await page.getByRole('searchbox',{name:'搜索可视化地图全部节点'}).fill('');await page.locator('[data-path=deep]').click();
 });
 await shot('desktop-graph');
 await check('Seven-node native Archify links to current cards',async()=>{
  await page.locator('.archify-alternative summary').click();const native=page.frameLocator('#archify-frame');await native.locator('g[data-node-id=d-cer]').waitFor();assert.equal(await native.locator('g[data-node-id]').count(),7);await native.locator('g[data-node-id=d-cer]').click();assert.equal(await page.locator('#visual-selection a').getAttribute('href'),'#domain?entry=d-cer');await native.locator('body').press('Escape');
 });
 await page.locator('#archify-frame').screenshot({path:output+'/archify-seven-questions.png'});
 await page.locator('.archify-alternative summary').click();await page.locator('nav [data-view=home]').click();await shot('desktop-home');
 await page.setViewportSize({width:390,height:844});await page.goto(url+'#inquiry?step=d-field-check');await shot('mobile-counterexample');
 await check('Mobile question selection places the heading below the fixed header',async()=>{await page.locator('[data-step=d-score]').click();const heading=await page.locator('.question-title').boundingBox(),header=await page.locator('.topbar').boundingBox();assert(heading.y>=header.y+header.height-1);assert(heading.y<header.y+header.height+60);});
 await check('Narrow and intermediate layouts have no page overflow',async()=>{
  for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:900});for(const view of ['home','domain','eco','cog','visual','inquiry','updates']){await page.locator(`nav [data-view=${view}]`).click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),'Page overflow '+width+' '+view);}
   await page.goto(url+'#inquiry?step=d-abstain');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),'Threshold page overflow '+width);
   await page.goto(url+'#domain?entry=d-cer');await page.locator('#panel.open').waitFor();assert((await page.locator('#panel').boundingBox()).width<=width+1);await page.keyboard.press('Escape');
  }
 });
 await check('Unknown step is handled and no uncaught errors',async()=>{await page.goto(url+'#inquiry?step=unknown');assert.equal(await page.locator('.question-step[aria-current=step]').getAttribute('data-step'),'d-text-pipeline');assert.deepEqual(errors,[]);});
 const result={ok:true,date:new Date().toISOString(),checks,errors,cloud:'Production SDK disabled; no model calls or feedback writes.',widths:[320,390,768,1024,1440]};fs.writeFileSync(output+'/../browser-check.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
