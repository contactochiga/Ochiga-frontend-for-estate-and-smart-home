# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy rest of the code
COPY . .

# Build the app for production
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
