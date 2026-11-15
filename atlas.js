/* Independent relationship renderer. All labels, links and reasons come from MAP_DATA. */
window.LiveAtlas = (() => {
  function init(data) {
    const root=document.getElementById('atlas-root');
    const maps=['domain','eco','cog'];
    const entries=maps.flatMap(map=>data.maps[map].entries.map(entry=>({...entry,map})));
    const lookup=new Map(entries.map(e=>[e.id,e]));
    const edges=entries.flatMap(e=>e.detail.related.map(r=>({from:e.id,to:r.id,reason:r.reason})));
    let path=data.paths[0].id,selected=data.paths[0].ids[0],query='';
    function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
    const shell=el('div','atlas'),paths=el('div','atlas-paths');paths.setAttribute('aria-label','选择阅读路径');
    const tools=el('div','atlas-tools'),search=el('input');search.type='search';search.placeholder='搜索全部节点，寻找一个问题…';search.setAttribute('aria-label','搜索可视化地图全部节点');
    const allButton=el('button','atlas-all','查看全部节点');allButton.type='button';
    const count=el('span','atlas-count');count.setAttribute('role','status');
    const layout=el('div','atlas-layout'),board=el('div','atlas-board');board.tabIndex=0;board.setAttribute('role','region');board.setAttribute('aria-label','知识关系图，可滚动浏览；Tab 键选择节点');
    const inspector=el('aside','atlas-inspector');inspector.setAttribute('aria-label','当前节点与关联说明');
    const legend=el('div','atlas-legend');legend.append(el('span','','图内关联'),el('span','','跨图关联'));
    const help=el('p','atlas-help','点选节点，只显示它的直接关联线。窄屏可在图内横向滑动；下方也有文字关联入口。');
    const scope=el('p','atlas-scope-note','路径仅展示部分条目；切换「全部节点」可查看完整知识库。线条不表示因果，箭头方向与具体理由在关联说明中列出。');
    tools.append(search,allButton,count);layout.append(board,inspector);shell.append(paths,tools,help,layout,legend,scope);root.append(shell);
    const pathButtons=data.paths.map(p=>{const b=el('button','atlas-path');b.type='button';b.dataset.path=p.id;b.append(el('strong','',p.name),el('small','',p.question));b.addEventListener('click',()=>{path=p.id;query='';search.value='';selected=p.ids[0];board.scrollTop=0;board.scrollLeft=0;render();});paths.append(b);return b;});
    allButton.addEventListener('click',()=>{path='all';query='';search.value='';render();});
    search.addEventListener('input',()=>{query=search.value.trim();if(query)path='all';render();});
    function visibleEntries(){const ids=path==='all'?null:data.paths.find(p=>p.id===path).ids;const scoped=ids?ids.map(id=>lookup.get(id)):entries;return scoped.filter(e=>!query||[e.name,e.brief,e.category,e.detail.description].join(' ').toLowerCase().includes(query.toLowerCase()));}
    function select(id,focus=false){selected=id;const current=visibleEntries();if(!current.some(e=>e.id===id)){path='all';query='';search.value='';}render();if(focus){const node=board.querySelector(`[data-atlas-id="${id}"]`);node?.focus({preventScroll:true});node?.scrollIntoView({block:'nearest',inline:'nearest'});}}
    function render(){
      const visible=visibleEntries();if(!visible.some(e=>e.id===selected))selected=visible[0]?.id||null;
      pathButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(data.paths[i].id===path)));allButton.setAttribute('aria-pressed',String(path==='all'));
      const shownIds=new Set(visible.map(e=>e.id));
      const selectedEdges=edges.filter(e=>e.from===selected||e.to===selected);
      const neighbors=new Set(selectedEdges.flatMap(e=>[e.from,e.to]));
      count.textContent=`显示 ${visible.length} / ${entries.length} 个节点 · 共 ${edges.length} 条关联`;
      board.replaceChildren();
      if(!visible.length){board.append(el('p','atlas-empty','没有匹配节点。试试「文字」「数据」或清空搜索。'));renderInspector(null);return;}
      const groups=maps.map(map=>visible.filter(e=>e.map===map));
      const rows=Math.max(...groups.map(g=>g.length)),height=rows*112+105;
      const stage=el('div','atlas-stage');stage.style.height=height+'px';
      const positions=new Map();
      groups.forEach((group,col)=>{
        const lane=el('div','atlas-lane '+maps[col]);lane.style.left=(2+col*33)+'%';
        const heading=el('h2');heading.append(el('span','','0'+(col+1)),document.createTextNode(data.maps[maps[col]].name));lane.append(heading,el('small','',['问题与方法','工具与资源','思考与验证'][col]));stage.append(lane);
        group.forEach((entry,row)=>{
          const x=4+col*33,y=91+row*112;positions.set(entry.id,{x,y});
          const button=el('button','atlas-node '+entry.map);button.type='button';button.dataset.atlasId=entry.id;button.style.left=x+'%';button.style.top=y+'px';button.setAttribute('aria-pressed',String(entry.id===selected));button.setAttribute('aria-label',entry.name+'，'+entry.status+'，选择查看关联');
          if(entry.id!==selected)button.classList.add(neighbors.has(entry.id)?'is-neighbor':'is-muted');
          button.append(el('span','atlas-map-label',entry.status),el('strong','',entry.name));button.addEventListener('click',()=>select(entry.id,true));stage.append(button);
        });
      });
      const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.classList.add('atlas-wires');svg.setAttribute('aria-hidden','true');
      stage.prepend(svg);board.append(stage);
      function draw(){
        svg.replaceChildren();const width=stage.clientWidth;
        const drawn=new Set();
        selectedEdges.filter(e=>shownIds.has(e.from)&&shownIds.has(e.to)).forEach(e=>{
          const pair=[e.from,e.to].sort().join('|');if(drawn.has(pair))return;drawn.add(pair);
          const a=positions.get(e.from),b=positions.get(e.to),same=lookup.get(e.from).map===lookup.get(e.to).map;
          const p=document.createElementNS(ns,'path');if(!same)p.classList.add('cross');
          if(same){const x=(a.x+23)*width/100+4,ya=a.y+45.5,yb=b.y+45.5;const bend=x+11;p.setAttribute('d',`M${x-4},${ya} C${bend},${ya} ${bend},${yb} ${x-4},${yb}`);}
          else {const right=a.x<b.x;const xa=(a.x+(right?23:0))*width/100,xb=(b.x+(right?0:23))*width/100,ya=a.y+45.5,yb=b.y+45.5;const mid=(xa+xb)/2;p.setAttribute('d',`M${xa},${ya} C${mid},${ya} ${mid},${yb} ${xb},${yb}`);}
          svg.append(p);
        });
      }
      draw();resize.disconnect();resize.observe(stage);resizeDraw=draw;
      renderInspector(lookup.get(selected));
    }
    let resizeDraw=()=>{};const resize=new ResizeObserver(()=>resizeDraw());
    function renderInspector(entry){
      inspector.replaceChildren();if(!entry){inspector.append(el('p','','清空搜索后可继续选择节点。'));return;}
      inspector.append(el('p','inspector-kicker','当前条目 / '+data.maps[entry.map].name),el('h2','',entry.name),el('span','inspector-status',entry.status),el('p','',entry.brief));
      const detail=el('a','atlas-detail-link','查看完整卡片与来源 ↗');detail.href='#'+entry.map+'?entry='+encodeURIComponent(entry.id);inspector.append(detail);
      for(const [incoming,title] of [[false,'本条目指向'],[true,'指向本条目']]){
        const related=edges.filter(e=>incoming?e.to===entry.id:e.from===entry.id);inspector.append(el('h3','',title+' · '+related.length));
        related.forEach(r=>{const target=lookup.get(incoming?r.from:r.to);const b=el('button','atlas-relation');b.type='button';b.append(el('strong','',(incoming?'← ':'→ ')+target.name),el('small','',r.reason));b.addEventListener('click',()=>select(target.id,true));inspector.append(b);});
      }
      inspector.append(el('p','','这里只解释条目之间为什么关联；计划状态请在完整卡片中查看。'));
    }
    render();
  }
  return {init};
})();
