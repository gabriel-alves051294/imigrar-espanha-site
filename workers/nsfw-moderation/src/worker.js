/**
 * Cloudflare Worker — NSFW image moderation gateway.
 *
 * Flow (called from the React frontend BEFORE upload to PocketBase):
 *   1. Client POSTs the image as multipart/form-data with field "image".
 *   2. Worker forwards bytes to Google Vision SafeSearch.
 *   3. Returns { safe: boolean, reasons: string[], scores: {...} }.
 *
 * Required Worker secrets (set with `wrangler secret put`):
 *   VISION_API_KEY     — Google Cloud Vision API key.
 *   ALLOWED_ORIGIN     — your site origin, e.g. https://imigrarparaespanha.com.br
 *
 * Optional secret:
 *   MAX_BYTES          — defaults to 4 * 1024 * 1024 (4 MB).
 *
 * Deploy:
 *   cd workers/nsfw-moderation && wrangler deploy
 */

const BLOCKING_LIKELIHOODS = new Set(['LIKELY', 'VERY_LIKELY']);
const VISION_URL = 'https://vision.googleapis.com/v1/images:annotate';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
  });
}

async function bytesToBase64(bytes) {
  // Cloudflare Workers do not have Node Buffer; use btoa over Uint8Array.
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || '*';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowed) });
    }
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'method_not_allowed' }, 405, allowed);
    }
    if (!env.VISION_API_KEY) {
      return jsonResponse({ error: 'misconfigured', detail: 'VISION_API_KEY missing' }, 500, allowed);
    }

    const maxBytes = Number(env.MAX_BYTES || 4 * 1024 * 1024);

    let form;
    try {
      form = await request.formData();
    } catch {
      return jsonResponse({ error: 'invalid_multipart' }, 400, allowed);
    }

    const file = form.get('image');
    if (!file || typeof file === 'string') {
      return jsonResponse({ error: 'image_field_required' }, 400, allowed);
    }
    if (file.size > maxBytes) {
      return jsonResponse({ error: 'file_too_large', maxBytes }, 413, allowed);
    }
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      return jsonResponse({ error: 'unsupported_mime', mime: file.type }, 415, allowed);
    }

    const buf = new Uint8Array(await file.arrayBuffer());
    const b64 = await bytesToBase64(buf);

    let visionRes;
    try {
      visionRes = await fetch(`${VISION_URL}?key=${env.VISION_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: b64 },
            features: [{ type: 'SAFE_SEARCH_DETECTION' }]
          }]
        })
      });
    } catch (err) {
      return jsonResponse({ error: 'vision_unreachable' }, 502, allowed);
    }

    if (!visionRes.ok) {
      const detail = await visionRes.text();
      return jsonResponse({ error: 'vision_error', status: visionRes.status, detail }, 502, allowed);
    }

    const payload = await visionRes.json();
    const scores = payload?.responses?.[0]?.safeSearchAnnotation || {};

    const reasons = [];
    if (BLOCKING_LIKELIHOODS.has(scores.adult))    reasons.push('adult');
    if (BLOCKING_LIKELIHOODS.has(scores.violence)) reasons.push('violence');
    if (BLOCKING_LIKELIHOODS.has(scores.racy))     reasons.push('racy');
    if (BLOCKING_LIKELIHOODS.has(scores.medical))  reasons.push('medical');

    return jsonResponse({
      safe: reasons.length === 0,
      reasons,
      scores
    }, 200, allowed);
  }
};
