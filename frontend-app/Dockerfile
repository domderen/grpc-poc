FROM node:current-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

RUN npm run build