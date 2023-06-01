FROM nginx:stable-alpine
LABEL org.opencontainers.image.created _DATE_
LABEL org.opencontainers.image.url https://github.com/werbot/werbot.web
LABEL org.opencontainers.image.source https://github.com/werbot/werbot.web
LABEL org.opencontainers.image.title werbot.web
LABEL org.opencontainers.image.revision _GIT_COMMIT_
LABEL org.opencontainers.image.version _VERSION_
LABEL org.opencontainers.image.description 🖥 Werbot Web Applications
LABEL org.opencontainers.image.vendor Werbot, Inc.
LABEL org.opencontainers.image.documentation https://github.com/werbot/werbot.web
LABEL org.opencontainers.image.authors info@werbot.com
LABEL org.opencontainers.image.licenses Apache-2.0 license
COPY ./dist /usr/share/nginx/html
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./.docker/entrypoint.sh /docker-entrypoint.d/90-entrypoint.sh
RUN chmod +x /docker-entrypoint.d/90-entrypoint.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
