# Use the official Alpine image
FROM alpine:latest

# Install Node.js, npm, and necessary build tools
RUN apk add --no-cache nodejs npm bash

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies

# Copy the rest of your backend files
COPY . .

RUN npm install

# Expose the port your app runs on
EXPOSE 4203

# Command to run the app
CMD ["node", "server.js"]
