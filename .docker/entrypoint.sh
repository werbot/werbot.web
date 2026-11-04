#!/bin/sh
set -e

# The API base URL is inlined at build time (VITE_API_URL). When a deployment
# overrides it, rewrite the default host inside the SvelteKit chunks. The files
# are hashed by Vite, so scan the immutable directory instead of a fixed name.
if [ -n "${API_DSN}" ]; then
  find /usr/share/nginx/html/_app/immutable -name '*.js' \
    -exec sed -i "s_https://api.werbot.net_${API_DSN}_g" {} +
fi
