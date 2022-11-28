FROM docker.io/nginx:stable-alpine
COPY  dist/apps/triplo/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
