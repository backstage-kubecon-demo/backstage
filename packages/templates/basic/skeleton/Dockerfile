FROM node:18-alpine

RUN mkdir /app

WORKDIR /app

RUN yarn global add ts-node
 
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY src/ src/

ENTRYPOINT ["ts-node"]

EXPOSE 80

CMD ["/app/src/index.ts"]
