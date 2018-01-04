FROM node:8.9-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]
