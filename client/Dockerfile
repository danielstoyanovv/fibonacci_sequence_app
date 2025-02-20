FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

RUN npm run build
RUN serve -s build

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
#COPY /app /usr/share/nginx/html
CMD ["npm", "run", "start"]