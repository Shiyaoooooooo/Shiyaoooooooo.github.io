'use strict';
const papers = [{"year": "2026", "title": "以“麒麟瓜”培育为情境的“染色体变异”教学设计", "journal": "新课程，2026，(07)：65–68。", "category": "课程与教学", "url": "https://www.qikan.com.cn/article/xkcj20260718.html", "linkLabel": "期刊页面"}, {"year": "2025", "title": "例析“整体式教学情境”在高三生物学二轮复习中的应用", "journal": "中学生物学，2025，41(07)：93–96。", "category": "课程与教学", "url": "https://m.fx361.com/bk/zxswx/20257.html", "linkLabel": "期刊目录"}, {"year": "2025", "title": "基于学习进阶的跨学科实践教学衔接研究——以“发酵食品的制作”为例", "authors": "师瑶", "journal": "实验教学与仪器，2025，42(06)：25–29。", "category": "跨学科实践", "url": "https://cjournal.hep.com.cn/1004-2326/CN/2025/42/6", "linkLabel": "期刊记录", "doi": "10.19935/j.cnki.1004-2326.2025.06.009"}, {"year": "2025", "title": "基于食品安全教育的跨学科实验教学案例", "journal": "中学生物学，2025，41(05)：39–41，45。", "category": "跨学科实践", "url": "https://yantai.dps.qikan.cn/pc/maga/text-read?id=zxsw20250519", "linkLabel": "期刊目录"}, {"year": "2025", "title": "信息类选择题突破策略", "journal": "教学考试，2025，(15)：60–62。", "category": "学习与评价"}, {"year": "2023", "title": "融入课程思政理念的高中生物学乡土化教学实践", "authors": "师瑶", "journal": "生物学教学，2023，48(11)：23–25。", "category": "课程与教学", "url": "https://swxjx.ecnu.edu.cn/CN/abstract/abstract15453.shtml", "linkLabel": "期刊记录"}, {"year": "2023", "title": "基于现象教学的高中生物学校本课程开发初探", "authors": "师瑶，董欢，赵晓燕", "journal": "生物学教学，2023，48(06)：71–74。", "category": "课程与教学", "url": "https://swxjx.ecnu.edu.cn/CN/Y2023/V48/I6", "linkLabel": "期刊记录"}, {"year": "2021", "title": "有效学习活动的关键特征和设计策略——以“DNA双螺旋结构模型”为例", "authors": "张春雷，师瑶", "journal": "生物学通报，2021，56(06)：11–15。", "category": "学习与评价", "url": "https://swxtb.bnu.edu.cn/gkll/2021nf/a3ca2fc130d34344a227fb11eb9ebc6b.htm", "linkLabel": "期刊记录"}];
let category='all';
const list=document.getElementById('paper-list');
const search=document.getElementById('paper-search');
function renderPapers(){
 const query=(search?.value||'').trim().toLocaleLowerCase();
 const matches=papers.filter(p=>(category==='all'||p.category===category)&&(`${p.title} ${p.authors||''} ${p.journal} ${p.year}`).toLocaleLowerCase().includes(query));
 list.replaceChildren();
 matches.forEach(p=>{
  const article=document.createElement('article');article.className='paper';
  const year=document.createElement('span');year.className='paper-year';year.textContent=p.year;
  const body=document.createElement('div');const title=document.createElement('h3');title.textContent=p.title;
  const authors=document.createElement('p');authors.className='paper-authors';authors.textContent=p.authors||'';authors.hidden=!p.authors;
  const journal=document.createElement('p');journal.className='paper-journal';journal.textContent=p.journal;
  const meta=document.createElement('div');meta.className='paper-meta';
  const tag=document.createElement('span');tag.className='paper-tag';tag.textContent=p.category;
  const copy=document.createElement('button');copy.type='button';copy.className='copy-citation';copy.textContent='复制条目 ↗';copy.setAttribute('aria-label',`复制论文条目：${p.title}`);copy.addEventListener('click',()=>copyText(`${p.authors?p.authors+'. ':''}${p.title}[J]. ${p.journal}${p.doi?' DOI: '+p.doi:''}`,'论文条目已复制'));
  meta.append(tag);if(p.url){const source=document.createElement('a');source.className='paper-source';source.href=p.url;source.target='_blank';source.rel='noopener noreferrer';source.textContent=p.linkLabel+' ↗';meta.append(source);}meta.append(copy);body.append(title,authors,journal,meta);article.append(year,body);list.append(article);
 });
 if(document.getElementById('paper-count'))document.getElementById('paper-count').textContent=category==='all'&&!query?`已整理的论文 · ${matches.length} 篇`:`找到 ${matches.length} 篇论文`;
 if(document.getElementById('empty-state'))document.getElementById('empty-state').hidden=matches.length!==0;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 category=button.dataset.filter;
 document.querySelectorAll('[data-filter]').forEach(item=>{const on=item===button;item.classList.toggle('selected',on);item.setAttribute('aria-pressed',String(on));});renderPapers();
}));
search?.addEventListener('input',renderPapers);
let toastTimer;
function toast(message){const box=document.getElementById('toast');box.textContent=message;box.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),2500);}
async function copyText(value,message){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);}else{const field=document.createElement('textarea');field.value=value;field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();const ok=document.execCommand('copy');field.remove();if(!ok)throw new Error('Copy unavailable');}toast(message);}catch{toast('复制未完成，请选中文字手动复制。');}}
document.getElementById('copy-email')?.addEventListener('click',()=>copyText('s2212972831@163.com','邮箱已复制'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.side-nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}});},{rootMargin:'-15% 0px -60% 0px',threshold:0});document.querySelectorAll('main section').forEach(s=>observer.observe(s));}
if(list) renderPapers();

const themeButton=document.getElementById('theme-toggle');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-label',theme==='dark'?'切换浅色模式':'切换深色模式');themeButton.title=themeButton.getAttribute('aria-label');themeButton.textContent=theme==='dark'?'☀':'◐';}
let savedTheme='light';try{savedTheme=localStorage.getItem('shiyao-theme')||'light';}catch{}applyTheme(savedTheme);
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('shiyao-theme',theme);}catch{}});
