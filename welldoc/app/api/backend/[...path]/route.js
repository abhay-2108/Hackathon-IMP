const CANDIDATES = [
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:8000",
  "http://127.0.0.1:8000",
].filter(Boolean);

async function tryFetch(url, init){
  const ctrl = new AbortController();
  const id = setTimeout(()=>ctrl.abort(), 6000);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export async function GET(request, ctx) {
  const resolved = ctx?.params && (typeof ctx.params.then === 'function' ? await ctx.params : ctx.params);
  const path = (resolved?.path || []).join('/');
  const tried = [];
  for (const base of CANDIDATES){
    const target = `${base}/${path}`;
    tried.push(target);
    try {
      const res = await tryFetch(target, { headers: { 'accept': 'application/json' } });
      const body = await res.text();
      return new Response(body, { status: res.status, headers: { 'content-type': res.headers.get('content-type') || 'application/json' } });
    } catch {}
  }
  return Response.json({ error: `Proxy GET failed: all targets unreachable`, targets: tried }, { status: 502 });
}

export async function POST(request, ctx) {
  const resolved = ctx?.params && (typeof ctx.params.then === 'function' ? await ctx.params : ctx.params);
  const path = (resolved?.path || []).join('/');
  const payload = await request.text();
  const tried = [];
  for (const base of CANDIDATES){
    const target = `${base}/${path}`;
    tried.push(target);
    try {
      const res = await tryFetch(target, { method: 'POST', headers: { 'content-type': 'application/json', 'accept': 'application/json' }, body: payload });
      const txt = await res.text();
      return new Response(txt, { status: res.status, headers: { 'content-type': res.headers.get('content-type') || 'application/json' } });
    } catch {}
  }
  return Response.json({ error: `Proxy POST failed: all targets unreachable`, targets: tried }, { status: 502 });
}


