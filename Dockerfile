FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY nest-cli.json ormconfig.ts tsconfig*.json ./
COPY src ./src
COPY test ./test

RUN npm run build


FROM builder AS migrations

RUN npm install -g ts-node typescript @types/node
CMD ["sleep", "1"]


FROM node:14-alpine AS deploy

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production


EXPOSE 3000

COPY ormconfig.ts ./
COPY --from=builder /usr/src/app/dist ./dist

USER node

CMD ["node", "./dist/src/main"]
