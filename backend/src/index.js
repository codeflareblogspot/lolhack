/* CodeFlare Tools v5.1.0 — isolated member API; NOT CodeFlare Composer */
const ITERATIONS = 100000;
const SESSION_SECONDS = 7 * 24 * 3600;
const COOKIE = "cf_tools_session";
const encoder = new TextEncoder();
const page = String.raw`<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>CodeFlare Tools | Member Access</title>
<style>
:root{color-scheme:light;font:15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;background:#f3f6fb;color:#14243b}
*{box-sizing:border-box}body{margin:0;min-height:100vh}.layout{min-height:100vh;display:grid;grid-template-columns:minmax(300px,1fr) minmax(360px,1fr)}
.brand{padding:clamp(30px,6vw,90px);display:flex;flex-direction:column;justify-content:center;background:linear-gradient(135deg,#08233b,#103c65 65%,#145e9b);color:#fff}
.logo{width:52px;height:52px;display:grid;place-items:center;background:#168de9;border-radius:15px;font-weight:800;font-size:24px;margin-bottom:38px}
.brand h1{font-size:clamp(30px,4vw,48px);line-height:1.15;letter-spacing:-1.5px;max-width:490px;margin:0 0 16px}
.brand p{color:#c2d9eb;max-width:460px;font-size:16px}.features{margin:26px 0 0;padding:0;list-style:none;color:#e4f1fb}.features li{padding:10px 0}
.right{display:grid;place-items:center;padding:32px 22px}
.panel{background:white;border:1px solid #dae4ef;border-radius:22px;box-shadow:0 18px 45px #203c6010;width:min(100%,470px);padding:clamp(24px,4vw,40px)}
.eyebrow{font-size:12px;letter-spacing:1.8px;font-weight:800;color:#1479c6;text-transform:uppercase}
h2{margin:8px 0 6px;font-size:27px;letter-spacing:-.6px}.muted{color:#63758c;margin:0 0 24px;font-size:14px}
.tabs{display:grid;grid-template-columns:1fr 1fr;background:#eef3fa;border-radius:12px;padding:5px;margin-bottom:23px}
.tabs button{font-weight:700;border:0;padding:12px;border-radius:9px;background:transparent;color:#60758a;cursor:pointer;font:inherit}
.tabs button.active{background:#fff;box-shadow:0 2px 8px #12345514;color:#136cba}
label{display:block;font-size:13px;font-weight:700;margin:0 0 6px}
.field{margin-bottom:16px}input{width:100%;background:#fff;border:1px solid #bcccdc;border-radius:10px;font:inherit;padding:12px 13px;outline:0;color:#14243b}
input:focus{border-color:#1887db;box-shadow:0 0 0 3px #1689e51c}input.invalid{border-color:#d43a48}
.password-wrap{display:flex;gap:8px}.password-wrap input{flex:1;min-width:0}
.reveal{min-width:68px;border:1px solid #c4d2df;border-radius:10px;background:#f1f6fb;color:#315270;cursor:pointer;font-weight:700}
.primary{width:100%;padding:13px;border:0;border-radius:11px;background:#167cdb;color:#fff;font-weight:750;cursor:pointer;font:inherit;margin-top:7px}.primary:hover{background:#096abc}.primary:disabled{opacity:.65;cursor:wait}
.hint{font-size:12px;color:#64758a;margin:6px 0 0}.message{min-height:26px;margin-top:16px;font-size:13px;color:#ab2534}.message.ok{color:#087b58}
.hidden{display:none!important}.footer{margin-top:25px;text-align:center;font-size:12px;color:#789}
.list{padding-left:20px}hr{border:0;border-top:1px solid #e3ebf3;margin:20px 0}
@media(max-width:800px){.layout{display:block}.brand{padding:23px 25px}.brand .logo{width:42px;height:42px;font-size:20px;margin-bottom:9px}.brand h1{font-size:23px;margin:0}.brand p,.brand .features{display:none}.right{padding:18px 14px}.panel{padding:24px 20px;border-radius:15px}}
.summary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:20px 0}.summary-box{background:#eff6fd;border:1px solid #d8e8f7;padding:16px;border-radius:12px}.summary-box small{display:block;color:#576d84}.summary-box strong{display:block;font-size:19px;overflow-wrap:anywhere}@media(max-width:450px){.summary-grid{grid-template-columns:1fr}}</style></head>
<body><div class="layout">
<section class="brand"><div class="logo">CF</div><h1>Ruang aktivitas digital Anda.</h1><p>Kelola akun CodeFlare dan tinjau riwayat aktivitas dengan nyaman, aman, dan transparan.</p><ul class="features"><li>✓ Aktivitas akun dan sesi tersimpan</li><li>✓ Riwayat hingga 30 hari</li><li>✓ Kontrol akun dalam satu dashboard</li></ul></section>
<section class="right"><main class="panel">
<div id="guest">
<div class="eyebrow">CodeFlare Tools</div><h2 id="heading">Selamat datang</h2><p class="muted" id="intro">Masuk atau buat akun member baru.</p>
<div class="tabs" role="tablist" aria-label="Akses member"><button id="tab-login" type="button" class="active" aria-selected="true">Masuk</button><button id="tab-register" type="button" aria-selected="false">Daftar akun</button></div>
<form id="login-form">
<div class="field"><label for="ident">Username atau email</label><input id="ident" name="identity" autocomplete="username" required></div>
<div class="field"><label for="pass">Password</label><div class="password-wrap"><input id="pass" name="password" type="password" autocomplete="current-password" required><button type="button" class="reveal" data-for="pass">Lihat</button></div></div>
<button class="primary" type="submit">Masuk ke dashboard</button></form>
<form id="register-form" class="hidden">
<div class="field"><label for="user">Username</label><input id="user" name="username" autocomplete="username" minlength="3" maxlength="32" pattern="[A-Za-z0-9_]{3,32}" required><p class="hint">3–32 karakter; huruf, angka, atau garis bawah.</p></div>
<div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></div>
<div class="field"><label for="newpass">Password</label><div class="password-wrap"><input id="newpass" name="password" type="password" minlength="12" maxlength="128" autocomplete="new-password" required><button type="button" class="reveal" data-for="newpass">Lihat</button></div><p class="hint">Minimal 12 karakter.</p></div>
<div class="field"><label for="confirm">Konfirmasi password</label><div class="password-wrap"><input id="confirm" type="password" minlength="12" maxlength="128" autocomplete="new-password" required><button type="button" class="reveal" data-for="confirm">Lihat</button></div><p class="hint" id="match-hint">Masukkan ulang password yang sama.</p></div>
<button class="primary" type="submit">Buat akun member</button></form>
</div>
<section id="member" class="hidden"><div class="eyebrow">CodeFlare Tools</div><h2>Dashboard member</h2><p id="profile"></p><p class="muted">Riwayat aktivitas akun selama 30 hari. Analitik AdSense belum diaktifkan.</p><div class="summary-grid"><div class="summary-box"><small>Aktivitas 30 hari</small><strong id="activity-stat">—</strong></div><div class="summary-box"><small>Penghasilan AdSense untuk akun ini</small><strong id="earnings-stat">Belum tersedia</strong></div></div><p class="hint">Penghasilan hanya muncul setelah atribusi dan verifikasi. Ini bukan seluruh pendapatan AdSense CodeFlare.</p><h3>Riwayat akun</h3><ul class="list" id="history"></ul><a id="admin-link" class="hidden" href="/admin">Buka Admin Panel</a><button id="logout" class="primary">Keluar akun</button></section>
<p id="msg" class="message" role="status" aria-live="polite"></p><div class="footer">Secure member access · CodeFlare</div></main></section></div>
<script>
const el=id=>document.getElementById(id),msg=(t,ok=false)=>{el("msg").textContent=t;el("msg").classList.toggle("ok",ok)};
const api=async(path,data)=>{const opt={credentials:"same-origin"};if(data!==undefined){opt.method="POST";opt.headers={"content-type":"application/json"};opt.body=JSON.stringify(data)}const r=await fetch(path,opt);let d=await r.json();if(!r.ok)throw Error(d.error||"Permintaan gagal");return d};
function tab(which){const reg=which==="register";el("login-form").classList.toggle("hidden",reg);el("register-form").classList.toggle("hidden",!reg);el("tab-login").classList.toggle("active",!reg);el("tab-register").classList.toggle("active",reg);el("tab-login").setAttribute("aria-selected",String(!reg));el("tab-register").setAttribute("aria-selected",String(reg));el("heading").textContent=reg?"Buat akun baru":"Selamat datang";el("intro").textContent=reg?"Isi data berikut untuk mendaftar sebagai member.":"Masuk untuk melihat dashboard dan aktivitas Anda.";msg("")}
el("tab-login").onclick=()=>tab("login");el("tab-register").onclick=()=>tab("register");
document.querySelectorAll(".reveal").forEach(b=>b.onclick=()=>{const x=el(b.dataset.for);x.type=x.type==="password"?"text":"password";b.textContent=x.type==="password"?"Lihat":"Tutup"});
function matches(){const a=el("newpass").value,b=el("confirm").value,ok=!b||a===b;el("confirm").classList.toggle("invalid",!ok);el("match-hint").textContent=b?(ok?"Password cocok.":"Konfirmasi password tidak sama."):"Masukkan ulang password yang sama.";return ok}
el("newpass").addEventListener("input",matches);el("confirm").addEventListener("input",matches);
async function refresh(){try{const d=await api("/api/me");el("guest").classList.add("hidden");el("member").classList.remove("hidden");el("profile").textContent=d.user.username+" · "+d.user.email;const a=await api("/api/activity");const rows=a.events.map(x=>{const li=document.createElement("li");li.textContent=x.event_type+" · "+x.created_at;return li});el("history").replaceChildren(...rows);const summary=await api("/api/member/summary");el("activity-stat").textContent=String(summary.activity.reduce((a,x)=>a+Number(x.events||0),0));el("earnings-stat").textContent=summary.earnings.length?summary.earnings.map(x=>x.currency+" "+(Number(x.micros)/1000000).toFixed(2)).join(" · "):"Belum tersedia";el("admin-link").classList.toggle("hidden",d.user.role!=="admin");try{const path=location.pathname;await api("/api/member/pageview",{path});}catch{}msg("")}catch(e){el("guest").classList.remove("hidden");el("member").classList.add("hidden")}}
async function perform(form,path,payload){const b=form.querySelector("button[type=submit]");b.disabled=true;msg("Sedang memproses...");try{await api(path,payload);await refresh();msg("Berhasil.",true)}catch(e){msg(e.message)}finally{b.disabled=false}}
el("login-form").onsubmit=e=>{e.preventDefault();perform(e.currentTarget,"/api/login",{identity:el("ident").value,password:el("pass").value})};
el("register-form").onsubmit=e=>{e.preventDefault();if(!matches()){msg("Konfirmasi password belum cocok.");return}perform(e.currentTarget,"/api/register",{username:el("user").value,email:el("email").value,password:el("newpass").value})};
el("logout").onclick=async()=>{try{await api("/api/logout",{});await refresh();tab("login");msg("Anda sudah keluar.",true)}catch(e){msg(e.message)}};
refresh();
</script></body></html>`;

