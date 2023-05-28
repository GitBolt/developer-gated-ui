# Dockerfile
FROM node:16.13.1-alpine3.14

WORKDIR /app

COPY ./package*.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile 

COPY prisma ./prisma/
COPY tsconfig.json ./

COPY . .
RUN yarn build

EXPOSE 8000

RUN npx prisma generate
CMD yarn start
