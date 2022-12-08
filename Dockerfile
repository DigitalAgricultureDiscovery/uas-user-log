# build client application
FROM node:16-bullseye-slim as client

WORKDIR /app/client

COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --production
COPY ./client ./
RUN yarn run build

# build final production container
FROM node:16-bullseye-slim

WORKDIR /app

COPY --from=client /app/client/build ./client/build
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install --production
COPY ./server ./

CMD [ "yarn", "start" ]
