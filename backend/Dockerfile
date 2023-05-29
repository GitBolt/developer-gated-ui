# Dockerfile
FROM node:20

WORKDIR /app

COPY ./package*.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile 

COPY prisma ./prisma/
COPY tsconfig.json ./

COPY . .
RUN yarn build

EXPOSE 8000

CMD yarn start:migrate
