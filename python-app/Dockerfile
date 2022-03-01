FROM python:3-alpine

RUN set -ex && \
    apk add --no-cache musl-dev g++ libffi-dev

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && rm requirements.txt \
    && apk del g++ musl-dev libffi-dev

RUN apk add --no-cache libstdc++

ENV PYTHONUNBUFFERED 1

COPY . .