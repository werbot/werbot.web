#!/bin/sh
set -e

if [[ "${API_DSN}" ]]; then
  sed -i 's_https://api.werbot.net_'"${API_DSN}"'_g' /usr/share/nginx/html/assets/index-*.js
fi
