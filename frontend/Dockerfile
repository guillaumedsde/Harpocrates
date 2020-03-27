# build image
FROM node:13.11.0-alpine3.10 as build

ARG NODE_ENV=production
ARG TEST_MODE=0

WORKDIR /app

COPY package*.json ./
RUN npm install && \
    npm install -g parcel-bundler

# copy app source
COPY . .
RUN npm run build

# final image
FROM nginx:1.17-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
