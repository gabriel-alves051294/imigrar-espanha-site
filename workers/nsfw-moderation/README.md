# nsfw-moderation — Cloudflare Worker

Gateway between the React frontend and Google Cloud Vision SafeSearch.
The frontend uploads the image to this worker **before** uploading to
PocketBase. If `safe === false`, the upload is aborted client-side.

## Setup (one-time)

1. **Cloud Vision API key**
   - Console: <https://console.cloud.google.com/apis/library/vision.googleapis.com>
   - Enable the API, create an API key restricted to "Cloud Vision API",
     restrict by HTTP referrer to your Worker subdomain or by IP.
   - Free tier: 1,000 SafeSearch calls/month. Pay-as-you-go after: USD 1.50/1k.

2. **Cloudflare account + wrangler CLI**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

3. **Configure secrets**
   ```bash
   cd workers/nsfw-moderation
   wrangler secret put VISION_API_KEY      # paste the key from step 1
   wrangler secret put ALLOWED_ORIGIN      # https://imigrarparaespanha.com.br
   # optional:
   # wrangler secret put MAX_BYTES         # default 4194304 (4 MB)
   ```

4. **Deploy**
   ```bash
   wrangler deploy
   ```
   Note the resulting URL (e.g. `https://nsfw-moderation.<your-subdomain>.workers.dev`).

5. **Wire frontend**
   Add to `apps/web/.env.local`:
   ```
   VITE_NSFW_WORKER_URL=https://nsfw-moderation.<your-subdomain>.workers.dev
   ```
   The `ImageUploader` component already calls this URL when present.

## Quick local test

```bash
curl -X POST \
  -F "image=@/path/to/test.jpg" \
  https://nsfw-moderation.<your-subdomain>.workers.dev
# → { "safe": true, "reasons": [], "scores": { ... } }
```

## Cost ceiling

| Volume | Vision cost | Worker cost |
|---|---|---|
| 1k uploads / mo | USD 0 (free tier) | USD 0 (free tier) |
| 10k uploads / mo | USD ~13.50 | USD 0 |
| 100k uploads / mo | USD ~148.50 | USD 0 |
