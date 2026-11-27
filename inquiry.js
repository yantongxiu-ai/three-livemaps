/* Structured reading, an inquiry trail and teaching diagrams; all text uses DOM text nodes. */
window.Inquiry=(()=>{
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const pct=v=>v===null?'未定义':(v*100).toFixed(1)+'%';
 let data,openEntry,sequence=0;
 const find=id=>Object.values(data.maps).flatMap(m=>m.entries).find(e=>e.id===id);
 function label(host,text='人工构造的教学示意 · 没有调用 OCR'){host.append(el('p','teaching-label',text));}
 function metrics(host){
  const examples=data.teaching.metricExamples,wrap=el('div','metric-demo');label(wrap);
  const controls=el('div','demo-switches');controls.setAttribute('aria-label','选择错字示例');
  const inputs=el('div','demo-inputs'),ref=el('input'),pred=el('input');const uid='metric-'+(++sequence);
  for(const [field,id,title] of [[ref,uid+'-ref','参照文本'],[pred,uid+'-pred','候选文本']]){field.id=id;field.maxLength=80;field.type='text';field.spellcheck=false;const group=el('div'),caption=el('label','',title);caption.htmlFor=id;group.append(caption,field);inputs.append(group);}
  const result=el('div','metric-result');result.setAttribute('role','status');
  const alignment=el('div','alignment-scroll');alignment.tabIndex=0;alignment.setAttribute('aria-label','逐字符最优对齐，可横向滚动');
  const note=el('p','demo-note'),fieldResult=el('p','field-result');let chosen=examples[0];
  const buttons=examples.map(example=>{const b=el('button','demo-switch',example.label);b.type='button';b.dataset.example=example.id;b.addEventListener('click',()=>{chosen=example;ref.value=example.reference;pred.value=example.prediction;render();});controls.append(b);return b;});
  function render(){
    buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(examples[i]===chosen)));
    const r=LearningMath.align(ref.value,pred.value);result.replaceChildren();
    const value=el('strong','metric-value',pct(r.cer)),equation=el('span','metric-equation',`CER = (${r.S}替换 + ${r.D}删除 + ${r.I}插入) ÷ ${r.N}参照字符`);result.append(value,equation);
    const grid=el('div','alignment-grid');grid.style.gridTemplateColumns=`68px repeat(${Math.max(r.operations.length,1)}, 31px)`;
    grid.append(el('span','alignment-heading','参照'));for(const op of r.operations){const token=el('span','char '+op.kind,op.a===''?'∅':op.a===' '?'␣':op.a);token.title={equal:'相同',substitute:'替换',delete:'删除',insert:'插入'}[op.kind];grid.append(token);}
    grid.append(el('span','alignment-heading','候选'));for(const op of r.operations)grid.append(el('span','char '+op.kind,op.b===''?'∅':op.b===' '?'␣':op.b));
    alignment.replaceChildren(grid);
    fieldResult.textContent=chosen?`预先标注的编号字段：${chosen.fieldPrediction===chosen.fieldReference?'1 / 1 完整匹配':'0 / 1 完整匹配'}（参照 ${chosen.fieldReference}；候选 ${chosen.fieldPrediction??'缺失'}）`:'自定义文本仅计算字符差异；字段未标注，不自动推断字段匹配。';
    note.textContent=chosen?chosen.explanation:'可编辑短文本继续演算。保留空格、大小写与标点，以 Unicode 码点计数；∅表示该对齐位置无字符，␣表示空格。空参照时CER未定义。';
  }
  for(const input of [ref,pred])input.addEventListener('input',()=>{chosen=null;render();});
  ref.value=chosen.reference;pred.value=chosen.prediction;wrap.append(controls,inputs,result,alignment,el('p','demo-legend','相同 · 替换 · 删除 · 插入（∅为空位，␣为空格；最优对齐可能不唯一）'),fieldResult,note);host.append(wrap);render();
 }
 function threshold(host){
  const wrap=el('div','threshold-demo');label(wrap,'人工构造的8项评分表 · 不是模型输出或实测结果');
  const uid='threshold-'+(++sequence),slider=el('input'),caption=el('label','threshold-label');slider.type='range';slider.min='0';slider.max='100';slider.step='1';slider.value='95';slider.id=uid;caption.htmlFor=uid;
  const output=el('div','threshold-stats');output.setAttribute('role','status');
  const tableWrap=el('div','table-scroll');tableWrap.tabIndex=0;tableWrap.setAttribute('role','region');tableWrap.setAttribute('aria-label','人工构造的评分表，可横向滚动');
  const table=el('table','teaching-table'),thead=el('thead'),tr=el('tr');['示意项','构造分数','预设结果','是否保留'].forEach(t=>{const th=el('th','',t);th.scope='col';tr.append(th);});thead.append(tr);const tbody=el('tbody');table.append(thead,tbody);tableWrap.append(table);
  function render(){
   const t=Number(slider.value)/100,r=LearningMath.select(data.teaching.scoreExamples,t);caption.textContent=`教学阈值 τ = ${t.toFixed(2)}（保留分数 ≥ τ 的项）`;slider.setAttribute('aria-valuetext',t.toFixed(2));output.replaceChildren();
   for(const [value,text] of [[pct(r.coverage),`覆盖：${r.kept} / ${r.total} 全部输入`],[pct(r.risk),`保留项错误：${r.errors} / ${r.kept}`],[String(r.total-r.kept),'未保留 / 无输出项']]){const box=el('div');box.append(el('strong','',value),el('span','',text));output.append(box);}
   tbody.replaceChildren();for(const row of data.teaching.scoreExamples){const keep=r.ids.includes(row.id),tr=el('tr',keep?'kept-row':'omitted-row');for(const text of [row.id,row.score===null?'无输出':row.score.toFixed(2),row.correct===null?'待查':row.correct?'正确':'错误',keep?'保留':'未保留'])tr.append(el('td','',text));tbody.append(tr);}
  }
  slider.addEventListener('input',render);wrap.append(caption,slider,output,tableWrap,el('p','demo-note','覆盖率的分母含全部8项，包括无输出项。若全部未保留，保留项错误比例未定义；零个保留错误不是总体可靠的证明。此阈值仅为演算约定，不是实际应用建议。'));host.append(wrap);render();
 }
 function pipeline(host){
  const wrap=el('div','pipeline-demo');label(wrap,'原创建模图例 · 按键切换失败环节，没有运行识别模型');
  const controls=el('div','demo-switches'),modes=[['complete','正常示意'],['missing','漏掉一行'],['wrong','找到但读错']];let mode='complete';
  const scene=el('div','pipeline-scene'),source=el('div','paper-label');source.append(el('small','','人工标签 / 非真实药品'),el('strong','','项目代号Q105'),el('span','','阅读样本'));
  const region=el('div','pipeline-stage'),output=el('div','pipeline-stage'),explain=el('p','demo-note');scene.append(source,region,output);
  const buttons=modes.map(([id,title])=>{const b=el('button','demo-switch',title);b.type='button';b.dataset.pipeline=id;b.addEventListener('click',()=>{mode=id;render();});controls.append(b);return b;});
  function render(){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(modes[i][0]===mode)));region.replaceChildren(el('small','','① 找文字区域'),el('strong','detection-box','项目代号Q105'));if(mode!=='missing')region.append(el('span','detection-box','阅读样本'));
   output.replaceChildren(el('small','','② 将区域转成文本'),el('strong','',mode==='wrong'?'项目代号Q1O5':'项目代号Q105'));if(mode!=='missing')output.append(el('span','','阅读样本'));
   explain.textContent=mode==='missing'?'“阅读样本”这一行未进入输出。若只检查已返回的文本，就会忽略漏行；必须回查原图与完整参照。':mode==='wrong'?'区域找到了，但编号中的0变成了O。它进入文本差异与字段核对两个层面的检查。':'原图 → 检测区域 → 候选文字。第三步仍是对照人工参照与原图核对；示意流程不是已完成的识别系统。';
  }
  wrap.append(controls,scene,explain);host.append(wrap);render();
 }
 function demo(host,kind){({metrics,threshold,pipeline}[kind]||(()=>{}))(host);}
 function derivation(host,entry){
  const d=entry.detail.derivation;if(!d)return;const details=el('details','question-derivation');details.append(el('summary','',d.title),el('p','',d.intro));const list=el('ol');d.lines.forEach(line=>list.append(el('li','',line)));details.append(list,el('p','',d.conclusion));host.append(details);
 }
 function enrich(body,entry){
  const lesson=entry.detail.lesson;if(!lesson)return;
  const card=el('section','entry-lesson');card.setAttribute('aria-label','帮助理解');card.append(el('p','lesson-summary',lesson.summary));
  for(const [title,text] of [['举个例子',lesson.example],['容易误解',lesson.pitfall],['下一步怎么查',lesson.action]]){const p=el('p');p.append(el('strong','',title+'：'),document.createTextNode(text));card.append(p);}
  if(entry.demo){const teaching=el('div','entry-demo');demo(teaching,entry.demo);card.append(teaching);}
  derivation(card,entry);
  const step=data.inquiry.nodeIds.indexOf(entry.id);if(step>=0){const a=el('a','text-link','沿这条问题继续深挖 →');a.href='#inquiry?step='+encodeURIComponent(entry.id);card.append(a);}
  const description=body.querySelector('h3');if(description)body.insertBefore(card,description);else body.prepend(card);
 }
 function init(input,options){
  data=input;openEntry=options.open;
  const root=document.getElementById('inquiry-root'),layout=el('div','inquiry-layout'),nav=el('nav','question-nav');nav.setAttribute('aria-label','七问深入路径');const article=el('article','question-article');layout.append(nav,article);root.append(layout);
  const lookup=data.inquiry.nodeIds.map(id=>find(id));
  const navButtons=lookup.map((entry,i)=>{const b=el('button','question-step');b.type='button';b.dataset.step=entry.id;b.append(el('span','step-number',String(i+1).padStart(2,'0')),el('span','',entry.detail.probe.question));b.addEventListener('click',()=>{location.hash='inquiry?step='+encodeURIComponent(entry.id);});nav.append(b);return b;});
  function render(index,focus){
   navButtons.forEach((b,i)=>b.setAttribute('aria-current',i===index?'step':'false'));const entry=lookup[index],p=entry.detail.probe;article.replaceChildren();
   article.append(el('p','question-kicker',`第 ${index+1} / ${lookup.length} 问 · ${entry.name}`));
   const heading=el('h2','question-title',p.question);heading.tabIndex=-1;article.append(heading,el('p','question-answer',p.answer));
   if(entry.demo){const host=el('div','question-demo');demo(host,entry.demo);article.append(host);}
   const reasoning=el('ol','question-reasoning');p.reasoning.forEach(text=>reasoning.append(el('li','',text)));article.append(el('h3','','把理由展开'),reasoning);derivation(article,entry);
   const challenge=el('details','question-challenge'),summary=el('summary','',p.challenge);challenge.append(summary,el('p','',p.response));article.append(challenge);
   const evidence=el('div','question-evidence');evidence.append(el('h3','','依据与边界'));
   if(entry.detail.sources?.length){for(const id of entry.detail.sources){const s=data.sources.find(s=>s.id===id);const a=el('a','',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';evidence.append(a,el('p','',s.position+'。'+s.scope));}}
   else evidence.append(el('p','',entry.detail.source));
   article.append(evidence);const actions=el('div','question-actions'),full=el('button','atlas-all','打开节点完整卡片');full.type='button';full.addEventListener('click',()=>openEntry(entry.id));actions.append(full);
   if(index===lookup.length-1){const a=el('a','atlas-all','下载空白评测表');a.href='assets/ocr-evaluation-template.csv';a.download='OCR评测空白表.csv';actions.append(a);}
   article.append(actions);
   const pager=el('div','question-pager');for(const [delta,text] of [[-1,'← 上一问'],[1,'下一问 →']]){const b=el('button','atlas-all',text);b.type='button';b.disabled=index+delta<0||index+delta>=lookup.length;b.addEventListener('click',()=>{location.hash='inquiry?step='+lookup[index+delta].id;});pager.append(b);}article.append(pager);
   if(focus&&document.getElementById('view-inquiry').classList.contains('active')){
    heading.focus({preventScroll:true});
    if(window.matchMedia('(max-width:760px)').matches){const top=heading.getBoundingClientRect().top+window.scrollY-document.querySelector('.topbar').getBoundingClientRect().height-16;window.scrollTo({top:Math.max(0,top),behavior:'instant'});}
   }
  }
  function route(){const [view,search='']=location.hash.slice(1).split('?');if(view!=='inquiry')return;const requested=new URLSearchParams(search).get('step');const index=Math.max(0,data.inquiry.nodeIds.indexOf(requested));render(index,true);}
  window.addEventListener('hashchange',route);render(0,false);route();
  const pitch=document.getElementById('inquiry-pitch');pitch.textContent=data.inquiry.pitch;
 }
 return {init,enrich};
})();
