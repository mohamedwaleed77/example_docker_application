FROM alpine:latest
RUN apk add --no-cache nodejs npm bash
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4203
CMD ["node", "server.js"]
