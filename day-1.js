const fs = require('fs')
const inp = fs.readFileSync('./day-1-tricky.txt').toString();
const m=['0','one','two','three','four','five','six','seven','eight','nine']
const parseLtr = inp.split`\n`.filter(x=>x).map(l => (d=l.match(new RegExp('\\d|'+m.join`|`,'gi')).map(n=>m.reduce((a,e,i)=>a.replace(e,i),n)))[0]+d[d.length-1]).reduce((s,e)=>+s + +e)
// trick learned - overlapping matches using lookahead with capture and matchAll so the captured group is accessible in the result
// trick reinforced - Array.from lets you combine a map function into array coercion rather than using literal spread
const parseOverlapping = inp.split`\n`.filter(x=>x).map(l => (d=Array.from(l.matchAll(new RegExp('(?=(\\d|'+m.join`|`+'))','gi')),x=>x[1]).map(n=>m.reduce((a,e,i)=>a.replace(e,i),n)))[0]+d[d.length-1]).reduce((s,e)=>+s + +e)
console.log('sum without overlapping numbers', parseLtr)
console.log('sum with overlapping numbers', parseOverlapping)