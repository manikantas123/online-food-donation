# Use official Node.js image to build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (optional if needed)
# RUN npm install -g serve

# Copy all files to the container
COPY . .

# Install serve to serve static files
RUN npm install -g serve

# Expose port 8080 to serve the app
EXPOSE 8080

# Start the static server with 'serve'
CMD ["serve", ".", "-l", "8080"]
