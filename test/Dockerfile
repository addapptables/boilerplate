FROM node:8-alpine

WORKDIR /app

COPY src/ src/
COPY test/ test/
COPY package.json tsconfig.json tslint.json yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "test"]