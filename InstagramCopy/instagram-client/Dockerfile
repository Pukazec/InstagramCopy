FROM node:18-alpine as build-env

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:docker --docker


FROM node:18-alpine as run-env

RUN npm install -g serve

WORKDIR /app
COPY --from=build-env /app/build ./build

EXPOSE 4443
CMD serve -s build -l 4443
