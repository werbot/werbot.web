FROM nginx:stable-alpine
LABEL com.werbot.commit _GIT_COMMIT_
LABEL com.werbot.version _VERSION_
LABEL org.opencontainers.image.source https://github.com/werbot/werbot.web
LABEL org.opencontainers.image.description 🖥 Werbot Web Applications
LABEL org.opencontainers.image.licenses Apache-2.0 license
COPY ./dist /usr/share/nginx/html
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
