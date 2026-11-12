const fs=require('fs'),path=require('path'),JSZip=require('jszip');
(async()=>{const dir='../Тест';const files=fs.readdirSync(dir).filter(f=>/^\d{3}\.xlsx$/.test(f)).sort();
let tot=0,dist={A:0,B:0,C:0,D:0,E:0},bad=[],long=0,triples=0;
for(const f of files){const z=await JSZip.loadAsync(fs.readFileSync(path.join(dir,f)));
const sst=await z.file('xl/sharedStrings.xml').async('string');const strs=[...sst.matchAll(/<si><t[^>]*>([\s\S]*?)<\/t><\/si>/g)].map(m=>m[1]);
const sh=await z.file('xl/worksheets/sheet1.xml').async('string');const rows=[...sh.matchAll(/<row r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)].filter(r=>r[1]!=='1');
const letters=[];
for(const r of rows){const cells=[...r[2].matchAll(/<c r="([A-H])\d+"[^>]*><v>(\d+)<\/v><\/c>/g)].reduce((o,m)=>(o[m[1]]=strs[+m[2]],o),{});
 const L=cells.G;letters.push(L);dist[L]++;if(!/«[^»]+»/.test(cells.H||''))bad.push(f+' izoh');if(/[\u0400-\u04FF]/.test(Object.values(cells).join('')))bad.push(f+' kirill');
 const c=cells[L];const mx=Math.max(...'ABCDE'.split('').filter(x=>x!==L).map(x=>cells[x].length));if(c.length>mx*1.1)long++;}
if(rows.length<10||rows.length>11)bad.push(f+' soni '+rows.length);
for(let i=2;i<letters.length;i++)if(letters[i]===letters[i-1]&&letters[i]===letters[i-2])triples++;
tot+=rows.length;}
console.log(JSON.stringify({files:files.length,questions:tot,dist,longPct:(100*long/tot).toFixed(1),triples,bad:bad.slice(0,20),badCount:bad.length}));})();
