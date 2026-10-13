// CodeFlare Tools v5 regression contracts. Static safeguards before changing live modules.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const worker=fs.readFileSync('backend/src/index.js','utf8');
const page=worker.slice(worker.indexOf('const page = String.raw'),worker.indexOf('const adminPage = String.raw'));
assert.ok(page.length>1000,'Member page missing');
const ids=new Set([...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
const binds=[...page.matchAll(/el\("([^"]+)"\)/g)].map(m=>m[1]);
const missing=[...new Set(binds.filter(id=>!ids.has(id)))];
assert.deepEqual(missing,[],'Dashboard code refers to deleted HTML elements: '+missing.join(', '));
for(const route of ['/api/register','/api/login','/api/logout','/api/me','/api/member/summary','/api/member/profile','/api/member/password','/api/member/support','/api/member/payout-account','/api/admin/overview','/api/admin/members','/api/admin/support','/api/admin/payout-report']){
 assert.ok(worker.includes('path==="'+route+'"'),'Missing API route '+route);
}
assert.ok(worker.includes('verifyTurnstile(request,env,b.turnstile_token)'),'Turnstile server verification missing');
assert.ok(worker.includes('https://challenges.cloudflare.com'),'Turnstile CSP/endpoint missing');
assert.ok(worker.includes('u.role!=="admin"'),'Admin RBAC guard missing');
assert.ok(worker.includes('name = "codeflare-tools"')===false,'Do not embed Wrangler config inside app source');
console.log('CodeFlare Tools module contract checks passed ('+binds.length+' UI bindings).');