const adminPage = String.raw`<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeFlare Tools | Admin</title><style>*{box-sizing:border-box}body{margin:0;font:15px/1.55 system-ui;background:#f2f6fc;color:#182c44}header{background:#102b48;color:white;padding:20px 28px;display:flex;justify-content:space-between;align-items:center}header a{color:#b5ddff}main{max-width:1100px;margin:28px auto;padding:0 18px}h1{font-size:25px}.muted{color:#66788d}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}.card,section{background:white;border:1px solid #dfe8f1;border-radius:13px;padding:20px}.card b{display:block;font-size:26px;color:#136fbb}section{margin-top:18px;overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:620px}td,th{padding:12px;border-bottom:1px solid #e7edf5;text-align:left}th{font-size:12px;color:#66788d}small{font-size:12px}button{background:#147bd1;color:white;border:0;border-radius:9px;padding:10px 14px;cursor:pointer}@media(max-width:700px){.grid{grid-template-columns:1fr}header{gap:12px}}</style></head><body><header><strong>CF · Admin Monitoring</strong><a href="/">Dashboard member</a></header><main><h1>Ringkasan operasional</h1><p class="muted">Khusus admin. Aktivitas yang ditampilkan adalah log aplikasi CodeFlare, bukan keputusan Google tentang validitas klik AdSense.</p><div class="grid"><div class="card"><small>Total member</small><b id="total">—</b></div><div class="card"><small>Event terbaru (30 hari)</small><b id="events">—</b></div><div class="card"><small>Status AdSense</small><b id="adsense" style="font-size:16px">—</b></div></div><section><h2>Daftar member</h2><table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Aktivitas terakhir</th></tr></thead><tbody id="members"><tr><td colspan="6">Memuat...</td></tr></tbody></table></section><section><h2>Aktivitas aplikasi terbaru</h2><table><thead><tr><th>Member</th><th>Jenis aktivitas</th><th>Waktu</th></tr></thead><tbody id="activity"><tr><td colspan="3">Memuat...</td></tr></tbody></table></section><p id="status" class="muted"></p></main><script>const el=id=>document.getElementById(id);const get=async path=>{const r=await fetch(path,{credentials:"same-origin"});const j=await r.json();if(!r.ok)throw Error(j.error||"Gagal mengambil data");return j};function row(parent,values){const tr=document.createElement("tr");values.forEach(v=>{const td=document.createElement("td");td.textContent=String(v??"—");tr.append(td)});parent.append(tr)}(async()=>{try{const [o,m,a]=await Promise.all([get("/api/admin/overview"),get("/api/admin/members"),get("/api/admin/activity")]);el("total").textContent=o.members;el("adsense").textContent=o.adsense_status==="not_connected"?"Belum terhubung":o.adsense_status;el("events").textContent=a.events.length;el("members").replaceChildren();el("activity").replaceChildren();m.members.forEach(x=>row(el("members"),[x.id,x.username,x.email,x.role,x.status,x.last_activity]));a.events.forEach(x=>row(el("activity"),[x.username,x.event_type,x.created_at]));if(!m.members.length)row(el("members"),["Belum ada member"]);if(!a.events.length)row(el("activity"),["Belum ada aktivitas"])}catch(e){el("status").textContent=e.message}})();</script></body></html>`;
function json(data,status=200,headers={}){return Response.json(data,{status,headers:{"cache-control":"no-store","x-content-type-options":"nosniff",...headers}})}
function cookie(request){const m=(request.headers.get("cookie")||"").match(/(?:^|;\s*)cf_tools_session=([^;]+)/);return m?.[1]||""}
function setCookie(v,age){return COOKIE+"="+v+"; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age="+age}
function hex(bytes){return [...bytes].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function sha(s){return hex(new Uint8Array(await crypto.subtle.digest("SHA-256",encoder.encode(s))))}
function randomHex(n=32){return hex(crypto.getRandomValues(new Uint8Array(n)))}
async function hashPassword(password,salt){const key=await crypto.subtle.importKey("raw",encoder.encode(password),"PBKDF2",false,["deriveBits"]);return hex(new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:encoder.encode(salt),iterations:ITERATIONS,hash:"SHA-256"},key,256)))}
function ctEqual(a,b){if(a.length!==b.length)return false;let t=0;for(let i=0;i<a.length;i++)t|=a.charCodeAt(i)^b.charCodeAt(i);return t===0}
function validOrigin(request){const o=request.headers.get("origin");return !!o && o===new URL(request.url).origin}
async function readBody(request){try{if(Number(request.headers.get("content-length")||0)>4096)return null;return await request.json()}catch{return null}}
async function auth(request,env){const t=cookie(request);if(!/^[a-f0-9]{64}$/.test(t))return null;return env.DB.prepare("SELECT u.id,u.username,u.email,COALESCE(r.role,'member') AS role FROM cft_sessions s JOIN cft_users u ON u.id=s.user_id LEFT JOIN cft_user_roles r ON r.user_id=u.id WHERE s.token_hash=? AND s.expires_at>? AND u.status='active' LIMIT 1").bind(await sha(t),new Date().toISOString()).first()}
async function newSession(userId,env){const token=randomHex(),now=new Date(),expires=new Date(now.getTime()+SESSION_SECONDS*1000).toISOString();await env.DB.prepare("INSERT INTO cft_sessions(user_id,token_hash,created_at,expires_at) VALUES(?,?,?,?)").bind(userId,await sha(token),now.toISOString(),expires).run();return token}
async function activity(env,id,type){await env.DB.prepare("INSERT INTO cft_activity_events(user_id,event_type,page_path,created_at) VALUES(?,?,?,?)").bind(id,type,null,new Date().toISOString()).run()}
async function rateLimited(env,key){const now=Date.now(),bucket=Math.floor(now/900000),identity=await sha(key+":"+bucket);const r=await env.DB.prepare("SELECT attempts FROM cft_login_limits WHERE identity_hash=?").bind(identity).first();if(Number(r?.attempts||0)>=8)return true;await env.DB.prepare("INSERT INTO cft_login_limits(identity_hash,attempts,updated_at) VALUES(?,1,?) ON CONFLICT(identity_hash) DO UPDATE SET attempts=attempts+1,updated_at=excluded.updated_at").bind(identity,new Date().toISOString()).run();return false}
export default {async fetch(request,env){
 const url=new URL(request.url),path=url.pathname,method=request.method;
 if(method==="GET"&&path==="/health")return json({ok:true,app:"CodeFlare Tools",version:"5.4.0",dbConfigured:!!env.DB});
 if(method==="GET"&&path==="/")return new Response(page,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","content-security-policy":"default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'self'","x-content-type-options":"nosniff"}});
 if(path==="/admin"&&method==="GET"){
  if(!env.DB)return json({ok:false,error:"Database tidak tersedia"},503);
  try{const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  return new Response(adminPage,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff","content-security-policy":"default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; base-uri 'none'"}});
  }catch(e){console.error("ADMIN PAGE ERROR",String(e));return json({ok:false,error:"Server error"},500)}
 }
 if(!path.startsWith("/api/"))return json({ok:false,error:"Not found"},404);
 if(!env.DB)return json({ok:false,error:"Database D1 belum terhubung"},503);
 if(method==="POST"&&!validOrigin(request))return json({ok:false,error:"Origin tidak diizinkan"},403);
 try {
 if(path==="/api/register"&&method==="POST"){
  const b=await readBody(request);if(!b)return json({ok:false,error:"JSON tidak valid"},400);
  const username=String(b.username||"").trim(),email=String(b.email||"").trim().toLowerCase(),password=String(b.password||"");
  if(!/^[A-Za-z0-9_]{3,32}$/.test(username)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||password.length<12||password.length>128)return json({ok:false,error:"Username, email, atau password tidak memenuhi ketentuan"},400);
  if(await rateLimited(env,"register:"+request.headers.get("cf-connecting-ip")))return json({ok:false,error:"Terlalu banyak percobaan. Coba kembali dalam 15 menit."},429);
  const salt=randomHex(16),hash=await hashPassword(password,salt),now=new Date().toISOString();
  try {const res=await env.DB.prepare("INSERT INTO cft_users(username,email,password_hash,google_subject,status,created_at,updated_at) VALUES(?,?,?,NULL,'active',?,?)").bind(username,email,"pbkdf2-sha256:"+ITERATIONS+":"+salt+":"+hash,now,now).run();const id=res.meta.last_row_id;await activity(env,id,"register");const token=await newSession(id,env);return json({ok:true},200,{"set-cookie":setCookie(token,SESSION_SECONDS)})}catch(e){if(/UNIQUE constraint/i.test(String(e)))return json({ok:false,error:"Username atau email sudah digunakan"},409);throw e}
 }
 if(path==="/api/login"&&method==="POST"){
  const b=await readBody(request);if(!b)return json({ok:false,error:"JSON tidak valid"},400);
  const identity=String(b.identity||"").trim(),password=String(b.password||"");
  if(!identity||identity.length>254||password.length>128)return json({ok:false,error:"Kredensial tidak valid"},400);
  if(await rateLimited(env,"login:"+request.headers.get("cf-connecting-ip")+":"+identity.toLowerCase()))return json({ok:false,error:"Terlalu banyak percobaan. Coba lagi nanti."},429);
  const row=await env.DB.prepare("SELECT id,password_hash FROM cft_users WHERE (username=? COLLATE NOCASE OR email=? COLLATE NOCASE) AND status='active' LIMIT 1").bind(identity,identity).first();
  const p=String(row?.password_hash||"").split(":");let pass=false;
  if(p.length===4&&p[0]==="pbkdf2-sha256"&&p[1]==String(ITERATIONS)){pass=ctEqual(await hashPassword(password,p[2]),p[3])}
  if(!pass)return json({ok:false,error:"Username/email atau password salah"},401);
  const token=await newSession(row.id,env);await activity(env,row.id,"login");return json({ok:true},200,{"set-cookie":setCookie(token,SESSION_SECONDS)});
 }
 if(path==="/api/logout"&&method==="POST"){const t=cookie(request);if(t)await env.DB.prepare("DELETE FROM cft_sessions WHERE token_hash=?").bind(await sha(t)).run();return json({ok:true},200,{"set-cookie":setCookie("",0)})}
 if(path==="/api/me"&&method==="GET"){const u=await auth(request,env);return u?json({ok:true,user:u}):json({ok:false,error:"Login diperlukan"},401)}
 if(path==="/api/member/summary"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const since=new Date(Date.now()-30*86400000).toISOString().slice(0,10);
  const activityRows=await env.DB.prepare("SELECT substr(created_at,1,10) AS day,COUNT(*) AS events FROM cft_activity_events WHERE user_id=? AND created_at>=? GROUP BY substr(created_at,1,10) ORDER BY day").bind(u.id,since).all();
  const incomeRows=await env.DB.prepare("SELECT currency,SUM(amount_micros) AS micros FROM cft_member_earnings WHERE user_id=? AND report_date>=? GROUP BY currency").bind(u.id,since).all();
  return json({ok:true,scope:"member",period_days:30,activity:activityRows.results||[],earnings:incomeRows.results||[],earnings_state:incomeRows.results?.length?"available":"not_available"});
 }
 if(path==="/api/member/pageview"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const b=await readBody(request);
  const pathValue=String(b?.path||"").slice(0,240);
  if(!pathValue.startsWith("/")||pathValue.startsWith("//"))return json({ok:false,error:"Path tidak valid"},400);
  const today=new Date().toISOString().slice(0,10);
  const now=new Date().toISOString();
  await env.DB.prepare("INSERT INTO cft_activity_daily(user_id,day,page_views) VALUES(?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET page_views=page_views+1").bind(u.id,today).run();
  return json({ok:true,recorded_at:now});
 }
 if(path==="/api/admin/risk"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const since=new Date(Date.now()-30*86400000).toISOString().slice(0,10);
  const rows=await env.DB.prepare("SELECT a.user_id,u.username,SUM(a.page_views) AS page_views,COUNT(*) AS active_days FROM cft_activity_daily a JOIN cft_users u ON u.id=a.user_id WHERE a.day>=? GROUP BY a.user_id,u.username ORDER BY page_views DESC LIMIT 100").bind(since).all();
  return json({ok:true,scope:"admin",period_days:30,signals:(rows.results||[]).map(x=>({user_id:x.user_id,username:x.username,page_views:x.page_views,active_days:x.active_days,review_suggested:Number(x.page_views)>1000,note:"Indikator internal; bukan bukti klik AdSense invalid."}))});
 }
 if(path==="/api/admin/overview"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const n=await env.DB.prepare("SELECT COUNT(*) AS count FROM cft_users").first();
  return json({ok:true,scope:"admin",members:n?.count||0,adsense_status:"not_connected"});
 }
 if(path==="/api/admin/members"&&method==="GET"){
  const u=await auth(request,env);
  if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const rows=await env.DB.prepare("SELECT u.id,u.username,u.email,u.status,u.created_at,COALESCE(r.role,'member') AS role,(SELECT MAX(a.created_at) FROM cft_activity_events a WHERE a.user_id=u.id) AS last_activity FROM cft_users u LEFT JOIN cft_user_roles r ON r.user_id=u.id ORDER BY u.id DESC LIMIT 100").all();
  return json({ok:true,scope:"admin",members:rows.results||[],limit:100});
 }
 if(path==="/api/admin/activity"&&method==="GET"){
  const u=await auth(request,env);
  if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const since=new Date(Date.now()-30*86400000).toISOString();
  const rows=await env.DB.prepare("SELECT a.id,a.user_id,u.username,a.event_type,a.created_at FROM cft_activity_events a JOIN cft_users u ON u.id=a.user_id WHERE a.created_at>=? ORDER BY a.created_at DESC LIMIT 150").bind(since).all();
  return json({ok:true,scope:"admin",events:rows.results||[],period_days:30});
 }
 if(path==="/api/activity"&&method==="GET"){const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);const d=new Date(Date.now()-30*86400000).toISOString();const r=await env.DB.prepare("SELECT event_type,created_at FROM cft_activity_events WHERE user_id=? AND created_at>=? ORDER BY created_at DESC LIMIT 200").bind(u.id,d).all();return json({ok:true,events:r.results||[]})}
 return json({ok:false,error:"Endpoint tidak ditemukan"},404);
 }catch(e){console.error("TOOLS V5 MEMBER ERROR",String(e));return json({ok:false,error:"Terjadi kesalahan server"},500)}
}};
