FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN apk add --no-cache openssl

CMD ["node", "server.js"]