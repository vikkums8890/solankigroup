import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('index.html',import.meta.url),'utf8');
new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
const code=html.slice(html.indexOf('// The CRM remains')).split('</script>')[0];
const storage=new Map(),listeners={};
let fail=false,calls=0,choices,suggestions;
const response={messages:[{role:'user',content:'3BHK flat',created_at:'2026-09-11T09:00:00Z'},{role:'assistant',content:'Budget kya hai?',created_at:'2026-09-11T09:01:00Z'}],guided:{bhk:'3',purpose:'Self-use'},choices:['10–20 lakh'],suggestions:['Location'],requestType:'site-visit'};
const nodes={};for(const id of ['#history-status','#history-retry'])nodes[id]={hidden:true,addEventListener(){}};
const log={children:[],replaceChildren(){this.children=[]}};
const chatInput={value:'Mera budget ',disabled:false,addEventListener(){}};
const context=vm.createContext({profile:null,sessionId:'qa-session',restoring:false,historyReady:true,sending:false,chatInput,log,wall:{scrollTop:0,scrollHeight:100},API:'https://test.invalid',AbortSignal,Intl,Date,JSON,Array,Number,
 guidedState:null,guidedRequestType:'site-visit',setChoices:v=>choices=v,setSuggestions:v=>suggestions=v,
 document:{querySelector:id=>nodes[id],addEventListener(){},visibilityState:'visible'},window:{addEventListener:(n,f)=>listeners[n]=f},setInterval(){},checkFollowup(){},
 sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},
 addMessage(text,role){const p={textContent:text},time={textContent:'09:00'};const bubble={role,querySelector:s=>s==='p'?p:time};log.children.push(bubble);return bubble},
 fetch:async(url,options)=>{calls++;assert.equal(JSON.parse(options.body).action,'history');if(fail)throw Error('offline');return{ok:true,json:async()=>response}}});
vm.runInContext(code,context);
listeners.pagehide(); // More details navigation saves the unsent draft.
chatInput.value='';context.profile={name:'QA',phone:'9691062422'};
await vm.runInContext('restoreChat()',context);
assert.equal(log.children.length,2);assert.equal(chatInput.value,'Mera budget ');assert.equal(context.guidedState.bhk,'3');assert.deepEqual(choices,response.choices);assert.deepEqual(suggestions,response.suggestions);
await vm.runInContext('restoreChat()',context);assert.equal(log.children.length,2); // Reload never duplicates.
context.historyReady=false;fail=true;await vm.runInContext('restoreChat()',context);assert.equal(nodes['#history-retry'].hidden,false);assert.equal(chatInput.disabled,true);assert.equal(log.children.length,2);
fail=false;await vm.runInContext('restoreChat()',context);assert.equal(chatInput.disabled,false);assert.equal(nodes['#history-retry'].hidden,true);
assert.equal(calls,4);console.log('Details-return/reload: transcript, draft, guided state and buttons restored; no duplicate messages; failed history retains chat and retries. Mock network only.');
