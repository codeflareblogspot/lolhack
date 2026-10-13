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
.summary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:20px 0}.summary-box{background:#eff6fd;border:1px solid #d8e8f7;padding:16px;border-radius:12px}.summary-box small{display:block;color:#576d84}.summary-box strong{display:block;font-size:19px;overflow-wrap:anywhere}@media(max-width:450px){.summary-grid{grid-template-columns:1fr}}
body.member-mode{background:#f4f7fb}.member-mode>.layout{display:none}.app-shell{min-height:100vh;display:grid;grid-template-columns:248px minmax(0,1fr);font-size:15px}.app-side{background:#102942;color:#d9e7f4;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;padding:24px 15px}.app-brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;padding:0 10px 35px;color:white}.app-brand em{font-style:normal;color:#57b2ff;font-size:12px;letter-spacing:1px}.app-logo{width:38px;height:38px;background:#198be5;display:grid;place-items:center;border-radius:11px;color:white}.nav-label{padding:0 13px;color:#7996b4;letter-spacing:1.5px;font-size:11px;font-weight:800;margin-bottom:15px}.app-nav{display:grid;gap:6px}.nav-btn{width:100%;border:0;text-align:left;background:transparent;color:#aec6dd;border-radius:10px;padding:13px 15px;font:inherit;text-decoration:none;display:flex;gap:12px;align-items:center;cursor:pointer}.nav-btn:hover,.nav-btn.selected{background:#1e4364;color:#fff}.side-bottom{margin-top:auto;display:flex;gap:11px;align-items:center;padding:17px 9px;border-top:1px solid #2c4964}.side-bottom strong,.side-bottom small{display:block}.side-bottom small{color:#8eafcc}.side-avatar,.top-avatar{width:37px;height:37px;display:grid;place-items:center;border-radius:50%;background:#237ccc;color:#fff;font-weight:800}.app-main{min-width:0}.app-top{height:86px;display:flex;align-items:center;justify-content:space-between;background:white;border-bottom:1px solid #e1e8f1;padding:15px 33px;gap:12px}.top-left,.top-right{display:flex;align-items:center;gap:16px}.app-top h2{margin:2px 0;font-size:21px}.app-breadcrumb{font-size:12px;color:#8795a9}.status-pill{font-size:12px;color:#07865e;background:#e9f8f2;padding:7px 12px;border-radius:20px}.status-pill i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#11a675;margin-right:6px}.logout-btn,.icon-btn{border:1px solid #d6e2ef;background:white;border-radius:9px;padding:9px 13px;color:#274461;cursor:pointer}.icon-btn{display:none}.app-content{max-width:1450px;margin:auto;padding:30px 33px}.welcome-card{background:linear-gradient(105deg,#15529b,#217fcf);padding:29px 33px;border-radius:17px;color:white;display:flex;justify-content:space-between;align-items:center}.welcome-card h1{font-size:25px;margin:8px 0 6px}.welcome-card p{color:#daeeff;margin:0}.welcome-tag{letter-spacing:1.7px;font-size:11px;font-weight:800;color:#b9defb}.welcome-symbol{font-size:65px;color:#91ceff}.metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin:20px 0}.metric,.app-card{background:white;border:1px solid #e0e8f1;border-radius:14px;box-shadow:0 3px 12px #23466b08}.metric{padding:18px 20px;min-width:0}.metric small,.metric strong,.metric-foot{display:block}.metric small{color:#6a7d93;margin:7px 0}.metric strong{font-size:22px;line-height:1.3;overflow-wrap:anywhere}.metric-foot{font-size:12px;color:#8493a5;margin-top:9px}.metric-icon{font-size:21px;color:#1684dd}.content-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(260px,1fr);gap:17px;margin-bottom:18px}.app-card{padding:22px;margin-bottom:18px}.card-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:20px}.card-heading h3{font-size:17px;margin:0 0 3px}.card-heading p{font-size:13px;color:#8091a5;margin:0}.period-tag{font-size:12px;background:#f0f5fc;color:#537390;padding:7px 11px;border-radius:8px}.chart-area{display:flex;align-items:end;gap:5px;height:194px;border-bottom:1px solid #dce6f2;padding:12px 0 0}.chart-col{height:100%;flex:1;display:flex;align-items:end;min-width:0}.chart-col span{width:100%;border-radius:4px 4px 0 0;background:#54a9ea;min-height:3px}.chart-col span.has-events{background:#187ed3}.account-line{display:flex;justify-content:space-between;gap:13px;border-bottom:1px solid #eef2f6;padding:14px 0;color:#788ba0}.account-line b{color:#24394f;font-weight:650;overflow-wrap:anywhere;text-align:right}.data-table{width:100%;border-collapse:collapse;text-align:left}.data-table th{color:#8a9aae;background:#f6f9fc;font-weight:650;font-size:12px}.data-table td,.data-table th{padding:13px 15px;border-bottom:1px solid #edf1f6}.table-scroll{overflow-x:auto}.link-button{color:#177fcd;background:none;border:0;cursor:pointer;font-weight:700}.earning-amount{font-size:28px;font-weight:800;padding:15px 0}.app-footer{text-align:center;color:#9aabba;font-size:12px;padding:24px}.app-view.hidden{display:none!important}@media(max-width:1180px){.metric-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.content-grid{grid-template-columns:1fr}}@media(max-width:760px){.app-shell{display:block}.app-side{position:fixed;z-index:20;transform:translateX(-100%);width:248px;transition:transform .2s}.app-shell.side-open .app-side{transform:translateX(0)}.icon-btn{display:block}.app-top{padding:12px 16px}.app-content{padding:16px}.welcome-card{padding:23px}.welcome-card h1{font-size:21px}.welcome-symbol,.status-pill{display:none}.metric-grid{gap:10px}.metric{padding:15px}.top-avatar{display:none}}@media(max-width:420px){.metric-grid{grid-template-columns:1fr}.app-top h2{font-size:18px}}.avatar-preview{width:94px;height:94px;border-radius:50%;display:grid;place-items:center;background:#176fc7;color:white;font-size:32px;font-weight:800;margin:16px 0;overflow:hidden}.avatar-preview img{width:100%;height:100%;object-fit:cover}#view-account input,#view-support textarea{display:block;width:100%;border:1px solid #c7d7e7;border-radius:10px;padding:11px;margin:7px 0 16px;background:white;color:#17304c;font:inherit}#view-account label,#view-support label{font-weight:650}.support-thread{min-height:170px;max-height:430px;overflow:auto;display:flex;flex-direction:column;gap:12px;background:#f6f9fd;border:1px solid #e3ebf3;border-radius:12px;padding:18px;margin-bottom:20px}.chat-bubble{max-width:85%;border-radius:13px;padding:12px 16px;white-space:pre-wrap;overflow-wrap:anywhere}.chat-bubble small{display:block;font-size:11px;margin-bottom:4px;opacity:.7}.from-member{align-self:flex-end;background:#d9edff}.from-admin{align-self:flex-start;background:white;border:1px solid #dbe5ee}#view-account select{display:block;width:100%;padding:12px;background:white;color:#17304c;border:1px solid #c7d7e7;border-radius:10px;font:inherit;margin:7px 0 16px}</style></head>
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
<p id="msg" class="message" role="status" aria-live="polite"></p><div class="footer">Secure member access · CodeFlare</div></main></section></div>
<div id="member" class="app-shell hidden">
<aside class="app-side"><div class="app-brand"><span class="app-logo">CF</span><span>CodeFlare <em>TOOLS</em></span></div><div class="nav-label">WORKSPACE</div>
<nav class="app-nav" aria-label="Menu member"><button class="nav-btn selected" data-view="overview">▦ <span>Dashboard</span></button><button class="nav-btn" data-view="activity">◷ <span>Aktivitas</span></button><button class="nav-btn" data-view="earnings">▤ <span>Penghasilan</span></button><button class="nav-btn" data-view="account">♙ <span>Pengaturan</span></button><button class="nav-btn" data-view="support">✉ <span>Chat Admin</span></button><a class="nav-btn hidden" id="admin-link" href="/admin">⚙ <span>Admin Panel</span></a></nav>
<div class="side-bottom"><div class="side-avatar" id="side-initial">M</div><div><strong id="side-user">Member</strong><small id="side-role">Member</small></div></div>
</aside><div class="app-main"><header class="app-top"><div class="top-left"><button id="menu-toggle" class="icon-btn" title="Toggle menu" aria-label="Toggle sidebar">☰</button><div><span class="app-breadcrumb">Workspace / <b id="crumb">Dashboard</b></span><h2 id="view-title">Dashboard</h2></div></div><div class="top-right"><span class="status-pill"><i></i> <span id="online-stat">— online</span></span><span class="top-avatar" id="top-initial">M</span><button id="logout" class="logout-btn">Keluar</button></div></header>
<div class="app-content"><section class="app-view" id="view-overview">
<div class="welcome-card"><div><span class="welcome-tag">MEMBER WORKSPACE</span><h1>Selamat datang, <span id="hello-user">Member</span> 👋</h1><p>Pantau aktivitas akun dan informasi penghasilan yang tersedia untuk Anda.</p></div><span class="welcome-symbol">✦</span></div>
<div class="metric-grid"><article class="metric"><span class="metric-icon">◷</span><small>Aktivitas 30 hari</small><strong id="activity-stat">—</strong><span class="metric-foot">Event akun tercatat</span></article><article class="metric"><span class="metric-icon">✓</span><small>Status akun</small><strong id="account-status">Aktif</strong><span class="metric-foot">Akses member</span></article><article class="metric"><span class="metric-icon">▤</span><small>Penghasilan AdSense</small><strong id="earnings-stat">Belum tersedia</strong><span class="metric-foot">Hanya data yang dialokasikan ke akun</span></article><article class="metric"><span class="metric-icon">↗</span><small>Login terakhir</small><strong id="last-login">—</strong><span class="metric-foot">Aktivitas sesi terbaru</span></article></div>
<div class="content-grid"><article class="app-card"><div class="card-heading"><div><h3>Grafik aktivitas</h3><p>Ringkasan 30 hari terakhir</p></div><span class="period-tag">30 hari</span></div><div class="chart-area" id="activity-chart" aria-label="Grafik aktivitas 30 hari"></div></article><article class="app-card"><div class="card-heading"><div><h3>Informasi akun</h3><p>Data akun member Anda</p></div></div><div class="account-line"><span>Username</span><b id="profile-name">—</b></div><div class="account-line"><span>Email</span><b id="profile-email">—</b></div><div class="account-line"><span>Role</span><b id="profile-role">—</b></div><div class="account-line"><span>Status penghasilan</span><b id="income-status">Belum terhubung</b></div></article></div>
<article class="app-card"><div class="card-heading"><div><h3>Aktivitas terbaru</h3><p>Catatan sistem akun Anda</p></div><button class="link-button" data-go="activity">Lihat semua →</button></div><div class="table-scroll"><table class="data-table"><thead><tr><th>Aktivitas</th><th>Tanggal & waktu</th><th>Status</th></tr></thead><tbody id="recent-rows"></tbody></table></div></article>
</section>
<section class="app-view hidden" id="view-activity"><article class="app-card"><div class="card-heading"><div><h3>Riwayat aktivitas</h3><p>Log aktivitas member dalam 30 hari terakhir</p></div></div><div class="table-scroll"><table class="data-table"><thead><tr><th>Aktivitas</th><th>Tanggal & waktu</th><th>Status</th></tr></thead><tbody id="all-rows"></tbody></table></div></article></section>
<section class="app-view hidden" id="view-earnings"><article class="app-card"><div class="card-heading"><div><h3>Penghasilan AdSense</h3><p>Ringkasan yang dialokasikan dan diverifikasi untuk akun Anda</p></div></div><div class="earning-amount" id="earnings-detail">Belum tersedia</div><p class="hint">Tidak menampilkan pendapatan seluruh publisher. Laporan baru muncul setelah data akun ini tersedia dan diverifikasi.</p></article></section>
<section class="app-view hidden" id="view-account"><div class="content-grid"><article class="app-card"><h3>Pengaturan profil</h3><p class="muted">Perbarui nama dan gambar profil.</p><form id="profile-form"><div class="avatar-preview" id="avatar-preview">M</div><label for="profile-file">Foto profil (maks. 65 KB setelah dikompresi)</label><input id="profile-file" type="file" accept="image/png,image/jpeg,image/webp"><label for="display-name">Nama tampilan</label><input id="display-name" maxlength="60" minlength="2" required><button class="primary" type="submit">Simpan profil</button></form></article><article class="app-card"><h3>Keamanan akun</h3><p class="muted">Ganti password Anda. Semua sesi akan keluar setelah perubahan.</p><form id="password-form"><label for="old-password">Password saat ini</label><input id="old-password" type="password" autocomplete="current-password" required><label for="new-password">Password baru</label><input id="new-password" type="password" minlength="12" autocomplete="new-password" required><label for="repeat-password">Konfirmasi password baru</label><input id="repeat-password" type="password" minlength="12" autocomplete="new-password" required><button class="primary" type="submit">Ganti password</button></form></article></div><article class="app-card"><div class="card-heading"><div><h3>Metode pembayaran</h3><p>Tujuan penerimaan komisi yang telah disetujui admin.</p></div></div><form id="payout-form"><label for="pay-method">Jenis pembayaran</label><select id="pay-method" required><option value="">Pilih metode</option><option value="bca">Bank BCA (gratis biaya transfer)</option><option value="bank_other">Bank lainnya</option><option value="dana">DANA</option><option value="ovo">OVO</option><option value="gopay">GoPay</option><option value="shopeepay">ShopeePay</option><option value="other">Lainnya</option></select><label for="pay-provider">Nama bank atau penyedia</label><input id="pay-provider" maxlength="60" placeholder="Contoh: BCA, Mandiri, DANA" required><label for="pay-holder">Nama pemilik rekening / akun</label><input id="pay-holder" maxlength="100" autocomplete="name" required><label for="pay-number">Nomor rekening / nomor akun</label><input id="pay-number" maxlength="32" inputmode="tel" autocomplete="off" required><p id="pay-fee" class="hint">Selain BCA dikenakan biaya transfer Rp3.000 per pembayaran.</p><button class="primary" type="submit">Simpan metode pembayaran</button><p id="pay-status" class="hint" role="status"></p></form></article></section><section class="app-view hidden" id="view-support"><article class="app-card"><div class="card-heading"><div><h3>Chat Admin</h3><p>Pesan pribadi antara akun Anda dan admin CodeFlare Tools.</p></div><button id="support-refresh" class="link-button">Perbarui</button></div><div id="support-thread" class="support-thread"></div><form id="support-form"><label for="support-body">Tulis pesan</label><textarea id="support-body" maxlength="1500" rows="3" required placeholder="Tulis pertanyaan atau kendala Anda..."></textarea><button class="primary" type="submit">Kirim ke Admin</button></form></article></section>
<footer class="app-footer">© CodeFlare Tools · Private member workspace</footer></div></div></div>
<script>
const el=id=>document.getElementById(id),msg=(t,ok=false)=>{el("msg").textContent=t;el("msg").classList.toggle("ok",ok)};
const api=async(path,data)=>{const opt={credentials:"same-origin"};if(data!==undefined){opt.method="POST";opt.headers={"content-type":"application/json"};opt.body=JSON.stringify(data)}const r=await fetch(path,opt);let d=await r.json();if(!r.ok)throw Error(d.error||"Permintaan gagal");return d};
function tab(which){const reg=which==="register";el("login-form").classList.toggle("hidden",reg);el("register-form").classList.toggle("hidden",!reg);el("tab-login").classList.toggle("active",!reg);el("tab-register").classList.toggle("active",reg);el("tab-login").setAttribute("aria-selected",String(!reg));el("tab-register").setAttribute("aria-selected",String(reg));el("heading").textContent=reg?"Buat akun baru":"Selamat datang";el("intro").textContent=reg?"Isi data berikut untuk mendaftar sebagai member.":"Masuk untuk melihat dashboard dan aktivitas Anda.";msg("")}
el("tab-login").onclick=()=>tab("login");el("tab-register").onclick=()=>tab("register");
document.querySelectorAll(".reveal").forEach(b=>b.onclick=()=>{const x=el(b.dataset.for);x.type=x.type==="password"?"text":"password";b.textContent=x.type==="password"?"Lihat":"Tutup"});
function matches(){const a=el("newpass").value,b=el("confirm").value,ok=!b||a===b;el("confirm").classList.toggle("invalid",!ok);el("match-hint").textContent=b?(ok?"Password cocok.":"Konfirmasi password tidak sama."):"Masukkan ulang password yang sama.";return ok}
el("newpass").addEventListener("input",matches);el("confirm").addEventListener("input",matches);
let dashboardLoaded=false;
function formatDate(v){if(!v)return "—";try{return new Intl.DateTimeFormat("id-ID",{dateStyle:"medium",timeStyle:"short"}).format(new Date(v))}catch{return String(v)}}
function showView(name){for(const v of ["overview","activity","earnings","account","support"])el("view-"+v).classList.toggle("hidden",v!==name);document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("selected",b.dataset.view===name));const titles={overview:"Dashboard",activity:"Aktivitas",earnings:"Penghasilan",account:"Pengaturan",support:"Chat Admin"};el("view-title").textContent=titles[name];el("crumb").textContent=titles[name];el("member").classList.remove("side-open")}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>showView(b.dataset.view));document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>showView(b.dataset.go));el("menu-toggle").onclick=()=>el("member").classList.toggle("side-open");
function fillRows(id,items){const body=el(id);body.replaceChildren();if(!items.length){const tr=document.createElement("tr"),td=document.createElement("td");td.colSpan=3;td.textContent="Belum ada aktivitas";tr.append(td);body.append(tr);return}items.forEach(x=>{const tr=document.createElement("tr");for(const value of [x.event_type,formatDate(x.created_at),"Tercatat"]){const td=document.createElement("td");td.textContent=value;tr.append(td)}body.append(tr)})}
function paintChart(points){const map=new Map(points.map(x=>[x.day,Number(x.events||0)]));const max=Math.max(1,...map.values());const chart=el("activity-chart");chart.replaceChildren();for(let i=29;i>=0;i--){const d=new Date();d.setUTCHours(0,0,0,0);d.setUTCDate(d.getUTCDate()-i);const k=d.toISOString().slice(0,10),n=map.get(k)||0,c=document.createElement("div"),bar=document.createElement("span");c.className="chart-col";c.title=k+": "+n+" event";bar.style.height=Math.max(3,Math.round(n/max*100))+"%";if(n)bar.className="has-events";c.append(bar);chart.append(c)}}
async function refresh(){
 try{
  const d=await api("/api/me");el("guest").classList.add("hidden");el("member").classList.remove("hidden");document.body.classList.add("member-mode");
  const user=d.user;const name=user.username||"Member",role=user.role||"member";
  el("hello-user").textContent=name;el("side-user").textContent=user.display_name||name;el("side-role").textContent=role;el("side-initial").textContent=name[0].toUpperCase();el("top-initial").textContent=name[0].toUpperCase();
  el("display-name").value=user.display_name||name;renderAvatar(user);el("account-name").textContent=name;el("account-email").textContent=user.email;el("account-role").textContent=role;
  el("admin-link").classList.toggle("hidden",role!=="admin");
  const [a,summary]=await Promise.all([api("/api/activity"),api("/api/member/summary")]);
  fillRows("recent-rows",a.events.slice(0,6));fillRows("all-rows",a.events);
  const recentLogin=a.events.find(x=>x.event_type==="login");el("last-login").textContent=recentLogin?formatDate(recentLogin.created_at):"—";
  const total=summary.activity.reduce((n,x)=>n+Number(x.events||0),0);el("activity-stat").textContent=String(total);paintChart(summary.activity);
  const earnings=summary.earnings.length?summary.earnings.map(x=>x.currency+" "+(Number(x.micros)/1000000).toLocaleString("id-ID",{minimumFractionDigits:2})).join(" · "):"Belum tersedia";
  el("earnings-stat").textContent=earnings;el("earnings-detail").textContent=earnings;el("income-status").textContent=summary.earnings.length?"Tersedia":"Belum tersedia";
  if(!dashboardLoaded){dashboardLoaded=true;try{await api("/api/member/pageview",{path:"/"})}catch{}}
  try{const count=await api("/api/member/online");el("online-stat").textContent=count.online+" online";}catch{}showView("overview");msg("");
 }catch(e){console.error("Dashboard initialization failed",e);if(document.body.classList.contains("member-mode")){msg("Dashboard belum dapat memuat seluruh data. Silakan coba refresh.",false);return}dashboardLoaded=false;document.body.classList.remove("member-mode");el("guest").classList.remove("hidden");el("member").classList.add("hidden")}
}
async function perform(form,path,payload){const b=form.querySelector("button[type=submit]");b.disabled=true;msg("Sedang memproses...");try{await api(path,payload);await refresh();msg("Berhasil.",true)}catch(e){msg(e.message)}finally{b.disabled=false}}
el("login-form").onsubmit=e=>{e.preventDefault();perform(e.currentTarget,"/api/login",{identity:el("ident").value,password:el("pass").value})};
el("register-form").onsubmit=e=>{e.preventDefault();if(!matches()){msg("Konfirmasi password belum cocok.");return}perform(e.currentTarget,"/api/register",{username:el("user").value,email:el("email").value,password:el("newpass").value})};
let currentAvatar="";
function renderAvatar(user){const data=user.avatar_data||"";currentAvatar=data;const a=el("avatar-preview");a.replaceChildren();if(data){const img=document.createElement("img");img.src=data;img.alt="Foto profil";a.append(img)}else a.textContent=(user.display_name||user.username||"M")[0].toUpperCase()}
el("profile-file").onchange=async()=>{const file=el("profile-file").files?.[0];if(!file)return;if(!["image/jpeg","image/png","image/webp"].includes(file.type)){msg("Jenis gambar harus JPG, PNG, atau WebP");return}const image=await createImageBitmap(file);const canvas=document.createElement("canvas");canvas.width=160;canvas.height=160;const ctx=canvas.getContext("2d");const size=Math.min(image.width,image.height);ctx.drawImage(image,(image.width-size)/2,(image.height-size)/2,size,size,0,0,160,160);image.close();const data=canvas.toDataURL("image/jpeg",.75);if(data.length>92000){msg("Foto terlalu besar");return}renderAvatar({avatar_data:data})};
el("profile-form").onsubmit=async e=>{e.preventDefault();try{await api("/api/member/profile",{display_name:el("display-name").value,avatar_data:currentAvatar});msg("Profil berhasil disimpan.",true);await refresh()}catch(err){msg(err.message)}};
el("password-form").onsubmit=async e=>{e.preventDefault();const next=el("new-password").value;if(next!==el("repeat-password").value){msg("Konfirmasi password baru tidak cocok");return}try{await api("/api/member/password",{current_password:el("old-password").value,new_password:next,confirm_password:el("repeat-password").value});dashboardLoaded=false;await refresh();msg("Password berhasil diganti. Silakan login kembali.",true);el("password-form").reset()}catch(err){msg(err.message)}};
async function loadSupport(){try{const d=await api("/api/member/support");const thread=el("support-thread");thread.replaceChildren();for(const x of d.messages){const line=document.createElement("div");line.className="chat-bubble "+(x.sender_role==="admin"?"from-admin":"from-member");const t=document.createElement("small");t.textContent=(x.sender_role==="admin"?"Admin":"Anda")+" · "+formatDate(x.created_at);const body=document.createElement("div");body.textContent=x.body;line.append(t,body);thread.append(line)}if(!d.messages.length)thread.textContent="Belum ada percakapan."}catch(err){msg(err.message)}}
el("support-refresh").onclick=loadSupport;
el("support-form").onsubmit=async e=>{e.preventDefault();try{await api("/api/member/support",{body:el("support-body").value});el("support-body").value="";await loadSupport();msg("Pesan terkirim.",true)}catch(err){msg(err.message)}};
document.querySelector('[data-view="support"]').addEventListener("click",loadSupport);
const methodLabels={bca:"BCA",bank_other:"Bank lainnya",dana:"DANA",ovo:"OVO",gopay:"GoPay",shopeepay:"ShopeePay",other:"Lainnya"};
const payMethod=el("pay-method"),payProvider=el("pay-provider"),payFee=el("pay-fee");
payMethod.onchange=()=>{const m=payMethod.value;if(m==="bca")payProvider.value="BCA";else if(["dana","ovo","gopay","shopeepay"].includes(m))payProvider.value=methodLabels[m];else payProvider.value="";payFee.textContent=m==="bca"?"Biaya transfer BCA: Rp0.":"Biaya transfer selain BCA: Rp3.000 dipotong dari pembayaran."};
async function loadPayout(){try{const d=await api("/api/member/payout-account");if(!d.account)return;payMethod.value=d.account.method;payProvider.value=d.account.provider;el("pay-holder").value=d.account.account_holder;el("pay-number").value=d.account.account_number;payFee.textContent=d.account.method==="bca"?"Biaya transfer BCA: Rp0.":"Biaya transfer selain BCA: Rp3.000 dipotong dari pembayaran."}catch(e){el("pay-status").textContent="Informasi pembayaran belum tersedia."}}
el("payout-form").onsubmit=async e=>{e.preventDefault();const btn=e.currentTarget.querySelector('button[type="submit"]');btn.disabled=true;el("pay-status").textContent="Menyimpan...";try{await api("/api/member/payout-account",{method:payMethod.value,provider:payProvider.value,account_holder:el("pay-holder").value,account_number:el("pay-number").value});el("pay-status").textContent="Metode pembayaran berhasil disimpan."}catch(err){el("pay-status").textContent=err.message}finally{btn.disabled=false}};
document.querySelector('[data-view="account"]').addEventListener("click",loadPayout);
el("logout").onclick=async()=>{try{await api("/api/logout",{});await refresh();tab("login");msg("Anda sudah keluar.",true)}catch(e){msg(e.message)}};
refresh();
</script></body></html>`;

const adminPage = String.raw`<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeFlare Tools | Admin</title><style>*{box-sizing:border-box}body{margin:0;font:15px/1.55 system-ui;background:#f2f6fc;color:#182c44}header{background:#102b48;color:white;padding:20px 28px;display:flex;justify-content:space-between;align-items:center}header a{color:#b5ddff}main{max-width:1100px;margin:28px auto;padding:0 18px}h1{font-size:25px}.muted{color:#66788d}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}.card,section{background:white;border:1px solid #dfe8f1;border-radius:13px;padding:20px}.card b{display:block;font-size:26px;color:#136fbb}section{margin-top:18px;overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:620px}td,th{padding:12px;border-bottom:1px solid #e7edf5;text-align:left}th{font-size:12px;color:#66788d}small{font-size:12px}button{background:#147bd1;color:white;border:0;border-radius:9px;padding:10px 14px;cursor:pointer}@media(max-width:700px){.grid{grid-template-columns:1fr}header{gap:12px}}</style></head><body><header><strong>CF · Admin Monitoring</strong><a href="/">Dashboard member</a></header><main><h1>Ringkasan operasional</h1><p class="muted">Khusus admin. Aktivitas yang ditampilkan adalah log aplikasi CodeFlare, bukan keputusan Google tentang validitas klik AdSense.</p><div class="grid"><div class="card"><small>Total member</small><b id="total">—</b></div><div class="card"><small>Event terbaru (30 hari)</small><b id="events">—</b></div><div class="card"><small>Status AdSense</small><b id="adsense" style="font-size:16px">—</b></div></div><section><h2>Daftar member</h2><table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Aktivitas terakhir</th></tr></thead><tbody id="members"><tr><td colspan="6">Memuat...</td></tr></tbody></table></section><section><h2>Aktivitas aplikasi terbaru</h2><table><thead><tr><th>Member</th><th>Jenis aktivitas</th><th>Waktu</th></tr></thead><tbody id="activity"><tr><td colspan="3">Memuat...</td></tr></tbody></table></section><section><h2>Pesan member ke admin</h2><p class="muted">Kotak masuk pribadi, hanya dapat diakses admin.</p><div class="table-scroll"><table><thead><tr><th>Member</th><th>Dari</th><th>Pesan</th><th>Waktu</th></tr></thead><tbody id="inbox"><tr><td colspan="4">Memuat...</td></tr></tbody></table></div><form id="reply-form"><label for="reply-user">ID Member</label><input id="reply-user" type="number" min="1" required><label for="reply-body">Balasan</label><textarea id="reply-body" maxlength="1500" rows="3" required></textarea><button type="submit">Kirim Balasan</button></form></section><p id="status" class="muted"></p></main><script>const el=id=>document.getElementById(id);const get=async path=>{const r=await fetch(path,{credentials:"same-origin"});const j=await r.json();if(!r.ok)throw Error(j.error||"Gagal mengambil data");return j};function row(parent,values){const tr=document.createElement("tr");values.forEach(v=>{const td=document.createElement("td");td.textContent=String(v??"—");tr.append(td)});parent.append(tr)}(async()=>{try{const [o,m,a,chat]=await Promise.all([get("/api/admin/overview"),get("/api/admin/members"),get("/api/admin/activity"),get("/api/admin/support")]);el("total").textContent=o.members;el("adsense").textContent=o.adsense_status==="not_connected"?"Belum terhubung":o.adsense_status;el("events").textContent=a.events.length;el("members").replaceChildren();el("activity").replaceChildren();m.members.forEach(x=>row(el("members"),[x.id,x.username,x.email,x.role,x.status,x.last_activity]));a.events.forEach(x=>row(el("activity"),[x.username,x.event_type,x.created_at]));if(!m.members.length)row(el("members"),["Belum ada member"]);if(!a.events.length)row(el("activity"),["Belum ada aktivitas"]);el("inbox").replaceChildren();chat.messages.forEach(x=>row(el("inbox"),[x.user_id+" · "+x.username,x.sender_role,x.body,x.created_at]));if(!chat.messages.length)row(el("inbox"),["Belum ada pesan"])}catch(e){el("status").textContent=e.message}})();el("reply-form").onsubmit=async e=>{e.preventDefault();const user_id=Number(el("reply-user").value),body=el("reply-body").value;try{const r=await fetch("/api/admin/support",{method:"POST",headers:{"content-type":"application/json"},credentials:"same-origin",body:JSON.stringify({user_id,body})});const j=await r.json();if(!r.ok)throw Error(j.error||"Gagal mengirim");el("reply-body").value="";el("status").textContent="Balasan terkirim. Muat ulang untuk melihat pesan terbaru."}catch(err){el("status").textContent=err.message}};</script></body></html>`;
function json(data,status=200,headers={}){return Response.json(data,{status,headers:{"cache-control":"no-store","x-content-type-options":"nosniff",...headers}})}
function cookie(request){const m=(request.headers.get("cookie")||"").match(/(?:^|;\s*)cf_tools_session=([^;]+)/);return m?.[1]||""}
function setCookie(v,age){return COOKIE+"="+v+"; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age="+age}
function hex(bytes){return [...bytes].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function sha(s){return hex(new Uint8Array(await crypto.subtle.digest("SHA-256",encoder.encode(s))))}
function randomHex(n=32){return hex(crypto.getRandomValues(new Uint8Array(n)))}
async function hashPassword(password,salt){const key=await crypto.subtle.importKey("raw",encoder.encode(password),"PBKDF2",false,["deriveBits"]);return hex(new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:encoder.encode(salt),iterations:ITERATIONS,hash:"SHA-256"},key,256)))}
function ctEqual(a,b){if(a.length!==b.length)return false;let t=0;for(let i=0;i<a.length;i++)t|=a.charCodeAt(i)^b.charCodeAt(i);return t===0}
function validOrigin(request){const o=request.headers.get("origin");return !!o && o===new URL(request.url).origin}
async function readBody(request){try{if(Number(request.headers.get("content-length")||0)>100000)return null;return await request.json()}catch{return null}}
async function auth(request,env){const t=cookie(request);if(!/^[a-f0-9]{64}$/.test(t))return null;return env.DB.prepare("SELECT u.id,u.username,u.email,COALESCE(r.role,'member') AS role,COALESCE(p.display_name,'') AS display_name,p.avatar_data FROM cft_sessions s JOIN cft_users u ON u.id=s.user_id LEFT JOIN cft_user_roles r ON r.user_id=u.id LEFT JOIN cft_member_profiles p ON p.user_id=u.id WHERE s.token_hash=? AND s.expires_at>? AND u.status='active' LIMIT 1").bind(await sha(t),new Date().toISOString()).first()}
async function newSession(userId,env){const token=randomHex(),now=new Date(),expires=new Date(now.getTime()+SESSION_SECONDS*1000).toISOString();await env.DB.prepare("INSERT INTO cft_sessions(user_id,token_hash,created_at,expires_at) VALUES(?,?,?,?)").bind(userId,await sha(token),now.toISOString(),expires).run();return token}
async function activity(env,id,type){await env.DB.prepare("INSERT INTO cft_activity_events(user_id,event_type,page_path,created_at) VALUES(?,?,?,?)").bind(id,type,null,new Date().toISOString()).run()}
async function rateLimited(env,key){const now=Date.now(),bucket=Math.floor(now/900000),identity=await sha(key+":"+bucket);const r=await env.DB.prepare("SELECT attempts FROM cft_login_limits WHERE identity_hash=?").bind(identity).first();if(Number(r?.attempts||0)>=8)return true;await env.DB.prepare("INSERT INTO cft_login_limits(identity_hash,attempts,updated_at) VALUES(?,1,?) ON CONFLICT(identity_hash) DO UPDATE SET attempts=attempts+1,updated_at=excluded.updated_at").bind(identity,new Date().toISOString()).run();return false}
export default {async fetch(request,env){
 const url=new URL(request.url),path=url.pathname,method=request.method;
 if(method==="GET"&&path==="/health")return json({ok:true,app:"CodeFlare Tools",version:"5.6.0",dbConfigured:!!env.DB});
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
 if(path==="/api/member/online"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const since=new Date(Date.now()-15*60000).toISOString();
  const r=await env.DB.prepare("SELECT COUNT(DISTINCT s.user_id) AS online FROM cft_sessions s WHERE s.expires_at>? AND EXISTS (SELECT 1 FROM cft_activity_events a WHERE a.user_id=s.user_id AND a.created_at>=?)").bind(new Date().toISOString(),since).first();
  return json({ok:true,online:Number(r?.online||0),definition:"Aktif dalam 15 menit terakhir"});
 }
 if(path==="/api/member/profile"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const b=await readBody(request);if(!b)return json({ok:false,error:"Data tidak valid"},400);
  const name=String(b.display_name||"").trim();
  if(name.length<2||name.length>60||/[<>\u0000-\u001f]/.test(name))return json({ok:false,error:"Nama harus 2–60 karakter"},400);
  let avatar=String(b.avatar_data||"");
  if(avatar&&!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(avatar))return json({ok:false,error:"Format foto tidak didukung"},400);
  if(avatar.length>92000)return json({ok:false,error:"Foto terlalu besar (maksimal sekitar 65 KB)"},400);
  await env.DB.prepare("INSERT INTO cft_member_profiles(user_id,display_name,avatar_data,updated_at) VALUES(?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET display_name=excluded.display_name,avatar_data=excluded.avatar_data,updated_at=excluded.updated_at").bind(u.id,name,avatar||null,new Date().toISOString()).run();
  return json({ok:true});
 }
 if(path==="/api/member/password"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const b=await readBody(request);if(!b)return json({ok:false,error:"Data tidak valid"},400);
  const old=String(b.current_password||""),next=String(b.new_password||"");
  if(next.length<12||next.length>128||next!==String(b.confirm_password||""))return json({ok:false,error:"Password baru minimal 12 karakter dan konfirmasi harus cocok"},400);
  if(await rateLimited(env,"password:"+u.id))return json({ok:false,error:"Terlalu banyak percobaan. Coba lagi nanti."},429);
  const row=await env.DB.prepare("SELECT password_hash FROM cft_users WHERE id=?").bind(u.id).first(),parts=String(row?.password_hash||"").split(":");
  if(parts.length!==4||parts[0]!=="pbkdf2-sha256"||!/^\d+$/.test(parts[1])||Number(parts[1])>100000||Number(parts[1])<10000||!ctEqual(await hashPassword(old,parts[2]),parts[3]))return json({ok:false,error:"Password saat ini salah"},403);
  const salt=randomHex(16),hash=await hashPassword(next,salt);
  await env.DB.prepare("UPDATE cft_users SET password_hash=?,updated_at=? WHERE id=?").bind("pbkdf2-sha256:"+ITERATIONS+":"+salt+":"+hash,new Date().toISOString(),u.id).run();
  await env.DB.prepare("DELETE FROM cft_sessions WHERE user_id=?").bind(u.id).run();
  return json({ok:true,login_again:true},200,{"set-cookie":setCookie("",0)});
 }
 if(path==="/api/member/support"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const r=await env.DB.prepare("SELECT sender_role,body,created_at FROM (SELECT sender_role,body,created_at,id FROM cft_support_messages WHERE user_id=? ORDER BY id DESC LIMIT 100) ORDER BY id ASC").bind(u.id).all();
  return json({ok:true,messages:r.results||[]});
 }
 if(path==="/api/member/support"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const b=await readBody(request),body=String(b?.body||"").trim();
  if(body.length<1||body.length>1500)return json({ok:false,error:"Pesan harus 1–1500 karakter"},400);
  if(await rateLimited(env,"support:"+u.id))return json({ok:false,error:"Terlalu banyak pesan. Coba lagi nanti."},429);
  await env.DB.prepare("INSERT INTO cft_support_messages(user_id,sender_role,body,created_at) VALUES(?,'member',?,?)").bind(u.id,body,new Date().toISOString()).run();
  return json({ok:true});
 }
 if(path==="/api/admin/support"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const r=await env.DB.prepare("SELECT m.id,m.user_id,u.username,m.sender_role,m.body,m.created_at FROM cft_support_messages m JOIN cft_users u ON u.id=m.user_id ORDER BY m.id DESC LIMIT 100").all();
  return json({ok:true,messages:r.results||[]});
 }
 if(path==="/api/admin/support"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const b=await readBody(request),id=Number(b?.user_id),body=String(b?.body||"").trim();
  if(!Number.isSafeInteger(id)||id<1||body.length<1||body.length>1500)return json({ok:false,error:"Data pesan tidak valid"},400);
  const member=await env.DB.prepare("SELECT id FROM cft_users WHERE id=?").bind(id).first();if(!member)return json({ok:false,error:"Member tidak ditemukan"},404);
  await env.DB.prepare("INSERT INTO cft_support_messages(user_id,sender_role,body,created_at) VALUES(?,'admin',?,?)").bind(id,body,new Date().toISOString()).run();return json({ok:true});
 }
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
 if(path==="/api/member/payout-account"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const a=await env.DB.prepare("SELECT method,provider,account_holder,account_number,updated_at FROM cft_payout_accounts WHERE user_id=?").bind(u.id).first();
  return json({ok:true,account:a||null});
 }
 if(path==="/api/member/payout-account"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  const b=await readBody(request);if(!b)return json({ok:false,error:"Data tidak valid"},400);
  const method=String(b.method||""),provider=String(b.provider||"").trim(),holder=String(b.account_holder||"").trim(),number=String(b.account_number||"").trim();
  if(!["bca","bank_other","dana","ovo","gopay","shopeepay","other"].includes(method)||!provider||provider.length>60||holder.length<3||holder.length>100||!/^[+0-9 -]{6,32}$/.test(number))return json({ok:false,error:"Data tujuan transfer tidak valid"},400);
  if(method==="bca"&&provider.toLowerCase()!=="bca")return json({ok:false,error:"Metode BCA hanya untuk rekening BCA"},400);
  await env.DB.prepare("INSERT INTO cft_payout_accounts(user_id,method,provider,account_holder,account_number,updated_at) VALUES(?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET method=excluded.method,provider=excluded.provider,account_holder=excluded.account_holder,account_number=excluded.account_number,updated_at=excluded.updated_at").bind(u.id,method,provider,holder,number,new Date().toISOString()).run();
  return json({ok:true});
 }
 if(path==="/api/admin/payout-report"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const month=url.searchParams.get("month")||new Date().toISOString().slice(0,7);
  if(!/^\\d{4}-(0[1-9]|1[0-2])$/.test(month))return json({ok:false,error:"Periode tidak valid"},400);
  const due=month+"-15";
  const rows=await env.DB.prepare("SELECT p.member_id,u.username,p.source_code,SUM(p.gross_rupiah) AS gross_rupiah,a.method,a.provider,a.account_holder,a.account_number FROM cft_payout_items p JOIN cft_users u ON u.id=p.member_id LEFT JOIN cft_payout_accounts a ON a.user_id=p.member_id WHERE p.status='verified' AND p.period_end<? GROUP BY p.member_id,p.source_code,u.username,a.method,a.provider,a.account_holder,a.account_number ORDER BY u.username,p.source_code").bind(due).all();
  const data=new Map();
  for(const row of rows.results||[]){let x=data.get(row.member_id);if(!x){x={member_id:row.member_id,username:row.username,method:row.method,provider:row.provider,account_holder:row.account_holder,account_number:row.account_number,sources:{adsense:0,adsterra:0,affiliate:0}};data.set(row.member_id,x)}x.sources[row.source_code]=Number(row.gross_rupiah)}
  const result=[...data.values()].map(x=>{const gross=x.sources.adsense+x.sources.adsterra+x.sources.affiliate;const fee=x.method==="bca"?0:3000;return {...x,gross_rupiah:gross,fee_rupiah:fee,net_rupiah:Math.max(0,gross-fee),status:!x.method?"missing_destination":gross<=fee?"below_fee":"ready_for_manual_review"}});
  return json({ok:true,scope:"admin",month,payment_date:due,source_types:["adsense","adsterra","affiliate"],fee_other_than_bca_rupiah:3000,items:result,automation:"report_only_no_transfer",note:"Hanya item terverifikasi sebelum tanggal 15. Data belum dibayar harus direkonsiliasi; tidak ada transfer otomatis."});
 }
 if(path==="/api/admin/commission/preview"&&method==="POST"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const b=await readBody(request);
  const source=String(b?.source_type||""),currency=String(b?.currency||"IDR").toUpperCase(),raw=b?.net_minor;
  if(!["adsense","product_service"].includes(source)||!/^[A-Z]{3}$/.test(currency)||typeof raw!=="number"||!Number.isSafeInteger(raw)||raw<0||raw>1e12)return json({ok:false,error:"Sumber, mata uang, atau nilai tidak valid"},400);
  const admin=Math.floor(raw*40/100),activity=Math.floor(raw*24/100),network=Math.floor(raw*21/100),rank=raw-admin-activity-network;
  return json({ok:true,mode:"preview_only",source_type:source,currency,net_minor:raw,admin_minor:admin,member:{activity_minor:activity,network_minor:network,rank_minor:rank,total_minor:raw-admin},compliance_status:"pending",payable:false,note:source==="adsense"?"Tidak boleh memberi insentif klik, tayangan iklan, atau perekrutan. Alokasi ini hanya simulasi sampai pemeriksaan kepatuhan selesai.":"Perlu bukti transaksi dan kontribusi nyata. Perekrutan semata tidak menghasilkan komisi."});
 }
 if(path==="/api/admin/commission/batches"&&method==="GET"){
  const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);
  if(u.role!=="admin")return json({ok:false,error:"Akses admin diperlukan"},403);
  const r=await env.DB.prepare("SELECT id,source_type,source_reference,period_start,period_end,currency,net_minor,admin_minor,activity_minor,network_minor,rank_minor,status,compliance_status,created_at FROM cft_commission_batches ORDER BY id DESC LIMIT 100").all();
  return json({ok:true,batches:r.results||[],payable:false});
 }
 if(path==="/api/activity"&&method==="GET"){const u=await auth(request,env);if(!u)return json({ok:false,error:"Login diperlukan"},401);const d=new Date(Date.now()-30*86400000).toISOString();const r=await env.DB.prepare("SELECT event_type,created_at FROM cft_activity_events WHERE user_id=? AND created_at>=? ORDER BY created_at DESC LIMIT 200").bind(u.id,d).all();return json({ok:true,events:r.results||[]})}
 return json({ok:false,error:"Endpoint tidak ditemukan"},404);
 }catch(e){console.error("TOOLS V5 MEMBER ERROR",String(e));return json({ok:false,error:"Terjadi kesalahan server"},500)}
}};
