FROM node:12.14.1-slim AS builder
COPY package.json yarn.lock ./

RUN yarn install

FROM node:12.14.1-slim

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

COPY --from=builder node_modules ./node_modules

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]
