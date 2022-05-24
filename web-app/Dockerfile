FROM node:16

WORKDIR /src

COPY package.json ./

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]