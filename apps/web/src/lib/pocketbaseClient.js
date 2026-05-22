// DEPRECATED — kept only for backwards-compatibility with template-generated
// imports. All code should use `@/lib/pocketbase.js` directly.
// Re-exporting the canonical singleton prevents the two-clients/session-mismatch
// bug we hit when this file owned its own PocketBase instance.

import pb from './pocketbase.js';

export default pb;
export { pb as pocketbaseClient };
