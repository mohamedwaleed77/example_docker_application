# Use the Alpine image
FROM alpine:latest

# Install necessary packages
RUN apk add --no-cache nodejs npm
RUN npm install -g http-server


# Set the working directory
WORKDIR /app

# Copy files
COPY . .

# Expose ports
EXPOSE 8080

# Start the application
CMD ["http-server"]
