FROM node:11-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . .
RUN yarn && node_modules/.bin/knex migrate:latest
EXPOSE 3003
CMD [ "yarn", "run", "serve" ]