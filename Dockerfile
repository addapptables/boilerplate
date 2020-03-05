FROM node:8-alpine

WORKDIR /app

COPY dist/ dist/
COPY package.json yarn.lock .env.example tsconfig.json tslint.json nodemon.json ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "prod"]