FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apk add --no-cache openssl

RUN npm run build

CMD ["node", "server.js"]