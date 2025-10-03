# Frontend Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]
