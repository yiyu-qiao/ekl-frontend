FROM nginx:alpine
COPY dist/ekl-frontend/ /usr/share/nginx/html/
RUN rm -f /etc/nginx/*.conf & rm -f /etc/nginx/conf.d/*.conf
COPY nginx/nginx.conf /etc/nginx/

