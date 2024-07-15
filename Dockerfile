FROM nginx:alpine
COPY dist/ekl-frontend/ /usr/share/nginx/html/
