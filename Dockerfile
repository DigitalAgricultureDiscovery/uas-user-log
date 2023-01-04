# build client application
FROM node:16-bullseye-slim as client

WORKDIR /tmp/client

COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --production
COPY ./client ./
RUN yarn run build

# build final production container
FROM node:16-bullseye-slim

RUN adduser --system --home /home/uasuserlog --shell /bin/bash --group uasuserlog

ENV HOME=/home/uasuserlog
ENV APP_HOME=/home/uasuserlog/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY --from=client /tmp/client/build ./client/build

COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install --production
COPY ./server ./

EXPOSE 5000

USER uasuserlog

CMD [ "yarn", "start-prod" ]
