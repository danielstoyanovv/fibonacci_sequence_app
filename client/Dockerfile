FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY /app /usr/share/nginx/html
