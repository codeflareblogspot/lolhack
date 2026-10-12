/* CodeFlare Tools v5 — isolated bootstrap (no admin endpoints) */
const VERSION = "5.0.0-bootstrap";
const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CodeFlare Tools</title><style>body{font:15px/1.6 system-ui,sans-serif;background:#f4f7fb;color:#192b42;margin:0}header{background:#102b46;color:white;padding:20px}main{max-width:960px;margin:40px auto;padding:20px;background:white;border-radius:14px;border:1px solid #dee7ee}a{color:#176cbe}</style></head><body><header><strong>CodeFlare Tools v5</strong></header><main><h1>Member Engine</h1><p>Frontend and backend scaffolding is ready for development. Registration, sessions and AdSense integration are not yet active.</p><p>Health endpoint: <a href="/health">/health</a></p></main></body></html>`;
export default {
 async fetch(request) {
   const url = new URL(request.url);
   if (url.pathname === "/health" && request.method === "GET") {
     return Response.json({ok:true,app:"CodeFlare Tools",version:VERSION,member_engine:"not-configured"},{headers:{"cache-control":"no-store"}});
   }
   if (url.pathname === "/" && request.method === "GET") {
     return new Response(html,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
   }
   return Response.json({ok:false,error:"Not found"},{status:404});
 }
};
