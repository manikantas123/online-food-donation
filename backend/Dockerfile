# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port and start the server
EXPOSE 5000
CMD ["node", "server.js"]