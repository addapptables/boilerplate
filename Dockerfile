FROM alpine:3.10

ENV NODE_VERSION 14.7.0

WORKDIR /app

COPY dist/ dist/
COPY package.json yarn.lock .env.example tsconfig.json tslint.json nodemon.json ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "prod"]