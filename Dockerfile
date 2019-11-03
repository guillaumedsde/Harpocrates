# build image
FROM node:current-buster as build

ARG NODE_ENV=production

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