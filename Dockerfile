#FROM krmp-d2hub-idock.9rum.cc/goorm/node:20.16.0

FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn global add serve
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["serve","-s", "/app/dist", "-l", "3000"]
