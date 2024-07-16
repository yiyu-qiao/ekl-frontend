FROM nginx:alpine
ARG EKL_FE_STAGE
COPY dist/ekl-frontend/ /usr/share/nginx/html/
RUN rm -f /etc/nginx/*.conf & rm -f /etc/nginx/conf.d/*.conf
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/$EKL_FE_STAGE/nginx-$EKL_FE_STAGE.conf /etc/nginx/conf.d/

