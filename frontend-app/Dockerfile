FROM node:current-alpine

ARG REACT_APP_ENV=dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

RUN REACT_APP_ENV=$REACT_APP_ENV npm run build