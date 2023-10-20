FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update && apt-get install -y openssl

RUN npm run build

CMD ["node", "server.js"]