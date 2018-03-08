FROM node

WORKDIR /var/www

ADD . /var/www

RUN npm install
RUN npm run build:prod

EXPOSE 3000

CMD [ "npm","start" ]