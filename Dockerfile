FROM krmp-d2hub-idock.9rum.cc/goorm/node:20.16.0

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn global add serve
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["serve", "/app/dist", "-l", "3000"]
