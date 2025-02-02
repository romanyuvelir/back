FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./start.sh /app/start.sh
RUN chmod +x /app/start.sh

RUN npm install

COPY . .

EXPOSE 3001

CMD ["sh", "/app/start.sh"]