FROM node:current-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/protos
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/
COPY ./protos/echo.proto /usr/src/protos/echo.proto