# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install serve (to serve static files)
RUN npm install -g serve

# Copy all files to working directory
COPY . .

# Expose port
EXPOSE 8080

# Start the static server
CMD ["serve", ".", "-l", "8080"]
