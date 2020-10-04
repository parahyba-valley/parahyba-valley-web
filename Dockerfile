FROM node:14.9-alpine

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN apk add --update --no-cache \
      bash \
      build-base \
      curl \
      git \
      openssh-client

EXPOSE 9000
EXPOSE 9001
