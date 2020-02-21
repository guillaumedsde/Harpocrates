ARG NODE_VERSION=13.2.0

# build image
FROM node:${NODE_VERSION}-alpine as build

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
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
