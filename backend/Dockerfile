FROM node:20-alpine AS base
WORKDIR /app

# Copy package descriptors and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

EXPOSE 8080
CMD ["node", "server.mjs"]
