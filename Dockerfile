FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build



FROM node:14-alpine AS deploy

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm ci


EXPOSE 3000

COPY . .
COPY --from=builder /usr/src/app/dist ./dist

USER node

CMD ["node", "./dist/main"]