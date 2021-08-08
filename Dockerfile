FROM node:14-alpine AS builder

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY ["package*.json", "*.lock", "./"]

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# build the app
# RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

FROM node:14-alpine

WORKDIR /usr/src/app

# copy from builder
COPY --from=builder /usr/src/app .

EXPOSE 8080

CMD ["node", "bin/www"]
