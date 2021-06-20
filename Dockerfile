FROM node:14

WORKDIR /usr/src/app

COPY ["package*.json", "*.lock", "./"]

RUN yarn install

COPY . .

EXPOSE 8080
CMD ["node", "bin/www"]