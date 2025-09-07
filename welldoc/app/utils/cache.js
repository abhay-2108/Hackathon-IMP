// Simple client-side cache using localStorage/sessionStorage with TTL

export function cacheGet(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (obj.expires && Date.now() > obj.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return obj.value;
  } catch {
    return null;
  }
}

export function cacheSet(key, value, ttlMs) {
  try {
    const obj = { value, expires: ttlMs ? Date.now() + ttlMs : 0 };
    localStorage.setItem(key, JSON.stringify(obj));
  } catch {}
}

export function cacheRemove(key){
  try { localStorage.removeItem(key); } catch {}
}

export function cacheRemoveByPrefix(prefix){
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(k => { if (k.startsWith(prefix)) localStorage.removeItem(k); });
  } catch {}
}

export function sCacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function sCacheSet(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function sCacheRemoveByPrefix(prefix){
  try {
    const keys = Object.keys(sessionStorage);
    keys.forEach(k => { if (k.startsWith(prefix)) sessionStorage.removeItem(k); });
  } catch {}
}


