FROM nginx:stable-alpine3.17

WORKDIR /app


COPY default.conf /etc/nginx/conf.d/
COPY index.html /usr/share/nginx/html/

EXPOSE 8080