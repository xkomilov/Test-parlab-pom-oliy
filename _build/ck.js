// usage: node ck.js NNN "option 1" "option 2" ...  -> prints on-topic % per option
const fs=require('fs');const id=process.argv[2];
const norm=s=>String(s).replace(/\[[^\]]*\]/g,' ').replace(/[’‘ʻʼ`´]/g,"'").replace(/\s+/g,' ').toLowerCase().trim();
const toks=s=>(norm(s).match(/[a-z0-9'Ѐ-ӿ]{3,}/g)||[]).map(t=>t.replace(/^'+|'+$/g,'')).filter(t=>t.length>=3);
const stem=t=>t.slice(0,5);
const tx=fs.readFileSync(`txt/${id}.txt`,'utf8');
const set=new Set(toks(norm(tx)).map(stem));
for(const o of process.argv.slice(3)){const t=toks(o);const miss=t.filter(x=>!set.has(stem(x)));console.log(Math.round(100*(t.length-miss.length)/Math.max(1,t.length))+'%',o,miss.length?'  MISS: '+miss.join(','):'');}
