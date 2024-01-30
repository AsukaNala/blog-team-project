FROM node:19-alpine

#Docker file arguments during the build process この例では、NODE_ENVやDB_NAMEなどの引数がデフォルトで設定されており、これらはビルド時に変更できます。例えば、次のようにビルドすることができます：
#docker build --build-arg NODE_ENV=development --build-arg DB_NAME=mydatabase_dev -t myapp:latest .
#これにより、NODE_ENVがdevelopment、DB_NAMEがmydatabase_devという値になるイメージがビルドされます。
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
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start-dev"]


