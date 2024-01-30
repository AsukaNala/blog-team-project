FROM node:19-alpine

ARG NODE_ENV
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_PORT
ARG PORT

#set environment variables during the build process
ENV NODE_ENV=$NODE_ENV
ENV DB_NAME=$DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV PORT=$PORT

WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install

CMD ["npm", "run","start-dev"]


