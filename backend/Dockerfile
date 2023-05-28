FROM node:16.13.1-alpine3.14

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .


RUN yarn global add typescript@latest
RUN yarn install
RUN yarn build

EXPOSE 8000

CMD yarn start