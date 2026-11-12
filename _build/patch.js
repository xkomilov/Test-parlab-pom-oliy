// usage: node patch.js file.json  (reads patch from stdin: [[topic, idx, {q?,c?,w?,x?}]...])
const fs=require('fs');const f=process.argv[2];const d=JSON.parse(fs.readFileSync(f,'utf8'));
const p=JSON.parse(fs.readFileSync(0,'utf8'));
for(const [t,i,o] of p){const r=d[t][i];for(const k in o){if(k==='w1'){r.w[o.w1[0]]=o.w1[1];}else r[k]=o[k];}}
fs.writeFileSync(f,JSON.stringify(d,null,1));
