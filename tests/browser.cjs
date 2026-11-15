// Optional browser QA. Use an isolated browser; never call the real model or write feedback.
const assert=require('assert'),fs=require('fs'),path=require('path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const output=path.resolve(process.env.QA_OUTPUT||'../../outputs/second-update/screenshots');fs.mkdirSync(output,{recursive:true});
const url=process.env.QA_URL||'http://127.0.0.1:8769/';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.QA_BROWSER_CHANNEL?{channel:process.env.QA_BROWSER_CHANNEL}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 // Prevent production SDK initialization in the QA environment.
 await context.route('https://cdn.jsdelivr.net/npm/@tencent-ai/workbuddy-cloud-sdk@dev/lib/index.global.js',r=>r.fulfill({contentType:'application/javascript',body:'/* cloud deliberately disabled during local QA */'}));
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const checks=[];async function check(name,fn){await fn();checks.push(name);}
 try{
 await page.goto(url,{waitUntil:'domcontentloaded'});
 await check('Homepage data count and local version',async()=>{assert.equal(await page.locator('#home-entry-count').textContent(),'26 个学习条目');assert.equal(await page.locator('#home-version').textContent(),'v0.8');assert.equal(await page.getByRole('heading',{name:/看清一张标签/}).count(),1);});
 await page.screenshot({path:output+'/desktop-home.png',fullPage:true});
 await check('Map search and category filter',async()=>{
  await page.locator('nav [data-view=domain]').click();await page.getByRole('searchbox',{name:'搜索领域地图',exact:true}).fill('分组');assert.equal(await page.locator('#domain-list .card:visible').count(),1);
  await page.getByRole('searchbox',{name:'搜索领域地图',exact:true}).fill('');await page.getByLabel('筛选领域地图分类').selectOption({label:'核心概念'});assert.equal(await page.locator('#domain-list .card:visible').count(),3);
  await page.getByLabel('筛选领域地图分类').selectOption('全部分类');
 });
 await check('Deep-linked source, escape and inert background',async()=>{
  await page.goto(url+'#domain?entry=d-test-split');await page.locator('#panel.open').waitFor();assert.equal(await page.locator('#panel [href*="group-k-fold"]').count(),1);assert(await page.locator('main').evaluate(n=>n.inert));await page.keyboard.press('Escape');await page.locator('#panel.open').waitFor({state:'hidden'});assert(!(await page.locator('main').evaluate(n=>n.inert)));
 });
 await page.locator('nav [data-view=visual]').click();
 await page.locator('.atlas-node').first().waitFor();await page.waitForTimeout(150);
 await check('Relation selection highlights exact neighbors',async()=>{
  await page.locator('[data-atlas-id=d-text-pipeline]').click();assert.equal(await page.locator('.atlas-inspector h2').textContent(),'文字检测与文字识别');assert.equal(await page.locator('.atlas-node[aria-pressed=true]').count(),1);assert((await page.locator('.atlas-wires path').count())>0);assert.equal(await page.locator('.atlas-inspector a').getAttribute('href'),'#domain?entry=d-text-pipeline');
 });
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:output+'/desktop-atlas.png',fullPage:true});
 await check('Every reading path spans three maps',async()=>{
  for(const id of ['ocr','classification','evidence']){await page.locator(`[data-path=${id}]`).click();assert.equal(await page.locator('.atlas-path[aria-pressed=true]').count(),1);for(const map of ['domain','eco','cog'])assert((await page.locator('.atlas-node.'+map).count())>0);}
 });
 await check('All nodes, global search, empty and recovery',async()=>{
  await page.getByRole('button',{name:'查看全部节点',exact:true}).click();assert.equal(await page.locator('.atlas-node').count(),26);
  await page.getByRole('searchbox',{name:'搜索可视化地图全部节点'}).fill('zzzz-no-match');assert.equal(await page.locator('.atlas-node').count(),0);await page.locator('.atlas-empty').waitFor();
  await page.getByRole('searchbox',{name:'搜索可视化地图全部节点'}).fill('混淆');assert((await page.locator('.atlas-node').count())>0);
  await page.getByRole('searchbox',{name:'搜索可视化地图全部节点'}).fill('');assert.equal(await page.locator('.atlas-node').count(),26);
 });
 await check('Keyboard selection and details',async()=>{
  const button=page.locator('[data-atlas-id=e-wai]');await button.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.atlas-inspector h2').textContent(),'W3C WAI 适老设计资源');await page.locator('.atlas-detail-link').click();await page.locator('#panel.open').waitFor();assert.equal(await page.locator('#panel-title').textContent(),'生态地图 · W3C WAI 适老设计资源');await page.keyboard.press('Escape');
 });
 await page.locator('nav [data-view=visual]').click();
 await check('Archify lazy load and original graph to card linkage',async()=>{
  assert.equal(await page.locator('#archify-frame').getAttribute('src'),null);await page.locator('.archify-alternative summary').click();await page.frameLocator('#archify-frame').locator('g[data-node-id=d-ocr]').waitFor();await page.frameLocator('#archify-frame').locator('g[data-node-id=d-ocr]').click();assert((await page.locator('#visual-selection').textContent()).includes('文字识别'));assert.equal(await page.locator('#visual-selection a').getAttribute('href'),'#domain?entry=d-ocr');
 });
 await page.frameLocator('#archify-frame').locator('body').press('Escape');
 await page.locator('#archify-frame').screenshot({path:output+'/archify-editorial.png'});
 await page.locator('.archify-alternative summary').click();await page.locator('[data-path=ocr]').click();
 await page.setViewportSize({width:390,height:844});await page.goto(url+'#home');await page.screenshot({path:output+'/mobile-home.png',fullPage:true});
 await check('No page overflow on narrow screens, maps and modal',async()=>{
  for(const view of ['home','domain','eco','cog','visual','updates']){await page.locator(`nav [data-view=${view}]`).click();const size=await page.evaluate(()=>({w:document.documentElement.clientWidth,s:document.documentElement.scrollWidth}));assert(size.s<=size.w+1,view+' overflows '+JSON.stringify(size));}
  await page.goto(url+'#domain?entry=d-confusion');await page.locator('#panel.open').waitFor();assert((await page.locator('#panel').boundingBox()).width<=391);await page.keyboard.press('Escape');
 });
 await page.locator('nav [data-view=visual]').click();await page.locator('[data-path=ocr]').click();
 await check('Mobile graph scroll, focus selection and text alternative',async()=>{
  const board=page.locator('.atlas-board');assert(await board.evaluate(n=>n.scrollWidth>n.clientWidth));await page.locator('[data-atlas-id=c-error-review]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.atlas-inspector h2').textContent(),'错误样本复盘计划');assert((await page.locator('.atlas-relation').count())>0);
 });
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:output+'/mobile-atlas.png',fullPage:true});
 await check('All 26 graph nodes select correctly and fit their cards',async()=>{
  await page.getByRole('button',{name:'查看全部节点',exact:true}).click();
  const ids=await page.locator('.atlas-node').evaluateAll(nodes=>nodes.map(n=>n.dataset.atlasId));
  for(const id of ids){const n=page.locator(`[data-atlas-id="${id}"]`);await n.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.atlas-node[aria-pressed=true]').getAttribute('data-atlas-id'),id);assert(await n.evaluate(n=>n.scrollHeight<=n.clientHeight+1),'Node text overflows '+id);}
 });
 await check('Small phone and intermediate widths stay within the page',async()=>{
  for(const width of [320,768,1024]){await page.setViewportSize({width,height:900});for(const view of ['home','domain','visual']){await page.locator(`nav [data-view=${view}]`).click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),'Overflow at '+width+' '+view);}}
 });
 await check('Zero uncaught JavaScript errors',async()=>assert.deepEqual(errors,[]));
 const result={ok:true,viewportDesktop:'1440×1000',viewportMobile:'390×844',checks,errors,cloud:'SDK disabled in QA; no AI or feedback writes',date:new Date().toISOString()};
 fs.writeFileSync(path.join(output,'../browser-check.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
